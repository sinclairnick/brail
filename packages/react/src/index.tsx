export * from "./components";
export * from "./render";
export * from "./template";
export * from "./styles/theme";
export type {
  AnyCreateTemplateReturn,
  AnyMeta,
  AnyOnSendFn,
  AnyTemplateConfig,
  AnyTemplateMap,
  AnyTemplateProps,
  BrailOptions,
  CreateTemplateArgs,
  CreateTemplateReturn,
  OnSendFn,
  RenderResult,
  SchemaOf,
  TemplateConfig,
  TemplatePreview,
  TemplateProperties,
  TemplateConfigDef,
  TemplateConfigSchema,
  TemplateDefaultMetaFn,
  TemplatePreviewComponent,
  TemplatePreviewFn,
  TemplateRenderFn,
  TemplateSendFn,
  TemplateViewFn,
} from "@brail/types";
export * from "./styles/attr/units";
export type {
  BorderProps,
  ShadowProps,
  ThemedBorderProps,
  ThemedShadowProps,
  BackgroundColorProps,
  BackgroundImageProps,
  ColorProps,
  ThemedBackgroundColorProps,
  ThemedColorProps,
  AlignValue,
  AutoValue,
  BackgroundColorValue,
  BackgroundPositionNumeric,
  BackgroundPositionOrienationWithNumeric,
  BackgroundPositionOrientation,
  BackgroundPositionOrientationWithoutNumeric,
  BackgroundPositionValue,
  BackgroundSizeValue,
  ColorValue,
  EmValue,
  FontProps,
  FontSizeValue,
  FontWeight,
  HeightValue,
  LineHeightValue,
  MarginLonghand,
  MarginProps,
  MarginShorthand,
  MarginStyle,
  MultiSpacingValue,
  NumericValue,
  PaddingLonghand,
  PaddingProps,
  PaddingShorthand,
  PaddingStyle,
  PercentValue,
  PixelValue,
  PtValue,
  RemValue,
  ResponsiveValue,
  ResponsiveValueArray,
  ResponsiveValueObject,
  ResponsiveValueReturn,
  SpacingLonghand,
  SpacingProps,
  SpacingShorthand,
  SpacingStyleProps,
  SpacingValue,
  ThemedFontProps,
  ThemedSpacingProps,
  UnitlessValue,
  VerticalAlignValue,
  VhValue,
  VmaxValue,
  VminValue,
  VwValue,
  WidthValue,
} from "./styles/attr";
export type { Expand } from "./util/types.util";

import { InitBrail, initBrail } from "./brail";
export type { InitBrail } from "./brail";

export type Brail = {
  init: () => InitBrail;
};

const root: Brail = { init: initBrail };

export default root;
