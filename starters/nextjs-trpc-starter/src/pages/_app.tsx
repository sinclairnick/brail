import { AppProps } from "next/app";

export default (props: AppProps) => {
  const { Component, pageProps } = props;
  return <Component {...pageProps} />;
};
