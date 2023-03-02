import { ImageFeature } from "../../util/feature-groups";
import { PropertyMatchFn } from "../../util/rule-meta";

export const ImageRuleOverride: {
  [key in ImageFeature]?: {
    matchIdentifier: PropertyMatchFn;
  };
} = {
  "image-jpg": {
    matchIdentifier: (key, value) => {
      return (
        key === "src" && /\.(jpg|jpeg)/.test(value?.toString().trim() ?? "")
      );
    },
  },
};
