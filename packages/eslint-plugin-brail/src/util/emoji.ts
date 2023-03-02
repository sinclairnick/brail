import chalk, { ChalkFunction } from "chalk";
import { z } from "zod";

export const FULL_EMOJI = "🟢";
export const PARTIAL_EMOJI = "🟡";
export const NONE_EMOJI = "🔴";
export const UNKNOWN_EMOJI = "🌑";

export const SupportLevel = z.enum(["full", "partial", "none", "unknown"]);

export type SupportLevel = z.infer<typeof SupportLevel>;

export const SupportLevelReadable: { [key in SupportLevel]: string } = {
  full: "Full support",
  none: "No support",
  partial: "Partial support",
  unknown: "Unknown",
};

export const SupportLevelEmoji: { [key in SupportLevel]: string } = {
  full: FULL_EMOJI,
  none: NONE_EMOJI,
  partial: PARTIAL_EMOJI,
  unknown: UNKNOWN_EMOJI,
};

export const SupportLevelColorLogger: { [key in SupportLevel]: chalk.Chalk } = {
  full: chalk.green,
  none: chalk.red,
  partial: chalk.yellow,
  unknown: chalk.gray,
};

export const toFamilySupportStr = (support: SupportLevel, name: string) => {
  if (support === "full") return `${FULL_EMOJI} ${name}`;
  if (support === "partial") return `${PARTIAL_EMOJI} ${name}`;
  if (support === "none") return `${NONE_EMOJI} ${name}`;

  return `${UNKNOWN_EMOJI} ${name}`;
};
