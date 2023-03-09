import Brail from "@brail/react";
import z from "zod";

export const b = Brail.init();

// Base template config
export const template = b.template
  .meta(
    z.object({
      to: z.string().email(),
      subject: z.string(),
      apiKey: z.string().optional(),
    })
  )
  .onSend(async (args) => {
    const { html, meta } = args;

    const key = meta.apiKey;

    // await fetch("https://my-email-api.com", {
    //   headers: {
    //     Authorisation: `Bearer ${key}`,
    //   },
    // });

    return { ok: true };
  });

export const theme = b.theme;
