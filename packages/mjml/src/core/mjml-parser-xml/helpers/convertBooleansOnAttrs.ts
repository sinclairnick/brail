
import mapValues from 'lodash/mapValues'

/**
 * Convert "true" and "false" string attributes values
 * to corresponding Booleans
 */

export default function convertBooleansOnAttrs(attrs: any) {
  return mapValues(attrs, (val: any) => {
    if (val === 'true') {
      return true
    }
    if (val === 'false') {
      return false
    }

    return val
  })
}
