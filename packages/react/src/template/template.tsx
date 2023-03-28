import {
  CreateTemplateReturn,
  TemplateProperties,
  AnyTemplateProps,
  AnyMeta,
  CreateTemplateArgs,
} from "@brail/types";
import { render } from "../render";
import { EmailHead } from "../components/html";
import Head from "next/head";

export const createTemplate = <
  TProps extends AnyTemplateProps = AnyTemplateProps,
  TMeta extends AnyMeta = AnyMeta,
  TDefaultMeta extends Partial<AnyMeta> = Partial<AnyMeta>,
  TRes extends any = void
>(
  args: CreateTemplateArgs<TProps, TMeta, TDefaultMeta, TRes>
): CreateTemplateReturn<TProps, TMeta, TDefaultMeta, TRes> => {
  let previewProps: TProps | undefined;

  if (args.previewProps) previewProps = args.previewProps;

  if (previewProps == null) {
    console.warn(
      "Preview props were not provided which may cause errors when rendering this template"
    );
  }

  const Preview = (props?: TProps): JSX.Element => {
    const _props =
      props != null && Object.keys(props).length > 0 ? props : previewProps;
    const Element = () => {
      return (
        <>
          <EmailHead components={{ Head }} />
          <args.view {...(_props as any)} />
        </>
      );
    };
    return <Element />;
  };

  const methods: TemplateProperties<TProps, TMeta, TDefaultMeta, TRes> = {
    _def: {
      _meta: undefined as any,
      _props: undefined as any,
      _res: undefined as any,
    },
    schema: {
      Meta: args.metaSchema,
      Props: args.propSchema,
      SendResponse: args.sendResSchema,
    },
    title: args.title,
    defaultMeta: args.defaultMeta,
    view: args.view,
    onSend: args.onSend,
    render: async (props) => {
      return render(<args.view {...props} />);
    },
    send: async (input) => {
      const html = await render(args.view(input.data));
      const defaultMeta = args.defaultMeta?.(input.data);
      const meta = Object.assign({}, defaultMeta ?? {}, input.meta ?? {});

      return args.onSend?.({ html, meta }) as Promise<TRes>;
    },
    previewProps: args.previewProps,
    preview: Preview,
  };

  const template = Object.assign(Preview, methods);

  return template;
};
