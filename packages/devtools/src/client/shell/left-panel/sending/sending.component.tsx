import { useState, useEffect, useRef } from "react";
import { Button, Stack, Typography } from "../../../theme/theme";
import Editor, { OnMount, useMonaco, Monaco } from "@monaco-editor/react";
import { SendingProps } from "./sending.types";
import { AnySendValue, createBeforeMountHandler } from "./sending.constants";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useDevtoolsContext } from "../../../context/devtools-context.component";
import { useAsync } from "../../../util/use-async.hook";
import { TRPCClientError } from "@trpc/client";
import { setHeaders } from "../../../trpc";

type Editor = Parameters<OnMount>[0];

const LSKey = "__devtools_sendJson";
const getDefaultValue = (previewProps?: any) => {
  return {
    data: previewProps ?? {},
    meta: {},
  };
};

const getStorageVal = () => {
  const val = localStorage.getItem(LSKey);
  if (!val) return;
  try {
    return JSON.parse(val);
  } catch (e) {
    return;
  }
};

const setStorageVal = (val: any) => {
  localStorage.setItem(LSKey, JSON.stringify(val));
};

export const Sending = (props: SendingProps) => {
  const { activeTemplate } = props;
  const [hasMounted, setHasMounted] = useState(false);
  const editorRef = useRef<Editor | undefined>();
  const monaco = useMonaco() ?? undefined;
  const [error, setError] = useState<string | undefined>();
  const { trpc } = useDevtoolsContext();
  const [sendReq, runSendReq] = useAsync<any, TRPCClientError<any>>();
  const [isEnabledReq, runIsEnabledReq] = useAsync<
    boolean,
    TRPCClientError<any>
  >();
  const isSendingEnabled = Boolean(isEnabledReq.data);
  const [value] = useState(() =>
    JSON.stringify(
      getStorageVal() ?? getDefaultValue(activeTemplate?.previewProps),
      null,
      4
    )
  );

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    runIsEnabledReq(async () => {
      const res = (await trpc.query(`__internal.isEnabled`)) as boolean;
      return res;
    });
  }, []);

  const handleBeforeMount = createBeforeMountHandler(activeTemplate);

  const handleSubmit = (editor?: Editor, monaco?: Monaco) => () => {
    if (!editor) return;

    const markers = monaco?.editor?.getModelMarkers({}) ?? [];

    if (markers.length > 0) {
      const [firstMarker] = markers;
      setError(
        `${firstMarker.message} (${firstMarker.startLineNumber}, ${firstMarker.startColumn})`
      );
      editor.focus();
      editor.setPosition({
        column: firstMarker.startColumn,
        lineNumber: firstMarker.startLineNumber,
      });
      return;
    }

    if (activeTemplate == null) return;

    const jsonValue = editor.getValue();
    const value = JSON.parse(jsonValue) as AnySendValue;
    const headers = value["$headers"];
    const data = { data: value.data, meta: value.meta }; // Strip $headers
    setStorageVal(data);

    runSendReq(async () => {
      setHeaders(headers ?? {});
      const res = await trpc.mutation(
        `templates.${activeTemplate.trpcPath}.send`,
        data
      );
      return res;
    });
  };

  const onMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      handleSubmit(editor, monaco)
    );
  };

  if (!hasMounted) return <></>;

  return (
    <>
      {isEnabledReq.isLoading ? (
        <Typography css={{ p: 4 }}>
          Checking if sending is enabled...
        </Typography>
      ) : isSendingEnabled ? (
        <Stack>
          {!activeTemplate && (
            <Stack css={{ p: 4 }}>
              <Typography css={{ color: "$gray11", fontSize: 16 }}>
                Select a template to send test emails.
              </Typography>
            </Stack>
          )}
          {activeTemplate && (
            <>
              <Stack css={{ p: 4 }}>
                <Button
                  css={{
                    backgroundColor: "$gray3",
                    display: "flex",
                    columnGap: 4,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={handleSubmit(editorRef.current, monaco)}
                  disabled={sendReq.isLoading}
                >
                  Send
                  <ArrowRightIcon />
                </Button>
                <Stack css={{ fontSize: 12, marginTop: 8, gap: 8 }}>
                  <Typography css={{ textAlign: "center", color: "$gray9" }}>
                    Or press <strong>Cmd</strong>
                    {" + "}
                    <strong>Enter</strong>
                  </Typography>
                  <Stack css={{ height: "12px", maxHeight: "max-content" }}>
                    {(() => {
                      if (error) {
                        return (
                          <Typography
                            css={{ textAlign: "center", color: "$red10" }}
                          >
                            {error}
                          </Typography>
                        );
                      }
                      if (sendReq.isLoading) {
                        return (
                          <Typography
                            css={{ textAlign: "center", color: "$gray9" }}
                          >
                            Sending...
                          </Typography>
                        );
                      }
                      if (sendReq.error) {
                        <Typography
                          css={{ textAlign: "center", color: "$red10" }}
                        >
                          Error {sendReq.error?.message}
                        </Typography>;
                      }
                      if (sendReq.data) {
                        return (
                          <Typography
                            css={{
                              textAlign: "center",
                              color: "$green10",
                              fontWeight: "bold",
                            }}
                          >
                            Sent successfully!
                          </Typography>
                        );
                      }
                      return null;
                    })()}
                  </Stack>
                </Stack>
              </Stack>
              <Editor
                defaultLanguage="json"
                width={"100%"}
                height={400}
                options={{
                  minimap: { enabled: false },
                }}
                beforeMount={handleBeforeMount}
                language="json"
                value={value}
                onMount={onMount}
              />
            </>
          )}
        </Stack>
      ) : (
        <Stack css={{ rowGap: 8, p: 4 }}>
          <Typography>
            <b>Sending has been disabled.</b>
          </Typography>
          <Typography css={{ fontSize: 14, color: "$gray10" }}>
            You can re-enable sending via the <code>isEnabled</code> devtools
            setting.
          </Typography>
        </Stack>
      )}
    </>
  );
};
