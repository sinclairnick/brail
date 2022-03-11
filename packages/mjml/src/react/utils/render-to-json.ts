import React, { createElement } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import ReactReconciler from 'react-reconciler';
import ReactDOMServer from 'react-dom/server';

import { noop, escapeTextForBrowser, trimContent } from './render-utils';

const reconciler = ReactReconciler({
  supportsMutation: true,
  isPrimaryRenderer: true,
  createTextInstance(
    text: any /* rootContainerInstance, hostContext, internalInstanceHandle,*/,
  ) {
    return text;
  },
  createInstance(type: any, props: any /* rootContainerInstance, hostContext */) {
    const { children, dangerouslySetInnerHTML, ...rest } = props;
    const res = {
      tagName: type,
      attributes: rest,
    };
    Object.keys(res.attributes).forEach((key) => {
      const attrKey = res.attributes[key];
      if (attrKey === undefined) {
        delete res.attributes[key];
      }
      if (typeof attrKey === 'string') {
        res.attributes[key] = escapeTextForBrowser(attrKey);
      }
    });
    if (!type.startsWith('mj')) {
      return {
        type,
        props,
        children: [],
        isReact: true,
      };
    }

    if (props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html) {
      // using replace to prevent issue with $ sign in MJML
      // https://github.com/mjmlio/mjml2json#L145
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'content' does not exist on type '{ tagNa... Remove this comment to see the full error message
      res.content = props.dangerouslySetInnerHTML.__html.replace('$', '&#36;');
    }
    return res;
  },
  appendChildToContainer(container: any, child: any) {
    trimContent(child);
    container.resultObj = child;
  },
  appendInitialChild(parent: any, child: any) {
    if (child.isReact) {
      if (parent.isReact) {
        parent.children.push(child);
      } else {
        const reactElement = toReactElement(child);
        if (!parent.content) {
          parent.content = '';
        }
        parent.content += ReactDOMServer.renderToStaticMarkup(reactElement);
      }
    } else if (typeof child === 'string') {
      if (!child) return;
      if (parent.isReact) {
        parent.children.push(child);
      } else {
        if (!parent.content) {
          parent.content = '';
        }
        parent.content += escapeTextForBrowser(child);
      }
    } else {
      if (!parent.children) parent.children = [];
      parent.children.push(child);
    }
  },
  prepareForCommit: noop,
  resetAfterCommit: noop,
  clearContainer: noop,
  appendChild: noop,
  finalizeInitialChildren: noop,
  getChildHostContext: noop,
  getRootHostContext: noop,
  shouldSetTextContent: noop,
});

export function renderToJSON(whatToRender: any) {
  const container = reconciler.createContainer({}, false, false);
  reconciler.updateContainer(whatToRender, container, null, null);
  return container.containerInfo.resultObj;
}

function toReactElement(element: any) {
  if (element.children.length === 0) {
    return createElement(element.type, element.props);
  }
  return createElement(
    element.type,
    element.props,
    element.children.map((child: any) => typeof child === 'string' ? child : toReactElement(child),
    ),
  );
}
