import { AnyCreateTemplateReturn, AnyTemplateMap } from "@brail/types";

export type FlattenedTemplate = AnyCreateTemplateReturn & {
  trpcPath: string;
};

export type FlattenedTemplateRecord = {
  [key: string | symbol]: FlattenedTemplate;
};

export const flattenTemplates = (
  templates: AnyTemplateMap,
  path?: string
): FlattenedTemplateRecord => {
  return Object.entries(templates).reduce(
    (acc: FlattenedTemplateRecord, [key, value]) => {
      const newPath = [path, key].filter(Boolean).join(".");

      if (typeof value === "object") {
        return { ...acc, ...flattenTemplates(value, newPath) };
      }

      acc[value.__path ?? Symbol()] = Object.assign(value, {
        trpcPath: newPath,
      });

      return acc;
    },
    {}
  );
};
