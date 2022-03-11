import fs from 'fs'
import path from 'path'

export const isDirectory = (file: any) => {
  try {
    const outputPath = path.resolve(process.cwd(), file)

    return fs.statSync(outputPath).isDirectory()
  } catch (e) {
    return false
  }
}

const replaceExtension = (input: any) => input.replace(
  '.mjml',
  input.replace('.mjml', '').match(/(.)*\.(.)+$/g) ? '' : '.html',
)

const stripPath = (input: any) => input.match(/[^/\\]+$/g)[0]

const makeGuessOutputName = (outputPath: any) => {
  if (isDirectory(outputPath)) {
    return (input: any) => path.join(outputPath, replaceExtension(stripPath(input)))
  }

  return (input: any) => {
    if (!outputPath) {
      return replaceExtension(stripPath(input))
    }

    return outputPath
  }
}

export default (outputPath: any) => {
  const guessOutputName = makeGuessOutputName(outputPath)

  return ({
    file,
    compiled: { html },
  }: any) =>
    new Promise((resolve, reject) => {
      const outputName = guessOutputName(file)

      fs.writeFile(outputName, html, (err) => {
        if (err) {
          // eslint-disable-next-line prefer-promise-reject-errors
          return reject({ outputName, err })
        }

        return resolve(outputName)
      })
    })
}
