import { BodyComponent } from '../../mjml-core';

export default class MjSocial extends BodyComponent {
  static componentName = 'mj-social';

  static allowedAttributes = {
    align: 'enum(left,right,center)',
    'border-radius': 'unit(px,%)',
    'container-background-color': 'color',
    color: 'color',
    'font-family': 'string',
    'font-size': 'unit(px)',
    'font-style': 'string',
    'font-weight': 'string',
    'icon-size': 'unit(px,%)',
    'icon-height': 'unit(px,%)',
    'icon-padding': 'unit(px,%){1,4}',
    'inner-padding': 'unit(px,%){1,4}',
    'line-height': 'unit(px,%,)',
    mode: 'enum(horizontal,vertical)',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    padding: 'unit(px,%){1,4}',
    'table-layout': 'enum(auto,fixed)',
    'text-padding': 'unit(px,%){1,4}',
    'text-decoration': 'string',
    'vertical-align': 'enum(top,bottom,middle)',
  };

  static override defaultAttributes = {
    align: 'center',
    'border-radius': '3px',
    color: '#333333',
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
    'font-size': '13px',
    'icon-size': '20px',
    'inner-padding': null,
    'line-height': '22px',
    mode: 'horizontal',
    padding: '10px 25px',
    'text-decoration': 'none',
  };

  declare getAttribute: any;;

  declare htmlAttributes: any;;

  declare props: any;

  declare renderChildren: any;;

  // eslint-disable-next-line class-methods-use-this
  override getStyles() {
    return {
      tableVertical: {
        margin: '0px',
      },
    };
  }

  getSocialElementAttributes() {
    const base: any = {};
    if (this.getAttribute('inner-padding')) {
      base.padding = this.getAttribute('inner-padding');
    }

    return [
      'border-radius',
      'color',
      'font-family',
      'font-size',
      'font-weight',
      'font-style',
      'icon-size',
      'icon-height',
      'icon-padding',
      'text-padding',
      'line-height',
      'text-decoration',
    ].reduce((res, attr) => {
      res[attr] = this.getAttribute(attr);
      return res;
    }, base);
  }

  renderHorizontal() {
    const { children } = this.props;

    return `
     <!--[if mso | IE]>
      <table
        ${this.htmlAttributes({
          align: this.getAttribute('align'),
          border: '0',
          cellpadding: '0',
          cellspacing: '0',
          role: 'presentation',
        })}
      >
        <tr>
      <![endif]-->
      ${this.renderChildren(children, {
        attributes: this.getSocialElementAttributes(),
        renderer: (component: any) =>
          component.constructor.isRawElement()
            ? component.render()
            : `
          <!--[if mso | IE]>
            <td>
          <![endif]-->
            <table
              ${component.htmlAttributes({
                align: this.getAttribute('align'),
                border: '0',
                cellpadding: '0',
                cellspacing: '0',
                role: 'presentation',
                style: {
                  float: 'none',
                  display: 'inline-table',
                },
              })}
            >
              <tbody>
                ${component.render()}
              </tbody>
            </table>
          <!--[if mso | IE]>
            </td>
          <![endif]-->
        `,
      })}
      <!--[if mso | IE]>
          </tr>
        </table>
      <![endif]-->
    `;
  }

  renderVertical() {
    const { children } = this.props;

    return `
      <table
        ${this.htmlAttributes({
          border: '0',
          cellpadding: '0',
          cellspacing: '0',
          role: 'presentation',
          style: 'tableVertical',
        })}
      >
        <tbody>
          ${this.renderChildren(children, {
            attributes: this.getSocialElementAttributes(),
          })}
        </tbody>
      </table>
    `;
  }

  render() {
    return `
      ${
        this.getAttribute('mode') === 'horizontal'
          ? this.renderHorizontal()
          : this.renderVertical()
      }
    `;
  }
}
