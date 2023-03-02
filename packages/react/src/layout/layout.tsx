import {
  Email,
  EmailProps,
  EmailProviderProps,
  LayoutOpts,
} from "../components";

/** Create a reusable root layout sharing styles and configuration */
export const createLayout = (rootOpts?: LayoutOpts) => {
  return (props: EmailProps & EmailProviderProps) => (
    <Email {...rootOpts} {...props} />
  );
};
