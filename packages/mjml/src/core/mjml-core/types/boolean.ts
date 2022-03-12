import Type from './type'

export const matcher = /^boolean/gim

export default () =>
  (class Boolean extends Type {
    override matchers: any;

    override value: any;

    constructor(boolean: any) {
      super(boolean)

      this.matchers = [/^true$/i, /^false$/i]
    }

    override isValid() {
      return this.value === true || this.value === false
    }
  })
