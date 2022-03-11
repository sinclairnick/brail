// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'MJMLParser... Remove this comment to see the full error message
const MJMLParser = require('../lib/index.js')
require('mjml')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'components... Remove this comment to see the full error message
const {components} = require('mjml-core')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'chai'.
const chai = require('chai')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'displayDif... Remove this comment to see the full error message
const {displayDiff} = require('./test-utils')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'omitDeepLo... Remove this comment to see the full error message
const {omitDeepLodash} = require('./test-utils')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'testValues... Remove this comment to see the full error message
const testValues = require('./test-values')

/*
  If test fails, run it with --debug to log the details of the diff
*/

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'parse'.
const parse = (mjml: any) => MJMLParser(mjml, {
  keepComments: true,
  components,
  filePath: '.',
})

testValues.forEach(testUnit => {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'test' does not exist on type '{ input: s... Remove this comment to see the full error message
  const { test, mjml, validJson } = testUnit

  if (process.argv.indexOf('--debug') !== -1) {
    displayDiff(omitDeepLodash(validJson, 'file'), omitDeepLodash(parse(mjml), ['absoluteFilePath', 'file']))
  }

  chai.expect(omitDeepLodash(validJson, 'file'), `${test} test failed`)
      .to.deep.equal(omitDeepLodash(parse(mjml), ['absoluteFilePath', 'file']))
})
