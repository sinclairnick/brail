import { BrailIcon } from "../../icons/brail-icon";
import { Stack, Button, theme, styled } from "../../theme/theme";
import {
  FileIcon,
  TableIcon,
  MailIcon,
  ArrowUpRightIcon,
} from "@primer/octicons-react";
import { SplitState, TabKey } from "../shell.component";

const Tabs = [
  { label: "Templates", icon: FileIcon, key: "templates" },
  // { label: "Playground", icon: BeakerIcon, key: "playground" },
  { label: "Send", icon: MailIcon, key: "send" },
  {
    label: "View",
    icon: ArrowUpRightIcon,
    key: "view",
    onClick: () => {
      const url = new URL(location.href);
      url.searchParams.set("layout", "false");
      window.open(url);
    },
  },
] satisfies Array<{
  label: string;
  icon: typeof FileIcon;
  key: TabKey;
  onClick?: () => void;
}>;

export type LeftToolbarProps = {
  selectedTab: TabKey;
  setSelectedTab: (value: TabKey) => void;
  splitState: SplitState;
  setSplitState: (value: SplitState) => void;
};

const ToolbarButton = styled(Button, {
  p: 4,
  borderLeftWidth: 2,
  borderLeftStyle: "solid",
  borderRadius: 0,
  borderLeftColor: "transparent",
});

const getNextSplit = (current: SplitState) => {
  if (current === "even") return "content";
  if (current === "content") return "even";
  return "even";
};

export const LeftToolbar = (props: LeftToolbarProps) => {
  const { selectedTab, setSelectedTab, setSplitState, splitState } = props;

  const onToggleSplit = () => {
    setSplitState(getNextSplit(splitState));
  };

  return (
    <Stack
      css={{
        br: "2px solid $gray4",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Stack>
        <ToolbarButton
          css={{ p: 4 }}
          onClick={() => {
            window.open("https://brail.dev");
          }}
        >
          <BrailIcon style={{ height: 24, width: 24 }} />
        </ToolbarButton>
        {Tabs.map((tab) => {
          const isActive = selectedTab === tab.key;

          return (
            <ToolbarButton
              key={tab.key}
              onClick={() => {
                if (tab.onClick) tab.onClick();
                else setSelectedTab(tab.key);
              }}
              css={{
                borderLeftColor: isActive ? "$gray12" : "transparent",
                "&:hover": {
                  "*": { fill: theme.colors.gray12.value },
                },
              }}
            >
              <tab.icon
                size={20}
                fill={
                  isActive
                    ? theme.colors.gray12.value
                    : theme.colors.gray10.value
                }
              />
            </ToolbarButton>
          );
        })}
      </Stack>
      <Stack>
        <ToolbarButton onClick={onToggleSplit}>
          <TableIcon size={20} />
        </ToolbarButton>
      </Stack>
    </Stack>
  );
};
