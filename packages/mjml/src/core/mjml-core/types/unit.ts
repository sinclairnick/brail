// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { escapeRegExp } from 'lodash'
import Type from './type'

export const matcher = /^(unit|unitWithNegative)\(.*\)/gim

export default (params: any) => {
  const allowNeg = params.match(/^unitWithNegative/) ? '-|' : ''

  const units = params.match(/\(([^)]+)\)/)[1].split(',')
  const argsMatch = params.match(/\{([^}]+)\}/)
  const args = (argsMatch && argsMatch[1] && argsMatch[1].split(',')) || ['1'] // defaults to 1

  const allowAuto = units.includes('auto') ? '|auto' : ''
  const filteredUnits = units.filter((u: any) => u !== 'auto')

  return class Unit extends Type {
    static errorMessage = `has invalid value: $value for type Unit, only accepts (${units.join(
      ', ',
    )}) units and ${args.join(' to ')} value(s)`

    constructor(value: any) {
      super(value)

      this.matchers = [
        new RegExp(
          `^(((${allowNeg}\\d|,|\\.){1,}(${filteredUnits
            .map(escapeRegExp)
            .join('|')})|0${allowAuto})( )?){${args.join(',')}}$`,
        ),
      ]
    }
  }
}
