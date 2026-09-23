import type { CollectionConfig } from "payload";

import type { Application } from "../payload-types";
import { excelExport } from "./export";
import {
  contactFields,
  messageField,
  statusField,
  statusLabels,
  submissionAccess,
} from "./submission-fields";

export const Applications: CollectionConfig = {
  slug: "applications",
  labels: { singular: "Job application", plural: "Job applications" },
  admin: {
    group: "Submissions",
    useAsTitle: "name",
    defaultColumns: ["name", "phone", "subject", "cv", "status", "createdAt"],
    listSearchableFields: ["name", "email", "phone", "reference"],
    description: "Sent from the Apply Now form, each with the applicant's CV.",
    components: {
      beforeListTable: ["/components/admin/export-button#ExportButton"],
    },
  },
  access: submissionAccess,
  defaultSort: "-createdAt",
  hooks: {
    afterDelete: [
      async ({ doc, req }) => {
        const cv = typeof doc.cv === "object" ? doc.cv?.id : doc.cv;
        if (!cv) return;
        await req.payload.delete({
          collection: "cvs",
          id: cv,
          overrideAccess: true,
          req,
        });
      },
    ],
  },
  endpoints: [
    excelExport<Application>({
      collection: "applications",
      sheet: "Job applications",
      columns: [
        { header: "Reference", width: 12, value: (doc) => doc.reference },
        { header: "Submitted", width: 20, value: (doc) => doc.createdAt, date: true },
        { header: "Name", width: 24, value: (doc) => doc.name },
        { header: "Email", width: 30, value: (doc) => doc.email },
        { header: "Phone", width: 14, value: (doc) => doc.phone },
        { header: "Location", width: 24, value: (doc) => doc.location },
        { header: "Applying for", width: 24, value: (doc) => doc.subject },
        { header: "Message", width: 60, value: (doc) => doc.message },
        { header: "CV", width: 16, value: (doc) => (typeof doc.cv === "object" ? doc.cv.url : null), link: "Download CV" },
        { header: "Status", width: 12, value: (doc) => statusLabels[doc.status] },
        { header: "Submitted from", width: 24, value: (doc) => doc.source },
      ],
    }),
  ],
  fields: [
    ...contactFields("Applying for"),
    {
      name: "cv",
      label: "CV",
      type: "upload",
      relationTo: "cvs",
      required: true,
      admin: { readOnly: true },
    },
    messageField,
    statusField,
  ],
};
