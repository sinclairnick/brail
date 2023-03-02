import { AnyTemplateMap } from "@brail/types";
import { CreateSdkReturn } from "./sdk.types";

// Identity function that just simplifies return type,
// stripping irrelevant methods and properties
export const createSdk = <TMap extends AnyTemplateMap>(
  templates: TMap
): CreateSdkReturn<TMap> => {
  return templates as any;
};
