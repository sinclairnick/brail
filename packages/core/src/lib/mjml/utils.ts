// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const Color = require('color');

const handlers = {
  inline: boolToString,
  'full-width': boolToString,
  width: numberToPx,
  height: numberToPx,
  'border-radius': numberToPx,
  'border-width': numberToPx,
  'background-size': numberToPx,
  padding: numberToPx,
  'padding-top': numberToPx,
  'padding-right': numberToPx,
  'padding-bottom': numberToPx,
  'padding-left': numberToPx,
  'font-size': numberToPx,
  'letter-spacing': numberToPx,
  'line-height': numberToPx,
  'icon-padding': numberToPx,
  'text-padding': numberToPx,
  color: handleColor,
  'border-color': handleColor,
  'background-color': handleColor,
  'container-background-color': handleColor,
  'inner-background-color': handleColor,
};

export function handleMjmlProps(props: any) {
  return Object.keys(props).reduce((acc, curr) => {
    const mjmlProp = kebabCase(curr);
    return {
      ...acc,
      [mjmlProp]: handleMjmlProp(mjmlProp, props[curr]),
    };
  }, {});
}

function handleMjmlProp(name: any, value: any) {
  if (typeof value === 'undefined' || value === null) {
    return undefined;
  }
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const handler = handlers[name] || ((_name: any, value_: any) => value_);
  return handler(name, value);
}

function kebabCase(string: any) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function boolToString(name: any, value: any) {
  return value ? name : undefined;
}

function numberToPx(name: any, value: any) {
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
}

function handleColor(name: any, value: any) {
  const color = parseColor(value);
  if (color) {
    if (value[0] === '#' && value.length === 9) {
      const alpha = color.alpha().toFixed(2);
      return color.rgb().alpha(alpha).toString();
    }
    return value;
  }
  return '';
}

function parseColor(value: any) {
  try {
    return new Color(value);
  } catch (e) {}
  return null;
}
