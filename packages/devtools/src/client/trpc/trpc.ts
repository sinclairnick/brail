import {
  createTRPCUntypedClient,
  httpBatchLink,
  HTTPHeaders,
  TRPCUntypedClient,
	createTRPCProxyClient
} from "@trpc/client";
import { AnyRouter } from "@trpc/server";

let headers: HTTPHeaders = {};

export const setHeaders = (newHeaders: HTTPHeaders) => {
  headers = newHeaders;
};

export const createTrpc = (args: {
  apiPath: string;
}): TRPCUntypedClient<AnyRouter> => {
  return createTRPCUntypedClient({
    links: [
      httpBatchLink({
        url: args.apiPath,
        headers() {
          return headers;
        },
      }),
    ],
  });
};
