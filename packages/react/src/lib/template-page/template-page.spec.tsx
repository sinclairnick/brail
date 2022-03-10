import { render } from '@testing-library/react';

import { TemplatePage } from './template-page';

describe('TemplatePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TemplatePage html='' />);
    expect(baseElement).toBeTruthy();
  });
});
