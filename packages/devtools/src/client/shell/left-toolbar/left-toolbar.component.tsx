import { BrailIcon } from "../../icons/brail-icon";
import { Stack, Button, theme, styled } from "../../theme/theme";
import {
  HiOutlineDocument,
  HiOutlineEnvelope,
  HiArrowUpRight,
  HiChevronDoubleRight,
  HiChevronDoubleLeft,
} from "react-icons/hi2";
import type { IconType } from "react-icons";
import { SplitState, TabKey } from "../shell.component";

const Tabs = [
  { label: "Templates", icon: HiOutlineDocument, key: "templates" },
  // { label: "Playground", icon: BeakerIcon, key: "playground" },
  { label: "Send", icon: HiOutlineEnvelope, key: "send" },
  {
    label: "View",
    icon: HiArrowUpRight,
    key: "view",
    onClick: () => {
      const url = new URL(location.href);
      url.searchParams.set("layout", "false");
      window.open(url);
    },
  },
] satisfies Array<{
  label: string;
  icon: IconType;
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
                  "*": { color: theme.colors.gray12.value },
                },
              }}
            >
              <tab.icon
                size={20}
                strokeWidth={2}
                color={
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
        <ToolbarButton
          onClick={onToggleSplit}
          css={{
            "&:hover": { "*": { color: theme.colors.gray12.value } },
          }}
        >
          {splitState === "even" ? (
            <HiChevronDoubleLeft size={20} color={theme.colors.gray10.value} />
          ) : (
            <HiChevronDoubleRight size={20} color={theme.colors.gray10.value} />
          )}
        </ToolbarButton>
      </Stack>
    </Stack>
  );
};
