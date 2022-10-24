import { BodyComponent } from '../../mjml-core';

export default class MjAccordion extends BodyComponent {
  static componentName = 'mj-accordion';

  static allowedAttributes = {
    'container-background-color': 'color',
    border: 'string',
    'font-family': 'string',
    'icon-align': 'enum(top,middle,bottom)',
    'icon-width': 'unit(px,%)',
    'icon-height': 'unit(px,%)',
    'icon-wrapped-url': 'string',
    'icon-wrapped-alt': 'string',
    'icon-unwrapped-url': 'string',
    'icon-unwrapped-alt': 'string',
    'icon-position': 'enum(left,right)',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    padding: 'unit(px,%){1,4}',
  };

  static override defaultAttributes = {
    border: '2px solid black',
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
    'icon-align': 'middle',
    'icon-wrapped-url': 'https://i.imgur.com/bIXv1bk.png',
    'icon-wrapped-alt': '+',
    'icon-unwrapped-url': 'https://i.imgur.com/w4uTygT.png',
    'icon-unwrapped-alt': '-',
    'icon-position': 'right',
    'icon-height': '32px',
    'icon-width': '32px',
    padding: '10px 25px',
  };

  declare getAttribute: any;;

  declare htmlAttributes: any;;

  declare props: any;

  declare renderChildren: any;;

  headStyle = () =>
    `
      noinput.mj-accordion-checkbox { display:block!important; }

      @media yahoo, only screen and (min-width:0) {
        .mj-accordion-element { display:block; }
        input.mj-accordion-checkbox, .mj-accordion-less { display:none!important; }
        input.mj-accordion-checkbox + * .mj-accordion-title { cursor:pointer; touch-action:manipulation; -webkit-user-select:none; -moz-user-select:none; user-select:none; }
        input.mj-accordion-checkbox + * .mj-accordion-content { overflow:hidden; display:none; }
        input.mj-accordion-checkbox + * .mj-accordion-more { display:block!important; }
        input.mj-accordion-checkbox:checked + * .mj-accordion-content { display:block; }
        input.mj-accordion-checkbox:checked + * .mj-accordion-more { display:none!important; }
        input.mj-accordion-checkbox:checked + * .mj-accordion-less { display:block!important; }
      }

      .moz-text-html input.mj-accordion-checkbox + * .mj-accordion-title { cursor: auto; touch-action: auto; -webkit-user-select: auto; -moz-user-select: auto; user-select: auto; }
      .moz-text-html input.mj-accordion-checkbox + * .mj-accordion-content { overflow: hidden; display: block; }
      .moz-text-html input.mj-accordion-checkbox + * .mj-accordion-ico { display: none; }

      @goodbye { @gmail }
    `;

  override getStyles() {
    return {
      table: {
        width: '100%',
        'border-collapse': 'collapse',
        border: this.getAttribute('border'),
        'border-bottom': 'none',
        'font-family': this.getAttribute('font-family'),
      },
    };
  }

  render() {
    const childrenAttr = [
      'border',
      'icon-align',
      'icon-width',
      'icon-height',
      'icon-position',
      'icon-wrapped-url',
      'icon-wrapped-alt',
      'icon-unwrapped-url',
      'icon-unwrapped-alt',
    ].reduce(
      (res, val) => ({
        ...res,
        [val]: this.getAttribute(val),
      }),
      {}
    );

    return `
      <table
        ${this.htmlAttributes({
          'cell-spacing': '0',
          'cell-padding': '0',
          class: 'mj-accordion',
          style: 'table',
        })}
      >
        <tbody>
          ${this.renderChildren(this.props.children, {
            attributes: childrenAttr,
          })}
        </tbody>
      </table>
    `;
  }
}
