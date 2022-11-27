import { Component, createElement, ReactNode } from 'react';
import { string } from 'prop-types';

import { handleMjmlProps } from '../utils';

export class MjmlComment extends Component<{ children: string }> {
  static propTypes = {
    children: string.isRequired,
  };

  override render() {
    const { children, ...rest } = this.props;
    if (children && children.trim().length) {
      return createElement('mj-raw', {
        ...handleMjmlProps(rest),
        dangerouslySetInnerHTML: {
          __html: `<!--${children}-->`,
        },
      });
    }
    return null;
  }
}
