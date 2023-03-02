import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { CssFeature } from "../../util/feature-groups";
import { defineRule } from "../../util/define-rule";
import { getSupportSummary, getWarningMessage } from "../../util/feature-data";
import { loadFeature } from "../../util/load-feature";
import { logger } from "../../util/logger";
import { GlobalOptions, PropertyMatchFn } from "../../util/rule-meta";

type MessageId = "withTable" | "withoutTable";

export const createCssPropertyRule = (
  /** Can I Email data */
  featureName: CssFeature,
  /** CSS Identifier, e.g. "alignItems" */
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
      type: "problem",
      docs: {
        description:
          feature.title +
          `${feature.description ? ` - ${feature.description}` : ""}`,
        recommended: "warn",
      },
    },
    defaultOptions: [{ warnLevel: "no-support", withTable: true }],
    create(context, options) {
      const [opts] = options;

      return {
        JSXAttribute: (node) => {
          logger.debug("Running rule");

          if (node.name.name !== "style") {
            return;
          }

          // If not object, ignore. Maybe we can do something with strings?
          if (node.value?.type !== AST_NODE_TYPES.JSXExpressionContainer) {
            return;
          }

          if (node.value.expression.type !== AST_NODE_TYPES.ObjectExpression) {
            return;
          }

          for (const property of node.value.expression.properties) {
            if (property.type !== AST_NODE_TYPES.Property) {
              continue;
            }

            if (property.value.type !== AST_NODE_TYPES.Literal) {
              continue;
            }

            if (property.key.type !== AST_NODE_TYPES.Identifier) {
              continue;
            }

            if (!matchIdentifier(property.key.name, property.value.value)) {
              continue;
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
          }
        },
      };
    },
  });
};
