import { NextApiHandler } from "next";
import { nextHandler } from "trpc-playground/handlers/next";
import { appRouter } from "../../brail/example-trpc-router";

const setupHandler = nextHandler({
  router: appRouter,
  trpcApiEndpoint: "/api/trpc",
  playgroundEndpoint: "/api/playground",
});

const handler: NextApiHandler = async (req, res) => {
  const playgroundHandler = await setupHandler;
  await playgroundHandler(req, res);
};

export default handler;
