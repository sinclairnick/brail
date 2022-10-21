import { BodyComponent } from '../../mjml-core';

export default class MjBody extends BodyComponent {
  static componentName = 'mj-body';

  static allowedAttributes = {
    width: 'unit(px)',
    'background-color': 'color',
  };

  static override defaultAttributes = {
    width: '600px',
  };

  declare context: any;;

  declare getAttribute: any;;

  declare htmlAttributes: any;;

  declare renderChildren: any;;

  override getChildContext() {
    return {
      ...this.context,
      containerWidth: this.getAttribute('width'),
    };
  }

  override getStyles() {
    return {
      div: {
        'background-color': this.getAttribute('background-color'),
      },
    };
  }

  render() {
    const { setBackgroundColor } = this.context;
    setBackgroundColor(this.getAttribute('background-color'));

    return `
      <div
        ${this.htmlAttributes({
          class: this.getAttribute('css-class'),
          style: 'div',
        })}
      >
        ${this.renderChildren()}
      </div>
    `;
  }
}
