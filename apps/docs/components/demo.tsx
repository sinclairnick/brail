import {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { Colors } from "../constants";
import { Html } from "@brail/react";
import Head from "next/head";

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type DemoProps = PropsWithChildren<DivProps>;

export const Demo = (props: DemoProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      {hasMounted && (
        <div
          className="demo"
          style={{
            width: "100%",
            height: "auto",
            backgroundColor: Colors.grey100,
            marginTop: 16,
            marginBottom: 16,
            borderRadius: 8,
            overflow: "hidden",
            ...props.style,
          }}
        >
          <Html.EmailHead components={{ Head }} />
          {props.children}
        </div>
      )}
    </>
  );
};
