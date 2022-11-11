import { DataType } from 'csstype';
import { CSSProperties } from 'react';

export type SpacingUnit = '%' | 'px' | 'em' | '';
export type PxAmount = number | `${string}px`;
export type PercentageAmount = `${string}%`;

export type Spacing<Units extends SpacingUnit> = number | `${string}${Units}`;
/** Microsoft limits border size at 8px */
export type BorderSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type BorderStyle = DataType.LineStyle;
export type Border = `${BorderSize}px ${string}`;

export type VerticalAlign = 'top' | 'bottom' | 'middle';
export type Align = 'left' | 'right' | 'center' | 'justify';
/** Colors are restricted to hex values only, for max compatibility */
export type Color = `#${string}` | DataType.NamedColor;
export type Direction = 'rtl' | 'ltr';

export type FontAttributes = Partial<
  Pick<
    CSSProperties,
    | 'fontFamily'
    | 'fontStyle'
    | 'fontWeight'
    | 'textDecoration'
    | 'textTransform'
    | 'lineHeight'
    | 'letterSpacing'
    | 'textAlign'
  >
> & {
  fontSize?: Spacing<'px'>;
  lineHeight?: Spacing<'' | 'px' | '%'>;
  color?: Color;
};

/** Largely used on *Layout* elements */
export type PaddingAttributes = {
  paddingBottom?: Spacing<'px'>;
  paddingTop?: Spacing<'px'>;
  paddingLeft?: Spacing<'px'>;
  paddingRight?: Spacing<'px'>;
  padding?:
    | Spacing<'px'>
    | `${Spacing<'px'>} ${Spacing<'px'>} ${Spacing<'px'>} ${Spacing<'px'>}
      `;
};

/** Largely used on *Typography* elements */
export type MarginAttributes = {
  marginBottom?: Spacing<'px'>;
  marginTop?: Spacing<'px'>;
  marginLeft?: Spacing<'px'>;
  marginRight?: Spacing<'px'>;
  margin?:
    | Spacing<'px'>
    | `${Spacing<'px'>} ${Spacing<'px'>} ${Spacing<'px'>} ${Spacing<'px'>}
				`;
};

export type BorderAttributes = {
  border?: Border;
  borderTop?: Border;
  borderBottom?: Border;
  borderLeft?: Border;
  borderRight?: Border;
  borderRadius?: Spacing<'px'>;
};

export type BackgroundAttributes = {
  background?: CSSProperties['background'];
  backgroundColor?: CSSProperties['backgroundColor'];
  backgroundPosition?: CSSProperties['backgroundPosition'];
  backgroundRepeat?: CSSProperties['backgroundRepeat'];
  backgroundSize?: CSSProperties['backgroundSize'];
};

export type AlignmentAttributes = {
  verticalAlign?: VerticalAlign;
  align?: Align;
};
