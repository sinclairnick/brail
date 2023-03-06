import { AppProps } from "next/app";
import { DevtoolsLayout } from "../brail/devtools";

export default (props: AppProps) => {
  const { Component, pageProps } = props;
  return (
    <DevtoolsLayout>
      <Component {...pageProps} />
    </DevtoolsLayout>
  );
};
