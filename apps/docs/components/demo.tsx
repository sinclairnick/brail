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
import { createTemplate } from "@brail/react";

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type DemoProps = PropsWithChildren<DivProps>;

export const Demo = (props: DemoProps) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [html, setHtml] = useState<string | undefined>();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const childrenAsTemplate = createTemplate({
    view: () => <>{props.children}</>,
		previewProps: {}
  });

  useEffect(() => {
    if (!html) {
      childrenAsTemplate.render({}).then((html) => {
        setHtml(html);
      });
    }
  }, [html, childrenAsTemplate]);

  return (
    <>
      {hasMounted && (
        <div
          className="demo"
          style={{
						boxSizing: "border-box",
            width: "100%",
            backgroundColor: Colors.grey100,
            marginTop: 16,
            marginBottom: 16,
            borderRadius: 8,
            overflow: "hidden",
            ...props.style,
          }}
        >
          {<iframe scrolling="no" srcDoc={html} width="100%" height={props.style?.height} />}
        </div>
      )}
    </>
  );
};
