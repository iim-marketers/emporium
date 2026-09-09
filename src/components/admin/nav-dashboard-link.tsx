import type { Payload } from "payload";

import { DashboardLink } from "./nav-dashboard-link.client";

/** Rendered by `beforeNavLinks`. The only way back to the dashboard was the
 *  header logo, which is easy to miss once you are inside a document.
 *  `beforeNavLinks` components are handed the Payload instance, so the link
 *  follows `routes.admin` rather than assuming the default. */
export function EmporiumDashboardLink({ payload }: { payload: Payload }) {
  return <DashboardLink href={payload.config.routes.admin} />;
}
