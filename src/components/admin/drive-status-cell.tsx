import type { DefaultServerCellComponentProps } from "payload";

import { hasDrivePassed } from "@/lib/jobs";

const labels = {
  changed: "version:draftHasPublishedVersion",
  draft: "version:draft",
  published: "version:published",
} as const;

export function DriveStatusCell({ cellData, i18n, rowData }: DefaultServerCellComponentProps) {
  const status: keyof typeof labels = Object.hasOwn(labels, cellData) ? cellData : "draft";

  if (status !== "draft" && rowData.driveOn && hasDrivePassed(rowData.driveOn)) {
    return <span className="selected--closed">Closed</span>;
  }

  return <span className={`selected--${status}`}>{i18n.t(labels[status])}</span>;
}
