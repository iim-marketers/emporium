/* The public site has its own root layout in the (frontend) group, so the two
   never share styling. */
import config from "@payload-config";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import type { ServerFunctionClient } from "payload";
import React from "react";

import { fontVariables } from "@/lib/fonts";

import { importMap } from "./admin/importMap";

import "@payloadcms/next/css";
/* Loaded after Payload's stylesheet so the brand overrides win. */
import "./custom.css";

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout
      config={config}
      htmlProps={{ className: fontVariables }}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  );
}
