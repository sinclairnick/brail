import { AST_NODE_TYPES, TSESLint } from "@typescript-eslint/utils";
import { HtmlElementFeature } from "../../util/feature-groups";
import { ElementMatchFn, PropertyMatchFn } from "../../util/rule-meta";
import { createHtmlElementRule } from "./html-element-rule-generic";
import { HtmlElementRuleOverride } from "./html-element-rule.constants";

export type HtmlElementRuleMap = {
  [key in `no-${HtmlElementFeature}`]: TSESLint.RuleModule<any, any, any>;
};

export const htmlElementRuleMap: HtmlElementRuleMap = Object.values(
  HtmlElementFeature.Values
).reduce((obj, feature) => {
  const propertyName = feature.replace("html-", "");
  const defaultMatcher: ElementMatchFn = (node) =>
    node.name.type === AST_NODE_TYPES.JSXIdentifier &&
    node.name.name === propertyName;

  obj[`no-${feature}`] = createHtmlElementRule(
    feature,
    HtmlElementRuleOverride[feature]?.matchIdentifier ?? defaultMatcher
  );
  return obj;
}, {} as HtmlElementRuleMap);
