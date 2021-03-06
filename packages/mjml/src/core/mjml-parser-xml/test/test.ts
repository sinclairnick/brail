
const MJMLParser = require('../lib/index.js')
require('mjml')

const {components} = require('mjml-core')

const chai = require('chai')

const {displayDiff} = require('./test-utils')

const {omitDeepLodash} = require('./test-utils')

const testValues = require('./test-values')

/*
  If test fails, run it with --debug to log the details of the diff
*/


const parse = (mjml: any) => MJMLParser(mjml, {
  keepComments: true,
  components,
  filePath: '.',
})

testValues.forEach(testUnit => {

  const { test, mjml, validJson } = testUnit

  if (process.argv.indexOf('--debug') !== -1) {
    displayDiff(omitDeepLodash(validJson, 'file'), omitDeepLodash(parse(mjml), ['absoluteFilePath', 'file']))
  }

  chai.expect(omitDeepLodash(validJson, 'file'), `${test} test failed`)
      .to.deep.equal(omitDeepLodash(parse(mjml), ['absoluteFilePath', 'file']))
})
