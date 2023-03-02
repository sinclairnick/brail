import React, { PropsWithChildren } from "react";
import { DYNAMIC_STYLES_KEY } from "../../../render/render";
import { useHead } from "../../../styles";

export type EmailHeadProps = {
  components?: Partial<{
    Head: (props: { children: React.ReactNode }) => JSX.Element;
    Meta: (props: React.HTMLAttributes<HTMLMetaElement>) => JSX.Element;
    Title: (props: React.HTMLAttributes<HTMLTitleElement>) => JSX.Element;
  }>;
};

export const EmailHead = (props: EmailHeadProps) => {
  const [state, head] = useHead();

  const Head = props.components?.Head ?? "head";
  const Title = props.components?.Title ?? "title";
  const Meta = props.components?.Meta ?? "meta";

  return (
    <Head>
      {/* The title tag shows in email notifications, like Android 4.4.	 */}
      <Title>{state.title}</Title>
      <Meta charSet="utf-8" />
      {/* utf-8 works for most cases */}
      <Meta name="viewport" content="width=device-width" />
      {/* Forcing initial-scale shouldn't be necessary */}
      <Meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      {/* Use the latest (edge) version of IE rendering engine */}
      <Meta name="x-apple-disable-message-reformatting" />
      {/* Disable auto-scale in iOS 10 Mail entirely  */}
      <Meta
        name="format-detection"
        content="telephone=no,address=no,email=no,date=no,url=no"
      />
      <style id={DYNAMIC_STYLES_KEY}>{head.getStyleString()}</style>
    </Head>
  );
};
