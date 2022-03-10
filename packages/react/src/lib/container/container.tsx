import { MjmlWrapper } from '../../../../core/src/lib/mjml/mjml-wrapper';
import { MjmlType } from '../types';

export type ContainerProps = MjmlType<MjmlWrapper>;

export const Container = (props: ContainerProps) => {
  return <MjmlWrapper padding={0} {...props} />;
};
