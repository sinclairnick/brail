import { headStore } from "../../styles";

export type StyleProps = {
  children: string;
};

export const Style = (props: StyleProps) => {
  headStore.addStyle(props.children);
  return <></>;
};
