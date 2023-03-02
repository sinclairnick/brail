import { PropsWithChildren } from "react";
import { EmailBody, EmailHead, EmailRoot } from "../components/html";

export const TemplateWrapper = (props: PropsWithChildren) => {
  return (
    <EmailRoot>
      <EmailHead />
      <EmailBody>{props.children}</EmailBody>
    </EmailRoot>
  );
};
