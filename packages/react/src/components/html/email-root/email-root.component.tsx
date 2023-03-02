import { PropsWithChildren } from "react";

export type EmailRootProps = PropsWithChildren<{}>;

export const EmailRoot = (props: EmailRootProps) => {
  const { children } = props;

  return (
    <html
      lang="en"
      {...{
        xmlns: "http://www.w3.org/1999/xhtml",
        "xmlns:o": "urn:schemas-microsoft-com:office:office",
        "xmlns:v": "urn:schemas-microsoft-com:vml",
      }}
      style={{ border: 0, padding: 0 }}
    >
      {children}
    </html>
  );
};
