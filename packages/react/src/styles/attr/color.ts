import { NormalizedAttribute } from "../../util/normalize-attributes";
import { AnyPalette, PaletteKey } from "../theme/theme.types";
import { ensureAbsoluteUrl } from "./href";
import {
  BackgroundColorValue,
  BackgroundPositionValue,
  BackgroundSizeValue,
  ColorValue,
} from "./units";

export type ThemedColorProps<TPalette extends AnyPalette = AnyPalette> = {
  color: ColorValue | PaletteKey<TPalette>;
};

export type ColorProps = {
  color: ColorValue;
};

export type ThemedBackgroundColorProps<TPalette extends AnyPalette> = {
  backgroundColor: BackgroundColorValue | PaletteKey<TPalette>;
};

export type BackgroundColorProps = {
  backgroundColor: BackgroundColorValue;
};

export type BackgroundImageProps = {
  /** Background image URL */
  backgroundImage: string;
  backgroundPosition: BackgroundPositionValue;
  backgroundSize: BackgroundSizeValue;
};

export const normalizeBackgroundColor = (
  props?: Partial<BackgroundColorProps>
) => {
  if (!props) return {} satisfies NormalizedAttribute;

  return {
    attrs: { bgcolor: props.backgroundColor },
    styles: { backgroundColor: props.backgroundColor },
  } satisfies NormalizedAttribute;
};

export const normalizeColor = (props?: Partial<ColorProps>) => {
  if (!props || props.color == null) return {} satisfies NormalizedAttribute;

  return {
    attrs: { color: props.color },
    styles: { color: props.color },
  } satisfies NormalizedAttribute;
};

export const normalizeBackgroundImage = (
  props?: Partial<BackgroundImageProps>,
  baseUrl?: string
) => {
  if (!props || props.backgroundImage == null)
    return {} satisfies NormalizedAttribute;

  const url = ensureAbsoluteUrl(baseUrl, props.backgroundImage);

  return {
    styles: {
      backgroundSize: props.backgroundSize,
      backgroundPosition: props.backgroundPosition,
      backgroundImage:
        props.backgroundImage != null ? `url("${url}")` : undefined,
    },
  } satisfies NormalizedAttribute;
};
