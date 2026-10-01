import { contours, type ContourMultiPolygon } from 'd3-contour'
import { createFractalNoise2D } from './noise'
import { toPolygonPath, type Point } from './svgPath'

interface TerrainOptions {
  width: number
  height: number
  cellSize: number
  seed: number
}

interface TopographicMapOptions extends TerrainOptions {
  levelCount: number
  waterLevel: number
  forestSeed: number
  forestLevel: number
}

export interface TopographicMap {
  contours: string[]
  water: string
  forest: string
}

const TOPOGRAPHY_OCTAVES = 3
const FOREST_OCTAVES = 2
const NOISE_SCALE_CELLS = 52
const FOREST_SCALE_CELLS = 30
const EDGE_PADDING_CELLS = 2

export function buildContourPaths(options: TerrainOptions & { levelCount: number }): string[] {
  const grid = buildGrid(options)
  const elevation = buildNoiseField(grid, options.seed, TOPOGRAPHY_OCTAVES, NOISE_SCALE_CELLS)
  return contours()
    .size([grid.columns, grid.rows])
    .thresholds(options.levelCount)(elevation)
    .map((contour) => toPath(contour, grid))
}

export function buildTopographicMap(options: TopographicMapOptions): TopographicMap {
  const grid = buildGrid(options)
  const elevation = buildNoiseField(grid, options.seed, TOPOGRAPHY_OCTAVES, NOISE_SCALE_CELLS)
  const vegetation = buildNoiseField(grid, options.forestSeed, FOREST_OCTAVES, FOREST_SCALE_CELLS)
  const depth = elevation.map((value) => -value)
  const woodland = vegetation.map((value, i) => (elevation[i] < options.waterLevel ? -1 : value))
  const contourGenerator = contours().size([grid.columns, grid.rows])

  return {
    contours: contourGenerator
      .thresholds(options.levelCount)(elevation)
      .map((contour) => toPath(contour, grid)),
    water: toPath(contourGenerator.contour(depth, -options.waterLevel), grid),
    forest: toPath(contourGenerator.contour(woodland, options.forestLevel), grid),
  }
}

interface Grid {
  columns: number
  rows: number
  cellSize: number
  offset: number
}

function buildGrid({ width, height, cellSize }: TerrainOptions): Grid {
  return {
    columns: Math.ceil(width / cellSize) + EDGE_PADDING_CELLS * 2,
    rows: Math.ceil(height / cellSize) + EDGE_PADDING_CELLS * 2,
    cellSize,
    offset: -EDGE_PADDING_CELLS * cellSize,
  }
}

function buildNoiseField({ columns, rows }: Grid, seed: number, octaves: number, scaleCells: number): number[] {
  const noise = createFractalNoise2D(seed, octaves)
  const field = new Array<number>(columns * rows)
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      field[row * columns + column] = noise(column / scaleCells, row / scaleCells)
    }
  }
  return field
}

function toPath(shape: ContourMultiPolygon, { cellSize, offset }: Grid): string {
  return shape.coordinates
    .flat()
    .map((ring) => toPolygonPath(ring.map(([x, y]): Point => [x * cellSize + offset, y * cellSize + offset])))
    .join('')
}
