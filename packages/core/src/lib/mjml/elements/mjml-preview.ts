import React from 'react';

import { createMjmlElement } from '../utils/create-mjml-element';

export type PreviewProps = {
  children?: React.ReactNode;
};

export const Preview = createMjmlElement<PreviewProps>('mj-preview');
