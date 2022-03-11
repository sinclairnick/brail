// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { forEach } from 'lodash'

export default function setEmptyAttributes(node: any) {
  if (!node.attributes) {
    node.attributes = {}
  }
  if (node.children) {
    forEach(node.children, setEmptyAttributes)
  }
}
