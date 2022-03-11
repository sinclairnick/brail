import Type from './type'

export const matcher = /^integer/gim

export default () =>
  (class NInteger extends Type {
    matchers: any;

    constructor(value: any) {
      super(value)

      this.matchers = [/\d+/]
    }
  })
