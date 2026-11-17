/**
 * A schematic 3D model of the Circle of Willis as a graph, and a tiny
 * perspective projector. Shared by the server render (static SVG) and the
 * client script (rotation), so the figure is complete without JavaScript.
 *
 * Axes: x = patient left (-) / right (+), y = posterior (-) / anterior (+),
 * z = inferior (-) / superior (+). Units are arbitrary (roughly millimetres).
 * Anatomy is schematic: segment names follow the TopCoW labelling.
 */

export type Vec3 = [number, number, number];

export interface Edge {
  id: string;
  /** 2 or 3 points; 3 points are drawn as a quadratic curve. */
  pts: Vec3[];
  /** Relative calibre. */
  w: number;
  /** Draw-in wave: 0 inflow, 1 ring, 2 outflow. */
  wave: 0 | 1 | 2;
  /** Communicating arteries: the most variable segments, drawn dashed. */
  variable?: boolean;
}

const side = (sign: 1 | -1, suffix: string): Edge[] => {
  const s = (p: Vec3): Vec3 => [p[0] * sign, p[1], p[2]];
  return [
    { id: `ica-${suffix}`, pts: [s([28, 2, -46]), s([33, 9, -12]), s([36, 20, 0])], w: 6, wave: 0 },
    { id: `p1-${suffix}`, pts: [[0, -24, -2], s([22, -20, 0])], w: 3.6, wave: 1 },
    { id: `pcom-${suffix}`, pts: [s([22, -20, 0]), s([34, 4, -6])], w: 1.9, wave: 1, variable: true },
    { id: `mca-${suffix}`, pts: [s([36, 20, 0]), s([60, 26, 4]), s([84, 16, 16])], w: 4.4, wave: 1 },
    { id: `a1-${suffix}`, pts: [s([36, 20, 0]), s([14, 50, 0])], w: 3.2, wave: 1 },
    { id: `p2-${suffix}`, pts: [s([22, -20, 0]), s([42, -36, 6]), s([50, -64, 16])], w: 3.6, wave: 2 },
    { id: `a2-${suffix}`, pts: [s([14, 50, 0]), s([9, 72, 10]), s([7, 86, 34])], w: 2.9, wave: 2 },
  ];
};

export const edges: Edge[] = [
  { id: 'ba', pts: [[0, -32, -52], [0, -24, -2]], w: 6.6, wave: 0 },
  ...side(-1, 'l'),
  ...side(1, 'r'),
  { id: 'acom', pts: [[-14, 50, 0], [14, 50, 0]], w: 1.9, wave: 2, variable: true },
];

/** Bifurcations (graph nodes). */
export const nodes: Vec3[] = [
  [0, -24, -2],
  [-22, -20, 0],
  [22, -20, 0],
  [-34, 4, -6],
  [34, 4, -6],
  [-36, 20, 0],
  [36, 20, 0],
  [-14, 50, 0],
  [14, 50, 0],
];

/** Labels anchored on a point of a vessel, offset in screen space. */
export const labels: { text: string; at: Vec3; dx: number; dy: number; anchor: 'start' | 'end' | 'middle' }[] = [
  { text: 'ACA', at: [-8, 78, 16], dx: -40, dy: -4, anchor: 'end' },
  { text: 'Acom', at: [0, 50, 0], dx: 0, dy: -26, anchor: 'middle' },
  { text: 'MCA', at: [-66, 24, 7], dx: -10, dy: -30, anchor: 'end' },
  { text: 'ICA', at: [-31, 6, -26], dx: -40, dy: 0, anchor: 'end' },
  { text: 'Pcom', at: [28, -8, -3], dx: 40, dy: 0, anchor: 'start' },
  { text: 'PCA', at: [44, -44, 9], dx: 36, dy: 4, anchor: 'start' },
  { text: 'BA', at: [0, -30, -36], dx: 34, dy: 0, anchor: 'start' },
];

export interface View {
  /** Rotation about the vertical axis, radians. */
  yaw: number;
  /** Camera elevation above the axial plane, radians. */
  pitch: number;
}

export const SIZE = 400;
const SCALE = 2.3;
const CAMERA = 520;
const CENTER: Vec3 = [0, 18, -6];

/** Project a model point to SVG coordinates; returns [x, y, depth scale]. */
export const project = (p: Vec3, v: View): [number, number, number] => {
  const x0 = p[0] - CENTER[0];
  const y0 = p[1] - CENTER[1];
  const z0 = p[2] - CENTER[2];
  // yaw around z
  const cy = Math.cos(v.yaw);
  const sy = Math.sin(v.yaw);
  const x1 = x0 * cy - y0 * sy;
  const y1 = x0 * sy + y0 * cy;
  // pitch: tilt so anterior (+y) goes up the screen and +z comes toward the viewer
  const cp = Math.cos(v.pitch);
  const sp = Math.sin(v.pitch);
  const up = y1 * sp + z0 * cp;
  const depth = -y1 * cp + z0 * sp; // toward camera is positive
  const k = CAMERA / (CAMERA - depth * SCALE);
  return [SIZE / 2 + x1 * SCALE * k, SIZE / 2 - up * SCALE * k, k];
};

const r = (n: number) => Math.round(n * 10) / 10;

export const edgePath = (e: Edge, v: View): { d: string; k: number } => {
  const pr = e.pts.map((p) => project(p, v));
  const k = pr.reduce((a, p) => a + p[2], 0) / pr.length;
  if (pr.length === 2) {
    return { d: `M${r(pr[0][0])},${r(pr[0][1])} L${r(pr[1][0])},${r(pr[1][1])}`, k };
  }
  return {
    d: `M${r(pr[0][0])},${r(pr[0][1])} Q${r(pr[1][0])},${r(pr[1][1])} ${r(pr[2][0])},${r(pr[2][1])}`,
    k,
  };
};

export const restView: View = { yaw: 0, pitch: 0.95 };
