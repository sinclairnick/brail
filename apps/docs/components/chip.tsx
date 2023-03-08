import { Colors } from "@constants/index";
import { PropsWithChildren } from "react";

export type ChipProps = PropsWithChildren<{}>;

export const Chip = (props: ChipProps) => {
  return (
    <span
      style={{
        backgroundColor: Colors.brail,
        color: "white",
        borderRadius: 8,
        padding: 8,
        marginLeft: 8,
        fontSize: 14,
        lineHeight: "14px",
        overflow: "hidden",
      }}
    >
      {props.children}
    </span>
  );
};
