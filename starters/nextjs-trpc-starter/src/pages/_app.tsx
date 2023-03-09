import { Devtools } from "brail/devtools";
import { AppProps } from "next/app";
import { templates } from "../brail/templates.generated";

export default (props: AppProps) => {
  const { Component, pageProps } = props;
  return (
    <Devtools templates={templates}>
      <Component {...pageProps} />
    </Devtools>
  );
};
