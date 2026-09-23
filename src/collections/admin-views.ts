import type { CollectionAdminOptions } from "payload";

// Drafts need versions enabled, so only the tab is hidden.
export const hideVersionsTab: NonNullable<CollectionAdminOptions["components"]> = {
  views: { edit: { versions: { tab: { condition: () => false } } } },
};
