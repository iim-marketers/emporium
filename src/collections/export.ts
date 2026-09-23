import ExcelJS from "exceljs";
import type { CollectionSlug, Endpoint, Where } from "payload";

type Column<T> = {
  header: string;
  width: number;
  value: (doc: T) => string | null | undefined;
  date?: boolean;
  link?: string;
};

/** Excel dates carry no time zone, so they are written as India wall-clock
 *  time rather than UTC. */
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

/** Mounted at `/api/<collection>/export`. Honours the list view's filters and
 *  search, which the admin button forwards in the query string. */
export function excelExport<T>({
  collection,
  sheet,
  columns,
}: {
  collection: CollectionSlug;
  sheet: string;
  columns: Column<T>[];
}): Endpoint {
  return {
    path: "/export",
    method: "get",
    handler: async (req) => {
      if (!req.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

      const config = req.payload.collections[collection].config;
      const { where, search, sort } = req.query as {
        where?: Where;
        search?: string;
        sort?: string;
      };

      const conditions: Where[] = where ? [where] : [];
      if (search?.trim() && config.admin.listSearchableFields?.length) {
        conditions.push({
          or: config.admin.listSearchableFields.map((field) => ({
            [field]: { like: search.trim() },
          })),
        });
      }

      const { docs } = await req.payload.find({
        collection,
        depth: 1,
        overrideAccess: false,
        pagination: false,
        req,
        sort: sort || "-createdAt",
        where: conditions.length ? { and: conditions } : undefined,
      });

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(sheet, {
        views: [{ state: "frozen", ySplit: 1 }],
      });
      worksheet.columns = columns.map((column) => ({
        header: column.header,
        width: column.width,
        style: column.date ? { numFmt: "dd mmm yyyy, hh:mm" } : undefined,
      }));
      worksheet.getRow(1).font = { bold: true };

      const origin = req.payload.config.serverURL || new URL(req.url!).origin;
      for (const doc of docs as T[]) {
        worksheet.addRow(
          columns.map((column) => {
            const value = column.value(doc);
            if (!value) return null;
            if (column.date) {
              return new Date(new Date(value).getTime() + IST_OFFSET_MS);
            }
            if (column.link) {
              return { text: column.link, hyperlink: new URL(value, origin).href };
            }
            return value;
          }),
        );
      }
      worksheet.autoFilter = {
        from: { row: 1, column: 1 },
        to: { row: 1, column: columns.length },
      };

      const buffer = await workbook.xlsx.writeBuffer();
      const stamp = new Date(Date.now() + IST_OFFSET_MS).toISOString().slice(0, 10);
      const filename = `${collection}-${stamp}.xlsx`;

      return new Response(buffer, {
        headers: {
          "Cache-Control": "no-store",
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      });
    },
  };
}
