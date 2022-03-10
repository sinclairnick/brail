import React, { Component } from 'react';
import { string } from 'prop-types';

import { Raw } from '../elements/mjml-raw';

export class MjmlTrackingPixel extends Component {
  static propTypes = {
    src: string.isRequired,
  };

  override render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'src' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
    const { src } = this.props;
    const trackingPixelStyle = {
      display: 'table',
      height: '1px!important',
      width: '1px!important',
      border: '0!important',
      margin: '0!important',
      padding: '0!important',
    };
    return (
      <Raw>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the
        '--jsx' flag is provided... Remove this comment to see the full error
        message
        <img
          src={src}
          style={trackingPixelStyle}
          width={1}
          height={1}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ src: any; style: { display: string; height... Remove this comment to see the full error message
          border={0}
        />
      </Raw>
    );
  }
}
