import { HeadComponent } from '../../mjml-core';

export default class MjTitle extends HeadComponent {
  static componentName = 'mj-title';

  static endingTag = true;

  declare context: any;;

  declare getContent: any;;

  handler() {
    const { add } = this.context;

    add('title', this.getContent());
  }
}
