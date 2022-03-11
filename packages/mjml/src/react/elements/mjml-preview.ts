import React, { ReactNode } from 'react';

import { createMjmlElement } from '../utils/create-mjml-element';

export type PreviewProps = {
  children?: ReactNode;
};

export const Preview = createMjmlElement<PreviewProps>('mj-preview');
