import * as React from 'react';
import { string } from 'prop-types';

import { Raw } from '../elements/mjml-raw';

export class MjmlYahooStyle extends React.Component<{
  children: string;
}> {
  static propTypes = {
    children: string.isRequired,
  };

  override render() {
    const { children, ...rest } = this.props;
    if (children && children.trim().length) {
      return (
        <Raw {...rest}>
          <style>{`@media screen yahoo {${children}}`}</style>
        </Raw>
      );
    }
    return null;
  }
}
