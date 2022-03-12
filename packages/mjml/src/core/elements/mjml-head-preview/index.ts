import { HeadComponent } from '../../mjml-core';

export default class MjPreview extends HeadComponent {
  static componentName = 'mj-preview';

  static endingTag = true;

  override context: any;

  override getContent: any;

  handler() {
    const { add } = this.context;

    add('preview', this.getContent());
  }
}
