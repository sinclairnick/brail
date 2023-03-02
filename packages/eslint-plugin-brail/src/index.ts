import * as Rules from "./rules";
import {
  HtmlAttributeRuleMap,
  HtmlElementRuleMap,
  ImageRuleMap,
} from "./rules";
import { CssRuleMap } from "./rules/css-rules";

type ConfigRules = {
  [key in `@brail/${keyof (CssRuleMap &
    ImageRuleMap &
    HtmlAttributeRuleMap &
    HtmlElementRuleMap)}`]: "warn" | "error" | "off";
};

const config = {
  rules: {
    ...Rules.cssRuleMap,
    ...Rules.imageRuleMap,
    ...Rules.htmlElementRuleMap,
    ...Rules.htmlAttributeRuleMap,
    ...Rules.miscRulesMap,
  },
  configs: {
    recommended: {
      plugins: ["@brail"],
      parser: "@typescript-eslint/parser",
      rules: <ConfigRules>{
        ...[
          ...Object.entries(Rules.cssRuleMap),
          ...Object.entries(Rules.imageRuleMap),
          ...Object.entries(Rules.htmlElementRuleMap),
          ...Object.entries(Rules.htmlAttributeRuleMap),
        ].reduce((acc, [key, value]) => {
          acc[`@brail/${key}` as keyof ConfigRules] = "warn";
          return acc;
        }, {} as ConfigRules),
      },
    },
  },
};

module.exports = config;
