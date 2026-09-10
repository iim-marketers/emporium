import { ExternalLink } from "lucide-react";

import { site } from "@/lib/site";

/** Rendered by `afterNavLinks`, at the foot of the admin sidebar. Gives the
 *  editor a way back to the page they are publishing to. */
export function EmporiumNavAside() {
  return (
    <div className="em-nav-aside">
      <a
        className="em-nav-aside__link"
        href={site.url}
        rel="noreferrer"
        target="_blank"
      >
        <ExternalLink aria-hidden="true" />
        <span>View website</span>
      </a>
    </div>
  );
}
