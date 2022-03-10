import React, { Component } from 'react';

import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlPreviewProps = {
  children?: React.ReactNode;
};

export const MjmlPreview = createMjmlElement<MjmlPreviewProps>('mj-preview');
