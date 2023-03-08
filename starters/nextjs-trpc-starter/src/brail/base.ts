import Brail from "@brail/react";
import z from "zod";
import type Nodemailer from "nodemailer";
import { serverImport } from "brail/util";

export const b = Brail.init();

// `serverImport` prevents node APIS breaking when we import this on the client
// Since nodemailer uses e.g. `fs` importing it normally causes react to crash
const nodemailerImport = serverImport<typeof Nodemailer>("nodemailer");

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
    // Do something with api key?
    const key = meta.apiKey;

    const nodemailer = await nodemailerImport;
    const transport = nodemailer?.createTransport({ port: 1025 });
    await transport?.sendMail({
      to: meta.to,
      subject: meta.subject,
      html: html,
    });
    return { ok: true };
  });

export const theme = b.theme;
