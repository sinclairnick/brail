import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { HtmlElementFeature } from "../../util/feature-groups";
import { ElementMatchFn } from "../../util/rule-meta";

export const HtmlElementRuleOverride: {
  [key in HtmlElementFeature]?: {
    matchIdentifier: ElementMatchFn;
  };
} = {
  "html-anchor-links": {
    matchIdentifier: (node) => {
      return (
        node.name.type === AST_NODE_TYPES.JSXIdentifier &&
        node.name.name === "a" &&
        node.attributes.some(
          (attr) =>
            attr.type === AST_NODE_TYPES.JSXAttribute &&
            attr.name.type === AST_NODE_TYPES.JSXIdentifier &&
            attr.name.name === "href" &&
            attr.value?.type === AST_NODE_TYPES.Literal &&
            attr.value.value?.toString().startsWith("#")
        )
      );
    },
  },
  "html-button-reset": {
    matchIdentifier: (node) => {
      return (
        node.name.type === AST_NODE_TYPES.JSXIdentifier &&
        node.name.name === "button" &&
        node.attributes.some(
          (attr) =>
            attr.type === AST_NODE_TYPES.JSXAttribute &&
            attr.name.type === AST_NODE_TYPES.JSXIdentifier &&
            attr.name.name === "type" &&
            attr.value?.type === AST_NODE_TYPES.Literal &&
            attr.value.value?.toString() === "reset"
        )
      );
    },
  },
  "html-button-submit": {
    matchIdentifier: (node) => {
      return (
        node.name.type === AST_NODE_TYPES.JSXIdentifier &&
        node.name.name === "button" &&
        node.attributes.some(
          (attr) =>
            attr.type === AST_NODE_TYPES.JSXAttribute &&
            attr.name.type === AST_NODE_TYPES.JSXIdentifier &&
            attr.name.name === "type" &&
            attr.value?.type === AST_NODE_TYPES.Literal &&
            attr.value.value?.toString() === "submit"
        )
      );
    },
  },
  "html-h1-h6": {
    matchIdentifier: (node) => {
      return (
        node.name.type === AST_NODE_TYPES.JSXIdentifier &&
        ["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.name.name)
      );
    },
  },
  "html-input-checkbox": {
    matchIdentifier: (node) => {
      return (
        node.name.type === AST_NODE_TYPES.JSXIdentifier &&
        node.name.name === "input" &&
        node.attributes.some(
          (attr) =>
            attr.type === AST_NODE_TYPES.JSXAttribute &&
            attr.name.type === AST_NODE_TYPES.JSXIdentifier &&
            attr.name.name === "type" &&
            attr.value?.type === AST_NODE_TYPES.Literal &&
            attr.value.value?.toString() === "checkbox"
        )
      );
    },
  },
  "html-input-hidden": {
    matchIdentifier: (node) => {
      return (
        node.name.type === AST_NODE_TYPES.JSXIdentifier &&
        node.name.name === "input" &&
        node.attributes.some(
          (attr) =>
            attr.type === AST_NODE_TYPES.JSXAttribute &&
            attr.name.type === AST_NODE_TYPES.JSXIdentifier &&
            attr.name.name === "type" &&
            attr.value?.type === AST_NODE_TYPES.Literal &&
            attr.value.value?.toString() === "hidden"
        )
      );
    },
  },
  "html-input-radio": {
    matchIdentifier: (node) => {
      return (
        node.name.type === AST_NODE_TYPES.JSXIdentifier &&
        node.name.name === "input" &&
        node.attributes.some(
          (attr) =>
            attr.type === AST_NODE_TYPES.JSXAttribute &&
            attr.name.type === AST_NODE_TYPES.JSXIdentifier &&
            attr.name.name === "type" &&
            attr.value?.type === AST_NODE_TYPES.Literal &&
            attr.value.value?.toString() === "radio"
        )
      );
    },
  },
  "html-input-reset": {
    matchIdentifier: (node) => {
      return (
        node.name.type === AST_NODE_TYPES.JSXIdentifier &&
        node.name.name === "input" &&
        node.attributes.some(
          (attr) =>
            attr.type === AST_NODE_TYPES.JSXAttribute &&
            attr.name.type === AST_NODE_TYPES.JSXIdentifier &&
            attr.name.name === "type" &&
            attr.value?.type === AST_NODE_TYPES.Literal &&
            attr.value.value?.toString() === "reset"
        )
      );
    },
  },
  "html-input-submit": {
    matchIdentifier: (node) => {
      return (
        node.name.type === AST_NODE_TYPES.JSXIdentifier &&
        node.name.name === "input" &&
        node.attributes.some(
          (attr) =>
            attr.type === AST_NODE_TYPES.JSXAttribute &&
            attr.name.type === AST_NODE_TYPES.JSXIdentifier &&
            attr.name.name === "type" &&
            attr.value?.type === AST_NODE_TYPES.Literal &&
            attr.value.value?.toString() === "submit"
        )
      );
    },
  },
  "html-input-text": {
    matchIdentifier: (node) => {
      return (
        node.name.type === AST_NODE_TYPES.JSXIdentifier &&
        node.name.name === "input" &&
        node.attributes.some(
          (attr) =>
            attr.type === AST_NODE_TYPES.JSXAttribute &&
            attr.name.type === AST_NODE_TYPES.JSXIdentifier &&
            attr.name.name === "type" &&
            attr.value?.type === AST_NODE_TYPES.Literal &&
            attr.value.value?.toString() === "text"
        )
      );
    },
  },
  "html-lists": {
    matchIdentifier: (node) => {
      return (
        node.name.type === AST_NODE_TYPES.JSXIdentifier &&
        ["ul", "ol", "li", "dl", "dt", "dd"].includes(node.name.name)
      );
    },
  },
};
