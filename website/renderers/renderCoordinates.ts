import type { RenderCellProps } from '../../src';

export function renderCoordinates(props: RenderCellProps<number, number>) {
  return `${props.column.key}×${props.row}`;
}
