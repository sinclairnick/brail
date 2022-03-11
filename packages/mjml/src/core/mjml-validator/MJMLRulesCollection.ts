import validAttributes from './rules/validAttributes'
import validChildren from './rules/validChildren'
import validTag from './rules/validTag'
import validTypes from './rules/validTypes'
import errorAttr from './rules/errorAttr'

const MJMLRulesCollection = {
  validAttributes,
  validChildren,
  validTag,
  validTypes,
  errorAttr,
}

export function registerRule(rule: any, name: any) {
  if (typeof rule !== 'function') {
    return console.error('Your rule must be a function')
  }

  if (name) {

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    MJMLRulesCollection[name] = rule
  } else {

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    MJMLRulesCollection[rule.name] = rule
  }

  return true
}

export default MJMLRulesCollection
