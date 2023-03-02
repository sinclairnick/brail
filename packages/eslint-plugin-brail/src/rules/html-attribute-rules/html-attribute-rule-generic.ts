import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { defineRule } from "../../util/define-rule";
import { getSupportSummary, getWarningMessage } from "../../util/feature-data";
import { HtmlAttributeFeature } from "../../util/feature-groups";
import { loadFeature } from "../../util/load-feature";
import { GlobalOptions, PropertyMatchFn } from "../../util/rule-meta";

type MessageId = "withTable" | "withoutTable";

export const createHtmlAttributeRule = (
  featureName: HtmlAttributeFeature,
  matchIdentifier: PropertyMatchFn
) => {
  const feature = loadFeature(featureName);
  const support = getSupportSummary(feature);

  return defineRule<GlobalOptions, MessageId>({
    name: `no-${feature.slug}`,
    meta: {
      messages: {
        withoutTable: getWarningMessage(
          feature.slug.replace("css-", ""),
          feature,
          support,
          false
        ),
        withTable: getWarningMessage(
          feature.slug.replace("css-", ""),
          feature,
          support,
          true
        ),
      },
      schema: {
        properties: {
          warnLevel: {
            id: "warnLevel",
            type: "string",
            enum: ["no-support", "partial", "any"],
          },
          withTable: {
            id: "withTable",
            type: "boolean",
          },
        },
      },
      docs: {
        description:
          feature.title +
          `${feature.description ? ` - ${feature.description}` : ""}`,
        recommended: "warn",
      },
      type: "problem",
    },
    defaultOptions: [{ warnLevel: "no-support", withTable: true }],
    create: (context, options) => {
      const [opts] = options;

      return {
        JSXAttribute: (node) => {
          if (node.name.type !== AST_NODE_TYPES.JSXIdentifier) {
            return;
          }
          const key = node.name.name;

          if (node.value?.type !== AST_NODE_TYPES.Literal) {
            return;
          }
          const value = node.value.value;

          if (!matchIdentifier(key, value)) {
            return;
          }

          const messageId = opts.withTable ? "withTable" : "withoutTable";

          if (opts.warnLevel === "any") {
            context.report({ node, messageId });
            return;
          }

          if (opts.warnLevel === "no-support" && support.counts.none > 0) {
            context.report({ node, messageId });
            return;
          }

          if (
            opts.warnLevel === "partial" &&
            support.counts.partial + support.counts.none > 0
          ) {
            context.report({ node, messageId });
            return;
          }
        },
      };
    },
  });
};
