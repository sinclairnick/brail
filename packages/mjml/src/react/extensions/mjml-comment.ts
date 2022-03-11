import { Component, createElement } from 'react';
import { string } from 'prop-types';

import { handleMjmlProps } from '../utils';

export class MjmlComment extends Component {
  static propTypes = {
    children: string.isRequired,
  };

  render() {
    const { children, ...rest } = this.props;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'trim' does not exist on type 'true | Rea... Remove this comment to see the full error message
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
