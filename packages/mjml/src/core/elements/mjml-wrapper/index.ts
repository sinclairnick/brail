import MjSection from '../mjml-section';

import { suffixCssClasses } from '../../mjml-core';

export default class MjWrapper extends MjSection {
  static override componentName = 'mj-wrapper';

  declare context: any;;

  declare props: any;

  declare renderChildren: any;;

  override renderWrappedChildren() {
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
