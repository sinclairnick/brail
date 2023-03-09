import { useRouter } from "next/router.js";
import { useEffect, PropsWithChildren, useState } from "react";
import { styled } from "../theme/theme";

export type IframeProps = PropsWithChildren<ReturnType<typeof useIframe>>;

const StyledIframe = styled("iframe", {
  border: "none",
  outline: "none",
});

export const useIframe = () => {
  const [origin, setOrigin] = useState<string | undefined>();
  const query = origin ? new URL(origin).searchParams : undefined;
  const isFrameActive = query?.get("layout")?.toLowerCase() === "false";
  const frameUrl = origin ? new URL(origin) : undefined;
  frameUrl?.searchParams.set("layout", "false");
  const router = useRouter();

  useEffect(() => {
    setOrigin(location.href);
  }, [router.asPath]);

  return {
    url: frameUrl?.toString(),
    isFrameActive,
  };
};

export const Iframe = (props: IframeProps) => {
  return (
    <>
      {props.isFrameActive ? (
        props.children
      ) : (
        <StyledIframe src={props.url} height="100%" width="100%" />
      )}
    </>
  );
};
