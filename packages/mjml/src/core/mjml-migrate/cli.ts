#!/usr/bin/env node

import fs from 'fs'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'yargs' or its corresponding ty... Remove this comment to see the full error message
import yargs from 'yargs'
import migrate from './migrate'
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module '../package.json'. Consider usi... Remove this comment to see the full error message
import { version } from '../package.json'

const program = yargs
  .usage('$0 [options] <input-file> <output-file>')
  .version(version)
  .help()

if (program.argv._.length !== 2) {
  program.showHelp()
  process.exit(1)
}

const [inputFilename, outputFilename] = program.argv._

const input = fs.readFileSync(inputFilename, 'utf8')
const output = migrate(input)

fs.writeFileSync(outputFilename, output)

// eslint-disable-next-line no-console
console.log(
  `${inputFilename} was converted to the MJML 4 syntax in ${outputFilename}`,
)
