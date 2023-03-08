import { reset, Stack } from "../theme/theme";
import { PropsWithChildren, useState } from "react";
import { LeftToolbar } from "./left-toolbar/left-toolbar.component";
import { LeftPanel } from "./left-panel/left-panel.component";
import { TopToolbar } from "./top-toolbar/top-toolbar.component";
import { Iframe, useIframe } from "../iframe/iframe.component";
import { AnyTemplateMap } from "@brail/types";
import { motion } from "framer-motion";
import { flattenTemplates } from "../util/templates.util";
import { useRouter } from "next/router.js";
import Head from "next/head.js";
import { FileTree } from "./left-panel/file-tree/file-tree.component";
import { Sending } from "./left-panel/sending/sending.component";
import { useIsMounted } from "../util/is-mounted.hook";

export type AppShellProps = PropsWithChildren<{
  templates: AnyTemplateMap;
}>;

const getObjectPath = <T extends { [key: string]: any }, P extends string>(
  obj: T,
  path: P | undefined
): T[P] | undefined => {
  if (path == null) return;
  const parts = path.split(".");
  let temp = obj as any;
  for (const part of parts) {
    temp = temp[part];
    if (temp == null) return;
  }
  return temp;
};

export type TabKey = "templates" | "playground" | "send" | "view";
export type SplitState = "even" | "content";

const getSplitWidths = (split: SplitState) => {
  switch (split) {
    case "even":
      return { content: "50%", panel: "50%" };
    case "content":
      return { content: "auto", panel: 300 };
  }
};

export const AppShell = (props: AppShellProps) => {
  reset();
  const [isMobile, setIsMobile] = useState(false);
  const iframe = useIframe();
  const router = useRouter();
  const path = router.asPath.split("?")[0].replace(/#.*/, "");
  const templates = flattenTemplates(props.templates);
  const activeTemplate = templates[path];
  const [selectedTab, setSelectedTab] = useState<TabKey>("templates");
  const isMounted = useIsMounted();
  const [splitState, setSplitState] = useState<SplitState>("content");
  const splitWidths = getSplitWidths(splitState);

  return (
    <>
      <Stack
        css={{
          flexDirection: "row",
          height: "100%",
          minHeight: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
        style={{
          display: iframe.url == null ? "none" : "flex",
        }}
      >
        <Head>
          <title>
            {activeTemplate?.title ??
              activeTemplate?.__path?.split("/").slice(-1)[0] ??
              "Untitled Template"}{" "}
            &bull; Brail
          </title>
        </Head>
        {iframe.isFrameActive || (
          <>
            <LeftToolbar
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              splitState={splitState}
              setSplitState={setSplitState}
            />
            <LeftPanel width={splitWidths.panel}>
              <Stack
                style={{
                  display: selectedTab === "templates" ? "flex" : "none",
                }}
              >
                <FileTree templates={props.templates} />
              </Stack>
              {isMounted && (
                <Stack
                  style={{
                    display: selectedTab === "send" ? "flex" : "none",
                  }}
                >
                  <Sending
                    activeTemplate={activeTemplate}
                    width={splitWidths.panel}
                  />
                </Stack>
              )}
            </LeftPanel>
          </>
        )}
        <Stack css={{ position: "relative", flex: 1 }}>
          {iframe.isFrameActive || (
            <TopToolbar isMobile={isMobile} onMobileChange={setIsMobile} />
          )}
          <Stack
            css={{
              overflow: "scroll",
              flex: 1,
              alignItems: "center",
              backgroundColor: "#FAFAFA",
              py: isMobile ? 4 : 0,
            }}
          >
            <Stack
              as={motion.div}
              initial={{ y: 5, opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.13 }}
              css={{
                width: isMobile ? 400 : "100%",
                height: "100%",
                overflow: "scroll",
                boxShadow: "0 0 10px 2px rgba(0,0,0,0.1)",
                borderRadius: isMobile ? 16 : 0,
              }}
            >
              <Iframe {...iframe}>{props.children}</Iframe>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
