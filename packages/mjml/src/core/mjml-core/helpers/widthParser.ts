const unitRegex = /[\d.,]*(\D*)$/

export default function widthParser(width: any, options = {}) {

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'parseFloatToInt' does not exist on type ... Remove this comment to see the full error message
  const { parseFloatToInt = true } = options


  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  const widthUnit = unitRegex.exec(width.toString())[1]
  const unitParsers = {
    default: parseInt,
    px: parseInt,
    '%': parseFloatToInt ? parseInt : parseFloat,
  }

  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const parser = unitParsers[widthUnit] || unitParsers.default

  return {
    parsedWidth: parser(width),
    unit: widthUnit || 'px',
  }
}
