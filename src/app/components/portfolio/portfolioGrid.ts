import type { CSSProperties } from "react";
import type { ProjectGrid } from "../../data/portfolio";

/** Desktop bento uses a 12-column track grid; spans in portfolio data are relative to this. */
export const PORTFOLIO_GRID_COLUMNS = 12;

export type GridPlacement = {
  colStart: number;
  colSpan: number;
  rowStart: number;
  rowSpan: number;
};

export function scaleGridSpan(
  gridColumns: number,
  span: ProjectGrid
): { colSpan: number; rowSpan: number } {
  const scale = gridColumns / PORTFOLIO_GRID_COLUMNS;
  let colSpan = Math.max(1, Math.round(span.columns * scale));
  let rowSpan = Math.max(2, Math.round(span.rows * scale));

  if (colSpan > gridColumns) colSpan = gridColumns;

  if (gridColumns === 1) {
    colSpan = 1;
    rowSpan = Math.max(rowSpan, 3);
  }

  return { colSpan, rowSpan };
}

function scaleGridStart(gridColumns: number, start: number): number {
  return Math.max(1, Math.round((start * gridColumns) / PORTFOLIO_GRID_COLUMNS));
}

const packCache = new Map<string, GridPlacement[]>();

function cellKey(row: number, col: number) {
  return `${row},${col}`;
}

function packProjectsInOrder(grids: ProjectGrid[], gridColumns: number): GridPlacement[] {
  const occupied = new Set<string>();

  const isFree = (row: number, col: number, colSpan: number, rowSpan: number) => {
    if (col + colSpan - 1 > gridColumns) return false;
    for (let dr = 0; dr < rowSpan; dr += 1) {
      for (let dc = 0; dc < colSpan; dc += 1) {
        if (occupied.has(cellKey(row + dr, col + dc))) return false;
      }
    }
    return true;
  };

  const mark = (row: number, col: number, colSpan: number, rowSpan: number) => {
    for (let dr = 0; dr < rowSpan; dr += 1) {
      for (let dc = 0; dc < colSpan; dc += 1) {
        occupied.add(cellKey(row + dr, col + dc));
      }
    }
  };

  const placements: GridPlacement[] = [];

  for (const grid of grids) {
    const { colSpan, rowSpan } = scaleGridSpan(gridColumns, grid);

    if (grid.column != null) {
      const colStart = scaleGridStart(gridColumns, grid.column);
      const rowStart = grid.row ?? 1;
      mark(rowStart, colStart, colSpan, rowSpan);
      placements.push({ colStart, colSpan, rowStart, rowSpan });
      continue;
    }

    let placed = false;
    for (let row = 1; row < 300 && !placed; row += 1) {
      for (let col = 1; col <= gridColumns - colSpan + 1; col += 1) {
        if (!isFree(row, col, colSpan, rowSpan)) continue;
        mark(row, col, colSpan, rowSpan);
        placements.push({ colStart: col, colSpan, rowStart: row, rowSpan });
        placed = true;
        break;
      }
    }
  }

  return placements;
}

export function getProjectPlacements(
  grids: ProjectGrid[],
  gridColumns: number
): GridPlacement[] {
  const cacheKey = `${gridColumns}:${grids.map((g) => `${g.columns}x${g.rows}@${g.column ?? ""},${g.row ?? ""}`).join("|")}`;
  const cached = packCache.get(cacheKey);
  if (cached) return cached;

  const packed = packProjectsInOrder(grids, gridColumns);
  packCache.set(cacheKey, packed);
  return packed;
}

export function placementStyle(placement: GridPlacement): CSSProperties {
  return {
    gridColumn: `${placement.colStart} / span ${placement.colSpan}`,
    gridRow: `${placement.rowStart} / span ${placement.rowSpan}`,
  };
}
