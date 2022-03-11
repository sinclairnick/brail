import MjSection from '../mjml-section';

import { suffixCssClasses } from '../../mjml-core';

export default class MjWrapper extends MjSection {
  static componentName = 'mj-wrapper';

  context: any;

  props: any;

  renderChildren: any;

  renderWrappedChildren() {
    const { children } = this.props;
    const { containerWidth } = this.context;

    return `
      ${this.renderChildren(children, {
        renderer: (component: any) =>
          component.constructor.isRawElement()
            ? component.render()
            : `
        <!--[if mso | IE]>
          <tr>
            <td
              ${component.htmlAttributes({
                align: component.getAttribute('align'),
                class: suffixCssClasses(
                  component.getAttribute('css-class'),
                  'outlook'
                ),
                width: containerWidth,
              })}
            >
        <![endif]-->
          ${component.render()}
        <!--[if mso | IE]>
            </td>
          </tr>
        <![endif]-->
      `,
      })}
    `;
  }
}
