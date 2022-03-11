
import { HeadComponent } from '../../mjml-core'

export default class MjHead extends HeadComponent {
  static componentName = 'mj-head'

  handlerChildren: any;

  handler() {
    return this.handlerChildren()
  }
}
