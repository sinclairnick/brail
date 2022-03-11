
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'chai'.
const chai = require('chai')
const widthParser = require('../lib/helpers/widthParser')


// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'testValues... Remove this comment to see the full error message
const testValues = [
  {
    input: '1px',
    options: {},
    output: { parsedWidth: 1, unit: 'px'},
  },
  {
    input: '33.3px',
    options: {},
    output: { parsedWidth: 33, unit: 'px'},
  },
  {
    input: '33.3%',
    options: {},
    output: { parsedWidth: 33, unit: '%'},
  },
  {
    input: '33.3%',
    options: { parseFloatToInt: false },
    output: { parsedWidth: 33.3, unit: '%'},
  },
]

testValues.forEach(testUnit => {

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type '{ input... Remove this comment to see the full error message
  const { input, options, output } = testUnit

  chai.expect(widthParser(input, options), `widthParser test failed`)
      .to.deep.equal(output)
})
