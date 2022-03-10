import React, { Component, createElement } from 'react';
import { string } from 'prop-types';

export class MjmlHtml extends Component {
  static propTypes = {
    tag: string,
    html: string.isRequired,
  };

  override render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'tag' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
    const { tag, html } = this.props;
    return createElement(tag || 'mj-raw', {
      dangerouslySetInnerHTML: {
        __html: html,
      },
    });
  }
}
