import React, { useContext } from "react";
import { EmailContext, EmailProviderProps } from "./email.types";

const EmailContext = React.createContext<EmailContext | null>(null);

export const useEmailContext = () => {
  const context = React.useContext(EmailContext);
  if (!context) {
    throw new Error("useEmailContext must be used within EmailContext");
  }
  return context;
};

export const EmailProvider = (props: EmailProviderProps) => {
  const existingContext = useContext(EmailContext);
  const {
    baseUrl = existingContext?.baseUrl,
    maxWidth = existingContext?.maxWidth,
    minWidth = existingContext?.minWidth,
  } = props;

  const value: EmailContext = {
    minWidth: minWidth ?? 220,
    maxWidth: maxWidth ?? 680,
    baseUrl: baseUrl,
  };

  return (
    <EmailContext.Provider value={value}>
      {props.children}
    </EmailContext.Provider>
  );
};

export const EmailConsumer = EmailContext.Consumer;
