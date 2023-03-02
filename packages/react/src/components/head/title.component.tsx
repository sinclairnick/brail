import { headStore } from "../../styles";

export type TitleProps = {
  children: string;
};

export const Title = (props: TitleProps) => {
  headStore.setTitle(props.children);
  return <></>;
};
