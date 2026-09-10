import type { CollectionConfig } from "payload";

import { isSignedIn, publishedOrSignedIn } from "./access";
import { revalidate } from "./revalidate";

const jobPaths = ["/", "/jobs"];

export const Jobs: CollectionConfig = {
  slug: "jobs",
  labels: { singular: "Drive", plural: "Jobs" },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "location", "driveOn", "_status"],
    description:
      "Campus recruitment drives. A drive drops off the site the day after it runs, so past ones can be left in place.",
  },
  access: {
    create: isSignedIn,
    delete: isSignedIn,
    read: publishedOrSignedIn,
    update: isSignedIn,
  },
  versions: { drafts: true },
  defaultSort: "-driveOn",
  hooks: {
    afterChange: [({ req }) => revalidate(jobPaths, req.payload)],
    afterDelete: [({ req }) => revalidate(jobPaths, req.payload)],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        description:
          "Printed as the card heading. The existing drives are set in capitals.",
      },
    },
    {
      name: "location",
      type: "text",
      required: true,
      admin: {
        description:
          'City and state, as "Guwahati, Assam". Drives sharing a location are grouped under one city tab, so spell it the same way each time.',
      },
    },
    {
      name: "position",
      type: "text",
      required: true,
      admin: {
        description: "The roles being interviewed for, e.g. Cabin Crew.",
      },
    },
    {
      name: "employer",
      label: "Job posting",
      type: "text",
      admin: {
        description:
          "Optional. The airline, airport or hotel group hiring, printed only when it is named.",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "driveOn",
          label: "Drive date",
          type: "date",
          required: true,
          admin: {
            width: "50%",
            description: "Drives the countdown and the drive-closed cut-off.",
            date: {
              pickerAppearance: "dayOnly",
              displayFormat: "d MMMM yyyy",
            },
          },
        },
        {
          name: "time",
          type: "text",
          required: true,
          defaultValue: "8:00 am onwards",
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "venue",
      type: "textarea",
      required: true,
      admin: { description: "The full address candidates should turn up to." },
    },
    {
      name: "registerWith",
      label: "How to register",
      type: "text",
      required: true,
      defaultValue: "Apply via WhatsApp your Name, Age, Qualification",
      admin: {
        description:
          "Printed just before the WhatsApp number, so write it as the lead-in to it.",
      },
    },
    {
      name: "whatsapp",
      label: "WhatsApp number",
      type: "text",
      required: true,
      admin: {
        description:
          "Printed exactly as typed. The link strips the spacing, and a 10-digit number gets the 91 country code.",
      },
    },
    {
      name: "board",
      label: "Departure board",
      type: "group",
      admin: {
        description:
          "The split-flap row on the home page. It has room for a few characters only, hence the limits.",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "flight",
              label: "Drive code",
              type: "text",
              required: true,
              maxLength: 4,
              admin: {
                width: "33%",
                description: "The airport code, e.g. GAU.",
              },
            },
            {
              name: "destination",
              type: "text",
              required: true,
              maxLength: 17,
              admin: {
                width: "34%",
                description: "Shown in capitals, e.g. GUWAHATI ASSAM.",
              },
            },
            {
              name: "status",
              type: "select",
              required: true,
              defaultValue: "OPEN ALL",
              options: [
                { label: "Open to all", value: "OPEN ALL" },
                { label: "By invitation", value: "INVITE" },
              ],
              admin: {
                width: "33%",
                description: "Also sets the dot on the card and the city tab.",
              },
            },
          ],
        },
      ],
    },
  ],
};
