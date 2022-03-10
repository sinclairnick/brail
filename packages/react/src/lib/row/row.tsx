import { MjmlSection } from '../../../../core/src/lib/mjml';
import { MjmlSectionProps } from '../../../../core/src/lib/mjml/mjml-section';

export type RowProps = MjmlSectionProps;

export const Row = (props: RowProps) => {
  return <MjmlSection padding={0} {...props} />;
};
