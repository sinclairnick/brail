import React, { PropsWithChildren } from "react";
import { Expand } from "../../util/types.util";
import { BackgroundColorValue } from "../../styles";
import { TypographyProviderProps } from "../typography";

export type AbsoluteUrl = `http://${string}` | `https://${string}`;

export type GlobalConfig = {
  baseUrl?: AbsoluteUrl;
};

export type EmailProps = Expand<
  {
    children: React.ReactNode;
    previewText?: string;
    /**
     * The background color of the email.
     */
    backgroundColor?: BackgroundColorValue;
  } & EmailProviderProps &
    TypographyProviderProps
>;

export type EmailContext = GlobalConfig & {
  /**
   * The max width of the inner container.
   * Typically this is between 600-700px (i.e. tablets)
   */
  maxWidth: number;
  /**
   * The min width of the inner container.
   * Typically this is between 200-300 (i.e. smallest mobiles)
   */
  minWidth: number;
};

export type EmailProviderProps = PropsWithChildren<Partial<EmailContext>>;

export type LayoutOpts = Omit<EmailProps, "children" | "previewText">;
