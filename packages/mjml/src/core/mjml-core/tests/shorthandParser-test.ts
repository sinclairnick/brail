
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'chai'.
const chai = require('chai')
const helper = require('../lib/helpers/shorthandParser')

const shorthandParser = helper && helper.default


// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'testValues... Remove this comment to see the full error message
const testValues = [
  {
    input: '1px',
    output: { top: 1, right: 1, bottom: 1, left: 1 },
  },
  {
    input: '1px 0',
    output: { top: 1, right: 0, bottom: 1, left: 0 },
  },
  {
    input: '1px 2px 3px',
    output: { top: 1, right: 2, bottom: 3, left: 2 },
  },
  {
    input: '1px 2px 3px 4px',
    output: { top: 1, right: 2, bottom: 3, left: 4 },
  },
]

testValues.forEach(testUnit => {
  const { input, output } = testUnit
  const directions = ['top', 'right', 'bottom', 'left']
  directions.forEach(dir => {
    chai.expect(shorthandParser(input, dir), `shorthandParser test failed`)

        // @ts-expect-error ts-migrate(7015) FIXME: Element implicitly has an 'any' type because index... Remove this comment to see the full error message
        .to.deep.equal(output[dir])
  })
})
