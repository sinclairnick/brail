import { createElement } from 'react';
import ReactReconciler from 'react-reconciler';
import * as ReactDOMServer from 'react-dom/server';

import { noop, escapeTextForBrowser, trimContent } from './render-utils';

const reconciler = ReactReconciler({
  supportsMutation: true,
  isPrimaryRenderer: false,
  createTextInstance(text: any) {
    return escapeTextForBrowser(text);
  },
  createInstance(type: any, props: any) {
    if (!type.startsWith('mj')) {
      return { isReact: true, type, props };
    }

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
    container.result = child;
  },
  appendInitialChild(parent: any, child: any) {
    if (typeof parent === 'string' || parent.isReact) {
      return;
    }
    if (typeof child === 'string') {
      parent.content = (parent.content || '') + child;
    } else if (child.isReact) {
      const content = ReactDOMServer.renderToStaticMarkup(
        createElement(child.type, child.props)
      );
      parent.content = (parent.content || '') + content;
    } else {
      parent.children = (parent.children || []).concat(child);
    }
  },
  prepareForCommit: () => null,
  resetAfterCommit: noop,
  clearContainer: noop,
  appendChild: noop,
  finalizeInitialChildren: () => false,
  getChildHostContext: noop,
  getRootHostContext: noop,
  shouldSetTextContent: () => false,
  getPublicInstance() {},
  cancelTimeout() {},
  noTimeout() {},
  now() {
    return Date.now();
  },
  preparePortalMount() {},
  prepareUpdate() {},
  scheduleTimeout() {},
  supportsHydration: false,
  supportsPersistence: false,
});

export function renderToJSON2(whatToRender: any) {
  // @ts-expect-error
  const container = reconciler.createContainer({}, false, false);
  reconciler.updateContainer(whatToRender, container, null, null);
  return container.containerInfo.result;
}
