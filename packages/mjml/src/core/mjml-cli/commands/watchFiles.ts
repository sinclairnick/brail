/* eslint-disable no-console */
import chokidar from 'chokidar'
import glob from 'glob'
import path from 'path'
import mjml2html from 'mjml-core'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { flow, pickBy, flatMap, uniq, difference, remove } from 'lodash/fp'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { omit } from 'lodash'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'js-b... Remove this comment to see the full error message
import { html as htmlBeautify } from 'js-beautify'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'html... Remove this comment to see the full error message
import { minify as htmlMinify } from 'html-minifier'

import readFile from './readFile'
import makeOutputToFile from './outputToFile'
import fileContext from '../helpers/fileContext'

let dirty: any = []

const _flatMap = flatMap.convert({ cap: false }) // eslint-disable-line no-underscore-dangle
const flatMapAndJoin = _flatMap((v: any, k: any) => v.map((p: any) => path.join(k, p)))
const flatMapKeyAndValues = flow(
  _flatMap((v: any, k: any) => [k, ...v]),
  uniq,
)

export default (input: any, options: any) => {
  const dependencies = {}
  const outputToFile = makeOutputToFile(options.o)
  const getRelatedFiles = (file: any) => flow(
    pickBy((v: any, k: any) => k === file || v.indexOf(file) !== -1),
    Object.keys,
  )(dependencies)
  const synchronyzeWatcher = (filePath: any) => {
    getRelatedFiles(filePath).forEach((f: any) => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      dependencies[f] = fileContext(f, options.config.filePath)

      if (dirty.indexOf(f) === -1) {
        dirty.push(f)
      }
    })

    /* eslint-disable no-use-before-define */
    const files = {
      toWatch: flatMapKeyAndValues(dependencies),
      watched: flatMapAndJoin(watcher.getWatched()),
    }

    watcher.add(difference(files.toWatch, files.watched))
    watcher.unwatch(difference(files.watched, files.toWatch))
    /* eslint-enable no-use-before-define */
  }
  const readAndCompile = flow(
    (file: any) => ({
      file,
      content: readFile(file).mjml,
    }),
    (args: any) => {
      const { config, beautifyConfig, minifyConfig } = options
      const beautify = config.beautify && config.beautify !== 'false'
      const minify = config.minify && config.minify !== 'false'

      const compiled = mjml2html(args.content, {
        filePath: args.file,
        actualPath: args.file,
        ...omit(config, ['minify', 'beautify']),
      })
      if (beautify) {
        compiled.html = htmlBeautify(compiled.html, beautifyConfig)
      }
      if (minify) {
        compiled.html = htmlMinify(compiled.html, {
          ...minifyConfig,
          ...config.minifyOptions,
        })
      }

      return {
        ...args,
        compiled,
      }
    },
    (args: any) => {
      const {
        compiled: { errors },
      } = args

      errors.forEach((e: any) => console.warn(e.formattedMessage))

      return args
    },
    (args: any) => outputToFile(args)
      .then(() => console.log(`${args.file} - Successfully compiled`))
      .catch(() => console.log(`${args.file} - Error while compiling file`)),
  )

  const watcher = chokidar
    .watch(input.map((i: any) => i.replace(/\\/g, '/')))
    .on('change', (file) => synchronyzeWatcher(path.resolve(file)))
    .on('add', (file) => {
      const filePath = path.resolve(file)
      console.log(`Now watching file: ${filePath}`)

      const matchInputOption = input.reduce(
        (found: any, file: any) =>
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2-3 arguments, but got 1.
          found || glob(path.resolve(file)).minimatch.match(filePath),
        false,
      )

      if (matchInputOption) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        dependencies[filePath] = getRelatedFiles(filePath)
      }

      synchronyzeWatcher(filePath)
    })
    .on('unlink', (file) => {
      const filePath = path.resolve(file)

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      delete dependencies[path.resolve(filePath)]

      remove(dirty, (f: any) => f === filePath)

      synchronyzeWatcher(filePath)
    })

  setInterval(() => {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'f' implicitly has an 'any' type.
    dirty.forEach((f) => {
      console.log(`${f} - Change detected`)
      try {
        readAndCompile(f)
      } catch (e) {
        console.log(`${f} - Error while rendering the file : `, e)
      }
    })
    dirty = []
  }, 500)

  return []
}
/* eslint-enable no-console */
