import fs from 'fs'
import glob from 'glob'

import { flatMap } from 'lodash'

export const flatMapPaths = (paths: any) => flatMap(paths, (p: any) => glob.sync(p, { nodir: true }))

export default (path: any) => {
  try {
    return { file: path, mjml: fs.readFileSync(path).toString() }
  } catch (e) {
    // eslint-disable-next-line
    console.warn(`Cannot read file: ${path} doesn't exist or no access`, e)
    return {}
  }
}
