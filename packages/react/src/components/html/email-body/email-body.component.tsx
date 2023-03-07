import React, { PropsWithChildren } from "react";

export type EmailBodyProps = PropsWithChildren<{
  components?: Partial<{
    Body: (props: React.HTMLAttributes<HTMLBodyElement>) => JSX.Element;
  }>;
}>;

export const EmailBody = (props: EmailBodyProps) => {
  const { children } = props;
  const Body = props.components?.Body ?? "body";

  return (
    <Body
      width="100%"
      style={{
        margin: 0,
        padding: "0 !important",
        // @ts-expect-error
        msoLineHeightRule: "exactly",
      }}
    >
      {children}
    </Body>
  );
};
