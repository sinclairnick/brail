import { Expand } from "../../util/types.util";
import { PreviewText } from "../html/preview-text/preview-text.component";
import { TypographyProviderProps } from "../typography";
import { TypographyProvider } from "../typography/typography.constants";
import { EmailProvider } from "./email.constants";
import { EmailProps } from "./email.types";

export const Email = (props: Expand<EmailProps & TypographyProviderProps>) => {
  const {
    backgroundColor,
    baseUrl,
    children,
    maxWidth,
    minWidth,
    previewText,
    ...typographyProviderProps
  } = props;

  return (
    <EmailProvider baseUrl={baseUrl} minWidth={minWidth} maxWidth={maxWidth}>
      <TypographyProvider {...typographyProviderProps}>
        <center
          style={{
            width: "100%",
            minHeight: "100%",
            background: backgroundColor,
          }}
        >
          {previewText == null ? null : (
            <PreviewText>{previewText}</PreviewText>
          )}

          {children}
        </center>
      </TypographyProvider>
    </EmailProvider>
  );
};
