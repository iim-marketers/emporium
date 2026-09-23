import type { CollectionConfig, Field } from "payload";

import { isSignedIn } from "./access";

export const submissionAccess: CollectionConfig["access"] = {
  create: () => false,
  delete: isSignedIn,
  read: isSignedIn,
  update: isSignedIn,
};

export const statusField: Field = {
  name: "status",
  type: "select",
  required: true,
  defaultValue: "new",
  options: [
    { label: "New", value: "new" },
    { label: "Contacted", value: "contacted" },
    { label: "Closed", value: "closed" },
  ],
  admin: { position: "sidebar" },
};

export const statusLabels: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  closed: "Closed",
};

export function contactFields(subjectLabel?: string): Field[] {
  return [
    {
      name: "reference",
      type: "text",
      required: true,
      index: true,
      admin: { readOnly: true, position: "sidebar" },
    },
    {
      name: "source",
      label: "Submitted from",
      type: "text",
      admin: { readOnly: true, position: "sidebar" },
    },
    { name: "name", type: "text", required: true, admin: { readOnly: true } },
    {
      type: "row",
      fields: [
        {
          name: "email",
          type: "email",
          required: true,
          admin: { readOnly: true, width: "50%" },
        },
        {
          name: "phone",
          type: "text",
          required: true,
          admin: { readOnly: true, width: "50%" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "location",
          type: "text",
          required: true,
          admin: { readOnly: true, width: subjectLabel ? "50%" : undefined },
        },
        ...(subjectLabel
          ? [
              {
                name: "subject",
                label: subjectLabel,
                type: "text",
                admin: { readOnly: true, width: "50%" },
              } satisfies Field,
            ]
          : []),
      ],
    },
  ];
}

export const messageField: Field = {
  name: "message",
  type: "textarea",
  required: true,
  admin: { readOnly: true },
};
