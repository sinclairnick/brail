import { PropsWithChildren } from "react";

export type CenterContainerProps = PropsWithChildren<{
  maxWidth?: number;
}>;

export const CenterContainer = (props: CenterContainerProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingLeft: 32,
        paddingRight: 32,
      }}
    >
      <div style={{ maxWidth: props.maxWidth ?? 928 }}>{props.children}</div>
    </div>
  );
};
