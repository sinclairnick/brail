import Brail, { AbsoluteUrl } from "@brail/react";
import z from "zod";
import { sendMail } from "./mailersend";

export const b = Brail.init();

export const BASE_URL =
  (process.env.VERCEL_URL as AbsoluteUrl) ??
  "https://bcac-115-188-87-130.au.ngrok.io";

export const template = b.template
  .meta(z.object({ to: z.string().email(), subject: z.string() }))
  .onSend(async (args) => {
    await sendMail(args.meta.to, args.meta.subject, args.html);
    return { ok: true };
  });

export const theme = b.theme;
