import { FileSpreadsheet } from "lucide-react";
import type { CollectionConfig, Payload } from "payload";

type SearchParams = Record<string, string | string[] | undefined>;

/** Rendered by `beforeListTable`. The list view re-renders on the server each
 *  time its filters change, so forwarding the search params here exports the
 *  rows the admin is looking at rather than the whole collection. */
export function ExportButton({
  collectionConfig,
  payload,
  searchParams = {},
}: {
  collectionConfig: CollectionConfig;
  payload: Payload;
  searchParams?: SearchParams;
}) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (key === "page" || key === "limit" || value === undefined) continue;
    for (const item of Array.isArray(value) ? value : [value]) {
      query.append(key, item);
    }
  }
  const href = `${payload.config.routes.api}/${collectionConfig.slug}/export${
    query.size ? `?${query}` : ""
  }`;

  return (
    <div className="em-export">
      <a className="btn btn--style-secondary btn--size-small em-export__link" href={href} download>
        <FileSpreadsheet aria-hidden="true" />
        <span>Download Excel</span>
      </a>
    </div>
  );
}
