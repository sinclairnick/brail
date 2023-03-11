import { AnyTemplateBuilder } from ".";
import {
  AnyThemeBuilder,
  createThemeBuilder,
} from "./styles/theme/theme-builder";
import { createTemplateBuilder } from "./template/template-builder";

export type InitBrail = {
  template: AnyTemplateBuilder;
  theme: AnyThemeBuilder;
};

export const initBrail = (): InitBrail => {
  return {
    template: createTemplateBuilder(),
    theme: createThemeBuilder(),
  };
};
