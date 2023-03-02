import { TSESLint } from "@typescript-eslint/utils";
import { ImageFeature } from "../../util/feature-groups";
import { PropertyMatchFn } from "../../util/rule-meta";
import { createImageRule } from "./image-rule-generic";
import { ImageRuleOverride } from "./image-rule.constants";

export type ImageRuleMap = {
  [key in `no-${ImageFeature}`]: TSESLint.RuleModule<any, any, any>;
};

export const imageRuleMap: ImageRuleMap = Object.values(
  ImageFeature.Values
).reduce((obj, feature) => {
  const propertyName = feature.replace("image-", "");
  const defaultMatcher: PropertyMatchFn = (key, value) =>
    key === "src" &&
    new RegExp(`.${propertyName}$`).test(value?.toString().trim() ?? "");

  obj[`no-${feature}`] = createImageRule(
    feature,
    ImageRuleOverride[feature]?.matchIdentifier ?? defaultMatcher
  );
  return obj;
}, {} as ImageRuleMap);
