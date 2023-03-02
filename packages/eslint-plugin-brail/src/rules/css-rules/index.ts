import { TSESLint } from "@typescript-eslint/utils";
import { CssFeature } from "../../util/feature-groups";
import { PropertyMatchFn } from "../../util/rule-meta";
import { camelCase } from "../../util/string";
import { createCssPropertyRule } from "./css-property-rule-generic";
import { CssRuleOverride } from "./css-property-rule.constants";

export type CssRuleMap = {
  [key in `no-${CssFeature}`]: TSESLint.RuleModule<any, any, any>;
};

export const cssRuleMap: CssRuleMap = Object.values(CssFeature.Values).reduce(
  (obj, feature) => {
    const propertyName = feature.replace("css-", "");
    const defaultMatcher: PropertyMatchFn = (key) =>
      key?.toString().trim() === camelCase(propertyName);

    obj[`no-${feature}`] = createCssPropertyRule(
      feature,
      CssRuleOverride[feature]?.matchIdentifier ?? defaultMatcher
    );
    return obj;
  },
  {} as CssRuleMap
);
