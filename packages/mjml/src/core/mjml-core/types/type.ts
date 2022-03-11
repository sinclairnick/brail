// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { some, find } from 'lodash'
import typesConstructors from './index'

// Avoid recreate existing types
export const types = {}

export const initializeType = (typeConfig: any) => {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (types[typeConfig]) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return types[typeConfig]
  }

  const { typeConstructor } =
    find(typesConstructors, (type: any) => !!typeConfig.match(type.matcher)) || {}

  if (!typeConstructor) {
    throw new Error(`No type found for ${typeConfig}`)
  }

  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  types[typeConfig] = typeConstructor(typeConfig)

  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return types[typeConfig]
}

export default class Type {
  matchers: any;

  value: any;

  constructor(value: any) {
    this.value = value
  }

  isValid() {
    return some(this.matchers, (matcher: any) => `${this.value}`.match(matcher))
  }

  getErrorMessage() {
    if (this.isValid()) {
      return
    }

    const errorMessage =
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'errorMessage' does not exist on type 'Fu... Remove this comment to see the full error message
      this.constructor.errorMessage ||
      `has invalid value: ${this.value} for type ${this.constructor.name} `

    return errorMessage.replace(/\$value/g, this.value)
  }

  static check(type: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'typeChecker' does not exist on type 'Fun... Remove this comment to see the full error message
    return !!type.match(this.constructor.typeChecker)
  }

  getValue() {
    return this.value
  }
}
