import Type from './type'

export const matcher = /^string/gim

export default () =>
  (class NString extends Type {
    declare matchers: any;;

    constructor(value: any) {
      super(value)

      this.matchers = [/.*/]
    }
  })
