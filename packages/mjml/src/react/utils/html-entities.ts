const entities = require('./html-entities.json');

export function namedEntityToHexCode(html: any) {
  return html.replace(/&([a-z0-9]{2,8});/gi, (match: any, p1: any) => {
    if (entities[p1]) {
      return `&#${entities[p1]};`;
    }
    return match;
  });
}
