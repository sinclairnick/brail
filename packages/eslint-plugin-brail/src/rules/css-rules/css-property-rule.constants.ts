import { CssFeature } from "../../util/feature-groups";
import { PropertyMatchFn } from "../../util/rule-meta";

/** Override the mapping function from default */
export const CssRuleOverride: {
  [key in CssFeature]?: {
    matchIdentifier: PropertyMatchFn;
  };
} = {
  "css-at-font-face": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes("@font-face")),
  },
  "css-at-import": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes("@import")),
  },
  "css-at-keyframes": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes("@keyframes")),
  },
  "css-at-media-device-pixel-ratio": {
    matchIdentifier: (propertyKey) =>
      Boolean(
        propertyKey
          ?.toString()
          .replace(/ /g, "")
          .includes("@media(-webkit-device-pixel-ratio)")
      ),
  },
  "css-at-media-hover": {
    matchIdentifier: (propertyKey) => {
      const prop = propertyKey?.toString().replace(/ /g, "") ?? "";
      return (
        prop.includes("@media(hover)") || prop.includes("@media(hover: hover)")
      );
    },
  },
  "css-at-media-orientation": {
    matchIdentifier: (propertyKey) => {
      const prop = propertyKey?.toString().replace(/ /g, "") ?? "";
      return prop.includes("@media(orientation)");
    },
  },
  "css-at-media-prefers-color-scheme": {
    matchIdentifier: (propertyKey) => {
      const prop = propertyKey?.toString().replace(/ /g, "") ?? "";
      return prop.includes("@media(prefers-color-scheme)");
    },
  },
  "css-at-media-prefers-reduced-motion": {
    matchIdentifier: (propertyKey) => {
      const prop = propertyKey?.toString().replace(/ /g, "") ?? "";
      return prop.includes("@media(prefers-reduced-motion)");
    },
  },
  "css-at-media": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes("@media")),
  },
  "css-at-supports": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes("@supports")),
  },
  "css-pseudo-class-active": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes(":active")),
  },
  "css-pseudo-class-checked": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes(":checked")),
  },
  "css-pseudo-class-first-child": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes(":first-child")),
  },
  "css-pseudo-class-first-of-type": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes(":first-of-type")),
  },
  "css-pseudo-class-last-of-type": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes(":last-of-type")),
  },
  "css-pseudo-class-last-child": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes(":last-child")),
  },
  "css-pseudo-class-focus": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes(":focus")),
  },
  "css-pseudo-class-has": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes(":has")),
  },
  "css-pseudo-class-hover": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes(":hover")),
  },
  "css-pseudo-class-lang": {
    matchIdentifier: (propertyKey) =>
      Boolean(/lang\(.*\)/.test(propertyKey?.toString() ?? "")),
  },
  "css-pseudo-class-link": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes(":link")),
  },
  "css-pseudo-class-not": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes(":not")),
  },
  "css-pseudo-class-nth-child": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes(":nth-child")),
  },
  "css-pseudo-class-nth-last-child": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes(":nth-last-child")),
  },
  "css-pseudo-class-nth-last-of-type": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes(":nth-last-of-type")),
  },
  "css-pseudo-class-nth-of-type": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes(":nth-of-type")),
  },
  "css-pseudo-class-only-child": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes(":only-child")),
  },
  "css-pseudo-class-only-of-type": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes(":only-of-type")),
  },
  "css-pseudo-class-target": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes(":target")),
  },
  "css-pseudo-class-visited": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes(":visited")),
  },
  "css-pseudo-element-after": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes("::after")),
  },
  "css-pseudo-element-before": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes("::before")),
  },
  "css-pseudo-element-first-letter": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes("::first-letter")),
  },
  "css-pseudo-element-first-line": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes("::first-line")),
  },
  "css-pseudo-element-marker": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes("::marker")),
  },
  "css-pseudo-element-placeholder": {
    matchIdentifier: (propertyKey) =>
      Boolean(propertyKey?.toString().includes("::placeholder")),
  },
  "css-selector-adjacent-sibling": {
    matchIdentifier: (propertyKey) =>
      /(.*)+(.*)/.test(propertyKey?.toString().trimEnd() ?? ""),
  },
  "css-selector-attribute": {
    matchIdentifier: (propertyKey) =>
      /[(.*)]/.test(propertyKey?.toString().trim() ?? ""),
  },
  "css-selector-chaining": {
    matchIdentifier: (propertyKey) =>
      /(.*)?\.(.*)?\.(.*)?/.test(propertyKey?.toString().trim() ?? ""),
  },
  "css-selector-child": {
    matchIdentifier: (propertyKey) =>
      /(.*)>(.*)/.test(propertyKey?.toString().trim() ?? ""),
  },
  "css-selector-class": {
    matchIdentifier: (propertyKey) =>
      /^\.(.*)/.test(propertyKey?.toString().trim() ?? ""),
  },
  "css-selector-descendant": {
    matchIdentifier: (propertyKey) =>
      /(.*) (.*)/.test(propertyKey?.toString().trim() ?? ""),
  },
  "css-selector-general-sibling": {
    matchIdentifier: (propertyKey) =>
      /(.*)~(.*)/.test(propertyKey?.toString().trim() ?? ""),
  },
  "css-selector-grouping": {
    matchIdentifier: (propertyKey) =>
      /(.*),(.*)/.test(propertyKey?.toString().trim() ?? ""),
  },
  "css-selector-id": {
    matchIdentifier: (propertyKey) =>
      /#(.*)/.test(propertyKey?.toString().trim() ?? ""),
  },
  "css-selector-type": {
    matchIdentifier: (propertyKey) =>
      /[a-zA-Z]/.test(propertyKey?.toString().trim() ?? ""),
  },
  "css-selector-universal": {
    matchIdentifier: (propertyKey) =>
      /\*/.test(propertyKey?.toString().trim() ?? ""),
  },
  "css-column-layout-properties": {
    matchIdentifier: (propertyKey) =>
      /columns-.*/.test(propertyKey?.toString().trim() ?? ""),
  },
  "css-block-inline-size": {
    matchIdentifier: (propertyKey) =>
      /(block-size|inline-size)/.test(propertyKey?.toString().trim() ?? ""),
  },
  "css-display-flex": {
    matchIdentifier: (propertyKey, value) =>
      propertyKey?.toString().trim() === "display" && value === "flex",
  },
  "css-display-grid": {
    matchIdentifier: (propertyKey, value) =>
      propertyKey?.toString().trim() === "display" && value === "grid",
  },
  "css-display-none": {
    matchIdentifier: (propertyKey, value) =>
      propertyKey?.toString().trim() === "display" && value === "none",
  },
  "css-unit-calc": {
    matchIdentifier: (propertyKey, value) =>
      /calc\(.*\)/.test(value?.toString().trim() ?? ""),
  },
  "css-unit-ch": {
    matchIdentifier: (propertyKey, value) =>
      /[0-9.]*ch$/.test(value?.toString().trim() ?? ""),
  },
  "css-unit-cm": {
    matchIdentifier: (propertyKey, value) =>
      /[0-9.]*cm$/.test(value?.toString().trim() ?? ""),
  },
  "css-unit-em": {
    matchIdentifier: (propertyKey, value) =>
      /[0-9.]*em$/.test(value?.toString().trim() ?? ""),
  },
  "css-unit-ex": {
    matchIdentifier: (propertyKey, value) =>
      /[0-9.]*ex$/.test(value?.toString().trim() ?? ""),
  },
  "css-unit-in": {
    matchIdentifier: (propertyKey, value) =>
      /[0-9.]*in$/.test(value?.toString().trim() ?? ""),
  },
  "css-unit-initial": {
    matchIdentifier: (propertyKey, value) =>
      /^initial/.test(value?.toString().trim() ?? ""),
  },
  "css-unit-mm": {
    matchIdentifier: (propertyKey, value) =>
      /[0-9.]*mm$/.test(value?.toString().trim() ?? ""),
  },
  "css-unit-pc": {
    matchIdentifier: (propertyKey, value) =>
      /[0-9.]*pc$/.test(value?.toString().trim() ?? ""),
  },
  "css-unit-percent": {
    matchIdentifier: (propertyKey, value) =>
      /[0-9.]*%$/.test(value?.toString().trim() ?? ""),
  },
  "css-unit-pt": {
    matchIdentifier: (propertyKey, value) =>
      /[0-9.]*pt$/.test(value?.toString().trim() ?? ""),
  },
  "css-unit-px": {
    matchIdentifier: (propertyKey, value) =>
      /[0-9.]*px$/.test(value?.toString().trim() ?? ""),
  },
  "css-unit-vh": {
    matchIdentifier: (propertyKey, value) =>
      /[0-9.]*vh$/.test(value?.toString().trim() ?? ""),
  },
  "css-unit-vmax": {
    matchIdentifier: (propertyKey, value) =>
      /[0-9.]*vmax$/.test(value?.toString().trim() ?? ""),
  },
  "css-unit-vmin": {
    matchIdentifier: (propertyKey, value) =>
      /[0-9.]*vmin$/.test(value?.toString().trim() ?? ""),
  },
  "css-unit-vw": {
    matchIdentifier: (propertyKey, value) =>
      /[0-9.]*vw$/.test(value?.toString().trim() ?? ""),
  },
  "css-function-clamp": {
    matchIdentifier: (propertyKey, value) =>
      /clamp\((.*)\)/.test(value?.toString().trim() ?? ""),
  },
  "css-function-max": {
    matchIdentifier: (propertyKey, value) =>
      /max\((.*)\)/.test(value?.toString().trim() ?? ""),
  },
  "css-function-min": {
    matchIdentifier: (propertyKey, value) =>
      /min\((.*)\)/.test(value?.toString().trim() ?? ""),
  },
  "css-important": {
    matchIdentifier: (propertyKey, value) =>
      /!important/.test(value?.toString().trim() ?? ""),
  },
};
