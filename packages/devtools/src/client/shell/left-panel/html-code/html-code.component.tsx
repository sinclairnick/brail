import { AnyCreateTemplateReturn } from "@brail/types";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import prettier from "prettier";
import HtmlParser from "prettier/parser-html";
import { Stack, Typography } from "../../../theme/theme";
import { SplitState } from "../../shell.component";

export type HtmlCodePanelProps = {
  activeTemplate?: AnyCreateTemplateReturn;
  splitState: SplitState;
};

type HtmlValue = {
  prettified: string;
  raw: string;
};

export const HtmlCodePanel = (props: HtmlCodePanelProps) => {
  const { activeTemplate, splitState } = props;
  const [value, setValue] = useState<HtmlValue | undefined>();

  useEffect(() => {
    if (!activeTemplate) return;

    const run = async () => {
      const html = await activeTemplate?.render(activeTemplate.previewProps);
      if (html === value?.raw) return;

      const prettyHtml = prettier.format(html, {
        plugins: [HtmlParser],
        parser: "html",
      });

      setValue({ raw: html, prettified: prettyHtml });
    };

    run();
  }, [activeTemplate, value?.raw]);

  return (
    <>
      {activeTemplate == null ? (
        <Stack css={{ p: 4 }}>
          <Typography css={{ color: "$gray11", fontSize: 16 }}>
            Select a template to see its HTML code.
          </Typography>
        </Stack>
      ) : (
        <Editor
          defaultLanguage="html"
          width="100%"
          height="90vh"
          language="json"
          value={value?.prettified}
          options={{
            readOnly: true,
            minimap: { enabled: splitState === "even" },
          }}
        />
      )}
    </>
  );
};
