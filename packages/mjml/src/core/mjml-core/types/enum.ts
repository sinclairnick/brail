
import { escapeRegExp } from 'lodash'
import Type from './type'

export const matcher = /^enum/gim

export default (params: any) => {
  const matchers = params.match(/\(([^)]+)\)/)[1].split(',')

  return class Enum extends Type {
    static errorMessage = `has invalid value: $value for type Enum, only accepts ${matchers.join(
      ', ',
    )}`

    declare matchers: any;;

    constructor(value: any) {
      super(value)

      this.matchers = matchers.map((m: any) => new RegExp(`^${escapeRegExp(m)}$`))
    }
  }
}
