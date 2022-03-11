const _ = require('lodash')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'omitDeepLo... Remove this comment to see the full error message
function omitDeepLodash(input: any, props: any) {
  // @ts-expect-error ts-migrate(7023) FIXME: 'omitDeepOnOwnProps' implicitly has return type 'a... Remove this comment to see the full error message
  function omitDeepOnOwnProps(obj: any) {
    if (!_.isArray(obj) && !_.isObject(obj)) {
      return obj
    }

    if (_.isArray(obj)) {
      return omitDeepLodash(obj, props)
    }

    const o = {}
    _.forOwn(obj, (value: any, key: any) => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      o[key] = omitDeepLodash(value, props)
    })

    return _.omit(o, props)
  }

  if (typeof input === "undefined") {
    return undefined
  }

  if (_.isArray(input)) {
    return input.map(omitDeepOnOwnProps)
  }

  return omitDeepOnOwnProps(input)
}

function deepDiff(object: any, base: any) {
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'object' implicitly has an 'any' type.
	function changes(object, base) {
// @ts-expect-error ts-migrate(2693) FIXME: 'any' only refers to a type, but is being used as ... Remove this comment to see the full error message
		return _.transform(object: any, (result, value, key) => {
			if (!_.isEqual(value, base[key])) {
				result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value
			}
		});
	}
	return changes(object, base)
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'displayDif... Remove this comment to see the full error message
function displayDiff(obj1, obj2) {
  const diffs = deepDiff(obj1, obj2)
  if (_.isEqual(diffs, {})) {
    console.log('\x1b[32m', 'Parsing test successful') // eslint-disable-line no-console
    console.log('\x1b[0m', '') // eslint-disable-line no-console
  } else {
    console.log('\x1b[31m', 'Parsing test failed. Differences found :') // eslint-disable-line no-console
    console.log('\x1b[0m', JSON.stringify(diffs, null, 2)) // eslint-disable-line no-console
  }
}

module.exports = {
  omitDeepLodash,
  displayDiff,
}
