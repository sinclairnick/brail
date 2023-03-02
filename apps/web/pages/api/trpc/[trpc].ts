import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../../brail/example-trpc-router";
import { NextRequest } from "next/server";

export const config = { runtime: "edge" };

// Example usage of trpc with edge runtime
export default async function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req,
    createContext: () => ({}),
  });
}

/** Uncomment for non-edge runtime */
// --------------------
// export default createNextApiHandler({
//   router: appRouter,
// });
