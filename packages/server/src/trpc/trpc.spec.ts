import { createTemplate } from "@brail/react";
import { initTRPC } from "@trpc/server";
import React from "react";
import {
  createTrpcMutation,
  createTrpcQuery,
} from "./procedure/trpc-procedure";
import { createTrpcRouter } from "./router/trpc-router";
import z from "zod";

describe("trpc", () => {
  const t = initTRPC.create();
  const router = t.router;
  const template = createTemplate({
    title: "",
    propSchema: z.object({ name: z.string() }),
    view: (props) => React.createElement("a"),
    onSend: () => {
      return { hi: 1 };
    },
  });

  it("Creates query procs", async () => {
    const p = createTrpcQuery({
      t,
      pathName: "",
      template,
    });
    const appRouter = router({ p });
    const caller = appRouter.createCaller({});
    const res = await caller.p({ name: "Test" });

    expect(res.html).toBeDefined();
  });

  it("Creates mutation procs", async () => {
    const sendFn = jest.fn().mockImplementation(() => ({ hi: 1 }));
    const m = createTrpcMutation({
      t,
      pathName: "",
      template,
    });
    const appRouter = router({ m });
    const caller = appRouter.createCaller({});
    const res = await caller.m({
      data: { name: "Test" },
      meta: {},
    });

    expect(sendFn).toHaveBeenCalled();
    expect(res.hi).toBe(1);
  });

  it("Creates routers", async () => {
    const emailRouter = createTrpcRouter({
      t,
      templates: { template },
    });
    const appRouter = router({ email: emailRouter });
    const caller = appRouter.createCaller({});
    const res = await caller.email.template.html({
      name: "Test",
    });

    expect(res.html).toBeDefined();
  });

  it("Returns onSend data", async () => {
    const emailRouter = createTrpcRouter({
      t,
      templates: { template },
    });
    const appRouter = router({ email: emailRouter });
    const caller = appRouter.createCaller({});

    const res = await caller.email.template.send({
      data: {
        name: "",
      },
      meta: {},
    });

    expect(res.hi).toBe(1);
  });
});
