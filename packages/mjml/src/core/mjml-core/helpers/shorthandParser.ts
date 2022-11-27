
import get from 'lodash/get'

export default function (cssValue: any, direction: any) {
  const splittedCssValue = cssValue.split(' ')
  let directions = {}

  switch (splittedCssValue.length) {
    case 2:
      directions = { top: 0, bottom: 0, left: 1, right: 1 }
      break

    case 3:
      directions = { top: 0, left: 1, right: 1, bottom: 2 }
      break

    case 4:
      directions = { top: 0, right: 1, bottom: 2, left: 3 }
      break
    case 1:
    default:
      return parseInt(cssValue, 10)
  }


  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return parseInt(splittedCssValue[directions[direction]] || 0, 10)
}

export function borderParser(border: any) {
  return parseInt(get(border.match(/(?:(?:^| )(\d+))/), 1), 10) || 0
}
