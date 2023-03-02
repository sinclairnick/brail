import { Family, FeatureData, Platform } from "./can-i-email.types";
import {
  SupportLevel,
  SupportLevelColorLogger,
  SupportLevelEmoji,
  SupportLevelReadable,
} from "./emoji";
import { toReadableFamily } from "./rule-meta";
import chalk from "chalk";

export type UnsupportedMap = { [family in Family]?: Platform[] };

/**
 * Get unsupported family-platform combinations, using the most recent version
 * @param feature
 */
export const getUnsupportedFamilies = (feature: FeatureData) => {
  const unsupported: UnsupportedMap = {};

  for (const _family in feature.stats) {
    const family = _family as Family;
    const platforms = feature.stats[family];

    for (const _platform in platforms) {
      const platform = _platform as Platform;
      const versions = platforms[platform];
      if (!versions) continue;
      const [latest] = Object.values(versions).reverse();
      if (latest === "y") continue;
      unsupported[family] = [...(unsupported[family] || []), platform];
    }
  }

  return unsupported;
};

/** Support for latest version of each platform */
export type SupportSummary = {
  counts: {
    full: number;
    partial: number;
    none: number;
    unknown: number;
  };
  byFamily: {
    [key in Family]: {
      support: "full" | "partial" | "none" | "unknown";
      notes: string[];
    };
  };
};

export const getSupportSummary = (feature: FeatureData): SupportSummary => {
  const byFamily = {} as SupportSummary["byFamily"];

  for (const _family in Family.Values) {
    const family = _family as Family;
    const platforms = feature.stats[family];
    if (!platforms) {
      byFamily[family] = { support: "unknown", notes: [] };
      continue;
    }

    const latestList = Object.values(platforms).map(
      (x) => Object.values(x).reverse()[0]
    );

    if (latestList.every((x) => x === "n")) {
      byFamily[family] = { support: "none", notes: [] };
      continue;
    }
    if (latestList.every((x) => x === "y")) {
      byFamily[family] = { support: "full", notes: [] };
      continue;
    }
    const noteNums = Array.from(
      new Set(
        latestList
          .join("")
          .replace("y", "")
          .replace("#", "")
          .replace(" ", "")
          .split("")
          .map(Number)
      )
    );
    byFamily[family] = {
      support: "partial",
      notes: noteNums
        .map((x) => feature.notes_by_num?.[`${x}`])
        .filter((x): x is string => typeof x === "string"),
    };
  }

  return {
    byFamily,
    counts: {
      full: Object.values(byFamily).filter((x) => x.support === "full").length,
      partial: Object.values(byFamily).filter((x) => x.support === "partial")
        .length,
      none: Object.values(byFamily).filter((x) => x.support === "none").length,
      unknown: Object.values(byFamily).filter((x) => x.support === "unknown")
        .length,
    },
  };
};

type SupportMap = {
  [key in SupportLevel]: { family: Family; notes: string[] }[];
};

export const getWarningMessage = (
  featureName: string,
  feature: FeatureData,
  support: SupportSummary,
  withTable: boolean
) => {
  const families = Object.values(Family.Values).map((family) => ({
    family,
    support: support.byFamily[family],
  }));

  const message = (table?: string) => {
    const footer = chalk.cyan(
      `Last updated: ${feature.last_test_date}\n` +
        `See https://caniemail.com/features/${feature.slug} for details.`
    );

    const title = support.counts.none
      ? `\`${featureName}\` is not supported in some clients`
      : `\`${featureName}\` is not fully supported in some clients`;

    return `${title}\n\n` + (table ? `${table}\n\n` : "") + `${footer}\n`;
  };

  if (!withTable) {
    return message();
  }

  const groupedBySupport = families.reduce(
    (acc: SupportMap, cur) => {
      acc[cur.support.support] = [
        ...(acc[cur.support.support] || []),
        {
          family: cur.family,
          notes: cur.support.notes,
        },
      ];
      return acc;
    },
    {
      full: [],
      none: [],
      partial: [],
      unknown: [],
    }
  );

  const columns = {} as {
    [key in SupportLevel]: {
      title: string;
      rows: {
        family: Family;
        notes: string[];
      }[];
      level: SupportLevel;
    };
  };

  for (const _level in groupedBySupport) {
    const level = _level as SupportLevel;
    const families = groupedBySupport[level];
    const rows = families ?? [];
    columns[level] = {
      title: SupportLevelReadable[level],
      rows,
      level,
    };
  }

  const content = [
    SupportLevel.Enum.none,
    SupportLevel.Enum.partial,
    SupportLevel.Enum.unknown,
    SupportLevel.Enum.full,
  ]
    .map((level) => {
      const colorLog = SupportLevelColorLogger[level];

      return columns[level].rows
        .map(
          (row) =>
            `${SupportLevelEmoji[level]} ` +
            `${colorLog.bold(row.family)} - ${chalk.grey(
              SupportLevelReadable[level]
            )}` +
            (row.notes.length > 0
              ? `${chalk.dim(row.notes.map((x) => `\n   ↳ ${x}`).join("\n"))}`
              : "")
        )
        .join("\n");
    })
    .join("\n\n");

  return message(content);
};
