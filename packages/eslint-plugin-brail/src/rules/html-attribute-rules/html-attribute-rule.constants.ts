import { HtmlAttributeFeature } from "../../util/feature-groups";
import { PropertyMatchFn } from "../../util/rule-meta";

export const HtmlAttributeRuleOverride: {
  [key in HtmlAttributeFeature]?: {
    matchIdentifier: PropertyMatchFn;
  };
} = {
  "html-mailto-links": {
    matchIdentifier: (key, value) => {
      return (
        key === "href" &&
        new RegExp(`mailto`).test(value?.toString().trim() ?? "")
      );
    },
  },
  "html-image-maps": {
    matchIdentifier: (key, value) => {
      return key === "usemap";
    },
  },
  "html-loading-attribute": {
    matchIdentifier: (key, value) => {
      return key === "loading";
    },
  },
};
