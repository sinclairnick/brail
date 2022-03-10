import { Mj } from '@brail/mjml';

export type ContainerProps = Mj.WrapperProps;

export const Container = (props: ContainerProps) => {
  return <Mj.Wrapper padding={0} {...props} />;
};
