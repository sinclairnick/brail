import { Button, Stack } from "../../theme/theme";
import { HiDevicePhoneMobile, HiComputerDesktop } from "react-icons/hi2";

export type TopToolbarProps = {
  isMobile: boolean;
  onMobileChange: (val: boolean) => void;
};

export const TOP_TOOLBAR_HEIGHT = 40;

export const TopToolbar = (props: TopToolbarProps) => {
  const { isMobile, onMobileChange: onChange } = props;

  return (
    <Stack
      css={{
        height: TOP_TOOLBAR_HEIGHT,
        minHeight: TOP_TOOLBAR_HEIGHT,
        width: "100%",
        background: "rgba(255, 255, 255, 0.85)",
        zIndex: 2,
        borderBottom: "2px solid $gray4",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        css={{
          "*": {
            fill: isMobile ? "$gray12" : "$gray9",
          },
        }}
        onClick={() => onChange(true)}
      >
        <HiDevicePhoneMobile size={18} />
      </Button>
      <Button
        css={{
          "*": {
            fill: !isMobile ? "$gray12" : "$gray9",
          },
        }}
        onClick={() => onChange(false)}
      >
        <HiComputerDesktop size={18} />
      </Button>
    </Stack>
  );
};
