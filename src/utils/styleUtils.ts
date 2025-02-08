import type { CSSProperties } from 'react';
import clsx from 'clsx';

import type { CalculatedColumn, CalculatedColumnOrColumnGroup } from '../types';
import { cellClassname, cellFrozenClassname } from '../style/cell';

export function getRowStyle(rowIdx: number): CSSProperties {
  return { '--rdg-grid-row-start': rowIdx } as unknown as CSSProperties;
}

export function getHeaderCellStyle<R, SR>(
  column: CalculatedColumnOrColumnGroup<R, SR>,
  rowIdx: number,
  rowSpan: number,
  headerRowHeight: number | number[],
  depth: number
): React.CSSProperties {
  const gridRowEnd = rowIdx + 1;
  let paddingBlockStart = '';
  const p = column.parent;
  if (Array.isArray(headerRowHeight)) {
    const len = depth - 1;
    const level = column.level + len;
    const plevel = p ? p.level + len : -1;
    const k = headerRowHeight.slice(plevel + 1, level).reduce((sum, cur) => sum + cur, 0);
    paddingBlockStart = `${k}px`;
  } else {
    paddingBlockStart = `calc(${rowSpan - 1} * var(--rdg-header-row-height))`;
  }

  if (column.parent === undefined) {
    return {
      insetBlockStart: 0,
      gridRowStart: 1,
      gridRowEnd,
      paddingBlockStart
    };
  }

  return {
    insetBlockStart: Array.isArray(headerRowHeight)
      ? headerRowHeight.slice(0, rowIdx - rowSpan).reduce((sum, cur) => sum + cur, 0)
      : `calc(${rowIdx - rowSpan} * var(--rdg-header-row-height))`,
    gridRowStart: gridRowEnd - rowSpan,
    gridRowEnd,
    paddingBlockStart
  };
}

export function getCellStyle<R, SR>(
  column: CalculatedColumn<R, SR>,
  colSpan = 1
): React.CSSProperties {
  const index = column.idx + 1;
  return {
    gridColumnStart: index,
    gridColumnEnd: index + colSpan,
    insetInlineStart: column.frozen ? `var(--rdg-frozen-left-${column.idx})` : undefined
  };
}

export function getCellClassname<R, SR>(
  column: CalculatedColumn<R, SR>,
  ...extraClasses: Parameters<typeof clsx>
): string {
  return clsx(
    cellClassname,
    {
      [cellFrozenClassname]: column.frozen
    },
    ...extraClasses
  );
}
