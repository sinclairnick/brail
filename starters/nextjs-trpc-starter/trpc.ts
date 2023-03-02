import { initTRPC } from "@trpc/server";
import { createTrpcRouter } from "brail/trpc";
import { templates } from "./brail/templates.generated";

const t = initTRPC.create();

// Provide middleware and auth via native trpc methods
const isAuthed = t.middleware(({ next }) => {
  return next();
});

const procedure = t.procedure.use(isAuthed);

// This can now be used as per usual trpc router
export const appRouter = createTrpcRouter({
  t: { ...t, procedure }, // Or, just use regular trpc instance (`t`)
  templates,
});
