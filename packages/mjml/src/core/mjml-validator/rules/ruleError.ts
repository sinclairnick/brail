function formatInclude(element: any) {
  const { includedIn } = element
  if (!(includedIn && includedIn.length)) return ''

  const formattedIncluded = includedIn
    .slice()
    .reverse()
    .map(({
    line,
    file,
  }: any) => `line ${line} of file ${file}`)
    .join(', itself included at ')

  return `, included at ${formattedIncluded}`
}

export default function ruleError(message: any, element: any) {
  const { line, tagName, absoluteFilePath } = element

  return {
    line,
    message,
    tagName,
    formattedMessage: `Line ${line} of ${absoluteFilePath}${formatInclude(
      element,
    )} (${tagName}) — ${message}`,
  }
}
