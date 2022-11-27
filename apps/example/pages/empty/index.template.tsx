import { createTemplate } from '@brail/mjml';
import { EmailTemplate } from '@brail/react';
import { Footer } from 'apps/example/components/footer';
import { ReusableHeader } from 'apps/example/components/reusable-header';

class EmptyTemplateProps {
  // No fields here
}

/** Welcome template but in nested folder structure */
const EmptyTemplateView = (props: EmptyTemplateProps) => {
  const {} = props;

  return (
    <EmailTemplate title="Empty">
      <ReusableHeader />

      <Footer />
    </EmailTemplate>
  );
};

// Generate the template + metadata
export const EmptyTemplate = createTemplate({
  name: 'Empty',
  path: '/empty',
  template: EmptyTemplateView,
  preview: () => ({}),
  meta: (props) => ({}),
  propType: EmptyTemplateProps,
});

export default EmptyTemplate;
