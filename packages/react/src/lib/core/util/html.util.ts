import { Attributes } from '@brail/mjml/dist/react/elements';
import { kebabCase } from 'lodash';
import React, { CSSProperties } from 'react';

export class HtmlUtil {
  static toInlineStyle(styles: CSSProperties) {
    return Object.entries(styles).reduce((str, entry) => {
      return str + `${kebabCase(entry[0])}:${entry[1]};`;
    }, '');
  }

  static toAttributes(
    attr:
      | React.HTMLAttributes<HTMLElement>
      | React.TableHTMLAttributes<HTMLTableElement>
  ) {
    return Object.entries(attr).reduce((str, entry) => {
      return str + ` ${entry[0]}="${entry[1]}"`;
    }, '');
  }
}
