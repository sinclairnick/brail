import { createTemplate } from '@brail/core';
import { EmailTemplate } from '@brail/react';
import { Footer } from 'apps/example/components/footer';
import { ReusableHeader } from 'apps/example/components/reusable-header';

const NoPropsTemplateView = () => {
  return (
    <EmailTemplate title="Empty">
      <ReusableHeader />

      <Footer />
    </EmailTemplate>
  );
};

// Generate the template + metadata
export const NoPropsTemplate = createTemplate({
  name: 'No Props',
  path: '/no-props',
  template: NoPropsTemplateView,
  preview: () => ({}),
  meta: (props) => ({}),
  // NO PROPS SPECIFIED
});

export default NoPropsTemplate;
