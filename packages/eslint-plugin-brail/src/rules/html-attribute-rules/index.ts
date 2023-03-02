import { TSESLint } from "@typescript-eslint/utils";
import { HtmlAttributeFeature } from "../../util/feature-groups";
import { PropertyMatchFn } from "../../util/rule-meta";
import { createHtmlAttributeRule } from "./html-attribute-rule-generic";
import { HtmlAttributeRuleOverride } from "./html-attribute-rule.constants";

export type HtmlAttributeRuleMap = {
  [key in `no-${HtmlAttributeFeature}`]: TSESLint.RuleModule<any, any, any>;
};

export const htmlAttributeRuleMap: HtmlAttributeRuleMap = Object.values(
  HtmlAttributeFeature.Values
).reduce((obj, feature) => {
  const propertyName = feature.replace("html-", "");
  const defaultMatcher: PropertyMatchFn = (key, value) => {
    return key === propertyName;
  };

  obj[`no-${feature}`] = createHtmlAttributeRule(
    feature,
    HtmlAttributeRuleOverride[feature]?.matchIdentifier ?? defaultMatcher
  );
  return obj;
}, {} as HtmlAttributeRuleMap);
