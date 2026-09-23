import type { CollectionConfig } from "payload";

import type { Enquiry } from "../payload-types";
import { excelExport } from "./export";
import {
  contactFields,
  messageField,
  statusField,
  statusLabels,
  submissionAccess,
} from "./submission-fields";

export const Enquiries: CollectionConfig = {
  slug: "enquiries",
  labels: { singular: "Enquiry", plural: "Enquiries" },
  admin: {
    hideAPIURL: true,
    group: "Submissions",
    useAsTitle: "name",
    defaultColumns: ["name", "phone", "location", "status", "createdAt"],
    listSearchableFields: ["name", "email", "phone", "reference"],
    description: "Sent from the enquiry form on the website.",
    components: {
      beforeListTable: ["/components/admin/export-button#ExportButton"],
    },
  },
  access: submissionAccess,
  defaultSort: "-createdAt",
  endpoints: [
    excelExport<Enquiry>({
      collection: "enquiries",
      sheet: "Enquiries",
      columns: [
        { header: "Reference", width: 12, value: (doc) => doc.reference },
        { header: "Submitted", width: 20, value: (doc) => doc.createdAt, date: true },
        { header: "Name", width: 24, value: (doc) => doc.name },
        { header: "Email", width: 30, value: (doc) => doc.email },
        { header: "Phone", width: 14, value: (doc) => doc.phone },
        { header: "Location", width: 24, value: (doc) => doc.location },
        { header: "Message", width: 60, value: (doc) => doc.message },
        { header: "Status", width: 12, value: (doc) => statusLabels[doc.status] },
        { header: "Submitted from", width: 24, value: (doc) => doc.source },
      ],
    }),
  ],
  fields: [...contactFields(), messageField, statusField],
};
