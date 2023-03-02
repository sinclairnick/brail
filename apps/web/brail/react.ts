import Brail, { AbsoluteUrl } from "@brail/react";
import z from "zod";
import type Nodemailer from "nodemailer";
import { serverImport } from "brail/util";

export const b = Brail.init();

export const BASE_URL =
  (process.env.VERCEL_URL as AbsoluteUrl) ?? "http://localhost:3000";

// // Dynamically import nodemailer to avoid bundling it in the browser
const nodemailerImport = serverImport<typeof Nodemailer>("nodemailer");

export const template = b.template
  .meta(z.object({ to: z.string().email(), subject: z.string() }))
  .onSend(async (args) => {
    const nodemailer = await nodemailerImport;
    const transport = nodemailer?.createTransport({ port: 1025 });
    await transport?.sendMail({
      to: args.meta.to,
      subject: args.meta.subject,
      html: args.html,
    });
    return { ok: true };
  });

export const theme = b.theme;
