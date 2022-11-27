import forEach from 'lodash/forEach';
import map from 'lodash/map';

// eslint-disable-next-line import/prefer-default-export
export function buildFontsTags(content: any, inlineStyle: any, fonts = {}) {
  const toImport: any = [];

  forEach(fonts, (url: any, name: any) => {
    const regex = new RegExp(`"[^"]*font-family:[^"]*${name}[^"]*"`, 'gmi');
    const inlineRegex = new RegExp(`font-family:[^;}]*${name}`, 'gmi');

    if (
      content.match(regex) ||
      inlineStyle.some((s: any) => s.match(inlineRegex))
    ) {
      toImport.push(url);
    }
  });

  if (toImport.length > 0) {
    return `
      <!--[if !mso]><!-->
        ${map(
          toImport,
          (url: any) => `<link href="${url}" rel="stylesheet" type="text/css">`
        ).join('\n')}
        <style type="text/css">
          ${map(toImport, (url: any) => `@import url(${url});`).join('\n')}
        </style>
      <!--<![endif]-->\n
    `;
  }

  return '';
}
