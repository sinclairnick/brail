import { HeadComponent } from '../../mjml-core';

export default class MjTitle extends HeadComponent {
  static componentName = 'mj-title';

  static endingTag = true;

  context: any;

  getContent: any;

  handler() {
    const { add } = this.context;

    add('title', this.getContent());
  }
}
