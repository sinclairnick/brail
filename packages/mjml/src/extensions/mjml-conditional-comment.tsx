import React, { Component } from 'react';
import { string } from 'prop-types';

import { MjmlComment } from './mjml-comment';

export class MjmlConditionalComment extends Component {
  static propTypes = {
    children: string.isRequired,
    condition: string.isRequired,
  };

  static defaultProps = {
    condition: 'if gte mso 9',
  };

  override render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'condition' does not exist on type 'Reado... Remove this comment to see the full error message
    const { children, condition, ...rest } = this.props;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'trim' does not exist on type 'true | Rea... Remove this comment to see the full error message
    if (children && children.trim().length) {
      return (
        <MjmlComment {...rest}>
          {`[${condition}]>${children}<![endif]`}
        </MjmlComment>
      );
    }
    return null;
  }
}
