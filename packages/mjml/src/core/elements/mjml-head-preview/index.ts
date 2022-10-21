import { HeadComponent } from '../../mjml-core';

export default class MjPreview extends HeadComponent {
  static componentName = 'mj-preview';

  static endingTag = true;

  declare context: any;;

  declare getContent: any;;

  handler() {
    const { add } = this.context;

    add('preview', this.getContent());
  }
}
