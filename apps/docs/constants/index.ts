export const Colors = {
  grey100: "#F6F6F6",
  brail: "#1B448D",
	brailLight: "hsl(219, 65%, 92%)"
};

export const BASE_URL = process.env.VERCEL_URL || "http://localhost:3001";

const buildStackblitzLink = (opts: {
  hideExplorer?: boolean;
  view?: "preview" | "both" | "editor";
}) => {
  const url = new URL(
    `https://stackblitz.com/github/sinclairnick/brail/tree/develop/starters/nextjs-trpc-starter`
  );
  url.searchParams.set("embed", "1");
  url.searchParams.set("file", "src/pages/account/sign-up.template.tsx");
  if (opts.hideExplorer) {
    url.searchParams.set("hideExplorer", "1");
  }
  url.searchParams.set("hideNavigation", "1");
  url.searchParams.set("view", opts.view ?? "preview");
  url.searchParams.set("initialPath", "/account/sign-up");
  return url.toString();
};

export const INDEX_SANDBOX_EMBED = buildStackblitzLink({ hideExplorer: true });

export const PLAYGROUND_SANDBOX_EMBED = buildStackblitzLink({ view: "both" });
