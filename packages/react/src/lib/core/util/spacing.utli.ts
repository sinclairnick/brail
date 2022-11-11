import {
  Border,
  BorderAttributes,
  Spacing,
  SpacingAttributes,
} from './util.types';

export class SpacingUtil {
  static getBorderSize = (border?: Border) => {
    const result = /(.*)px/.exec(border ?? '');
    return Number.parseInt(result?.[0] ?? '0');
  };

  static getPaddingSize = (padding?: Spacing<'px'>) => {
    const result = /(.*)px?/.exec(padding?.toString() ?? '0');
    return Number.parseInt(result?.[0] ?? '0');
  };

  static getTotalBorderWidth(
    borders: Pick<BorderAttributes, 'border' | 'borderLeft' | 'borderRight'>
  ) {
    const { border, borderLeft, borderRight } = borders;

    const baseSize = SpacingUtil.getBorderSize(border);
    const leftSize = borderLeft
      ? SpacingUtil.getBorderSize(borderLeft)
      : baseSize;
    const rightSize = borderRight
      ? SpacingUtil.getBorderSize(borderRight)
      : baseSize;

    return leftSize + rightSize;
  }

  static getTotatlPaddingWidth(
    borders: Pick<SpacingAttributes, 'padding' | 'paddingRight' | 'paddingLeft'>
  ) {
    const { padding, paddingLeft, paddingRight } = borders;

    const leftBaseSize = SpacingUtil.getPaddingSize(
      Array.isArray(padding) ? padding[3] : padding
    );
    const rightBaseSize = SpacingUtil.getPaddingSize(
      Array.isArray(padding) ? padding[1] : padding
    );
    const leftSize = paddingLeft
      ? SpacingUtil.getPaddingSize(paddingLeft)
      : leftBaseSize;
    const rightSize = paddingRight
      ? SpacingUtil.getPaddingSize(paddingRight)
      : rightBaseSize;

    return leftSize + rightSize;
  }

  static getBoxWidth = (
    fullWidth: number,
    spacing: BorderAttributes & SpacingAttributes
  ) => {
    const paddingSize = SpacingUtil.getTotatlPaddingWidth(spacing);
    const borderSize = SpacingUtil.getTotalBorderWidth(spacing);
    const totalOffset = paddingSize + borderSize;

    return Math.max(0, fullWidth - totalOffset);
  };
}
