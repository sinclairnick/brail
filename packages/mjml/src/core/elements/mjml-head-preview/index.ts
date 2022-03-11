import { HeadComponent } from '../../mjml-core';

export default class MjPreview extends HeadComponent {
  static componentName = 'mj-preview';

  static endingTag = true;

  context: any;

  getContent: any;

  handler() {
    const { add } = this.context;

    add('preview', this.getContent());
  }
}
