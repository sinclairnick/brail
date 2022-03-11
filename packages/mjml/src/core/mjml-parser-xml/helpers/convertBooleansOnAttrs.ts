// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { mapValues } from 'lodash'

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
