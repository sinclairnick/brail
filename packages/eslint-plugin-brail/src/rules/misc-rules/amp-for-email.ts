import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { defineRule } from "../../util/define-rule";
import { getSupportSummary, getWarningMessage } from "../../util/feature-data";
import { MiscFeature } from "../../util/feature-groups";
import { loadFeature } from "../../util/load-feature";
import { GlobalOptions } from "../../util/rule-meta";

type MessageId = "withTable" | "withoutTable";

const feature = loadFeature(MiscFeature.Values.amp);
const support = getSupportSummary(feature);

export const ampForEmailRule = defineRule<GlobalOptions, MessageId>({
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
      JSXOpeningElement: (node) => {
        if (node.name.type !== AST_NODE_TYPES.JSXIdentifier) return;

        if (node.name.name !== "html") return;

        if (
          !node.attributes.some(
            (x) =>
              x.type === AST_NODE_TYPES.JSXAttribute &&
              x.name.type === AST_NODE_TYPES.JSXIdentifier &&
              ["amp4email", "⚡4email"].includes(x.name.name)
          )
        ) {
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
