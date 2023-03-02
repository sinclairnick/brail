import { defineRule } from "../../util/define-rule";
import { getSupportSummary, getWarningMessage } from "../../util/feature-data";
import { HtmlElementFeature } from "../../util/feature-groups";
import { loadFeature } from "../../util/load-feature";
import { ElementMatchFn, GlobalOptions } from "../../util/rule-meta";

type MessageId = "withTable" | "withoutTable";

export const createHtmlElementRule = (
  featureName: HtmlElementFeature,
  matchIdentifier: ElementMatchFn
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
        JSXOpeningElement: (node) => {
          if (!matchIdentifier(node)) {
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
