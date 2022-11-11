import { OptionalParentConsumerProps } from '../parent-provider/parent-provider.types';
import {
  BorderAttributes,
  PaddingAttributes,
  BackgroundAttributes,
  Spacing,
  VerticalAlign,
  Align,
} from '../util/util.types';

export type ColumnProps = BorderAttributes &
  PaddingAttributes &
  BackgroundAttributes & {
    width?: Spacing<'px' | '%'>;
    minWidth?: Spacing<'px' | '%'>;
    maxWidth?: Spacing<'px' | '%'>;
    verticalAlign?: VerticalAlign;
    align?: Align;
  } & Pick<OptionalParentConsumerProps, 'children'>;
