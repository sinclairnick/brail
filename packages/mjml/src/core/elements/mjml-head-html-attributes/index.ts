import { get } from 'lodash';

import { HeadComponent } from '../../mjml-core';

export default class MjHtmlAttributes extends HeadComponent {
  static componentName = 'mj-html-attributes';

  override context: any;

  override props: any;

  handler() {
    const { add } = this.context;
    const { children } = this.props;

    children
      .filter((c: any) => c.tagName === 'mj-selector')
      .forEach((selector: any) => {
        const { attributes, children } = selector;
        const { path } = attributes;

        const custom = children
          .filter(
            (c: any) =>
              c.tagName === 'mj-html-attribute' && !!get(c, 'attributes.name')
          )
          .reduce(
            (acc: any, c: any) => ({
              ...acc,
              [c.attributes.name]: c.content,
            }),
            {}
          );

        add('htmlAttributes', path, custom);
      });
  }
}
