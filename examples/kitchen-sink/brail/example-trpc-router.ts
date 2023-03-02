import { initTRPC } from "@trpc/server";
import { createTrpcRouter } from "brail/trpc";
import { templates } from "./templates";

const t = initTRPC.create({
  isDev: true,
});

// Provide middleware and auth via native trpc methods
const isAuthed = t.middleware(({ next }) => {
  return next();
});

const procedure = t.procedure.use(isAuthed);

// This can now be used as per usual trpc router
export const appRouter = createTrpcRouter({
  // Or, just use regular trpc instance
  t: { ...t, procedure },
  templates,
});
