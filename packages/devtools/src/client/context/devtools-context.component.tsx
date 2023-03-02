import { TRPCUntypedClient } from "@trpc/client";
import { AnyRouter } from "@trpc/server";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { createTrpc } from "../trpc";

export type IDevtoolsContext = {
  trpc: TRPCUntypedClient<AnyRouter>;
};

const DevtoolsContext = createContext<IDevtoolsContext | null>(null);

export type DevtoolsProviderProps = PropsWithChildren<{
  apiPath: string;
}>;

export const DevtoolsProvider = (props: DevtoolsProviderProps) => {
  const { apiPath, children } = props;

  const trpc = useMemo(() => {
    return createTrpc({ apiPath });
  }, [apiPath]);

  const value: IDevtoolsContext = {
    trpc,
  };

  return (
    <DevtoolsContext.Provider value={value}>
      {children}
    </DevtoolsContext.Provider>
  );
};

export const useDevtoolsContext = () => {
  const context = useContext(DevtoolsContext);
  if (context === null) {
    throw new Error(
      "useDevtoolsContext must be used within a DevtoolsProvider"
    );
  }
  return context;
};
