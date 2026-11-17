/**
 * "Retrieval in an embedding space": the home hero scene. An honest
 * illustration with synthetic data: points are documents grouped by topic,
 * each linked to its nearest neighbours (the bottom layer of an HNSW-style
 * vector index). A query walks the graph greedily from a fixed entry point to
 * its region, then links to its K nearest documents (true 3D distance).
 *
 * Everything is deterministic (seeded PRNG) and computed at module load, so
 * the server render and the client animation share the same data. `frame()`
 * is pure: it turns a cycle time and a view into SVG path data.
 */

export type Vec3 = [number, number, number];

export interface View {
  /** Rotation about the vertical axis, radians. */
  yaw: number;
  /** Tilt about the horizontal axis, radians. */
  pitch: number;
}

// ---------------------------------------------------------------- data

const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const rnd = mulberry32(20260917);
const gauss = () => {
  let u = 0;
  let v = 0;
  while (!u) u = rnd();
  while (!v) v = rnd();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

export const CLUSTERS = 8;
const PER = 22;
const NOISE = 16;
const R_TOPIC = 58;
export const SIGMA = 6.5;
export const K = 6;
const MAX_HOPS = 12;

/** Topic centres on a Fibonacci sphere, stretched to fill a 6:5 frame. */
export const centers: Vec3[] = Array.from({ length: CLUSTERS }, (_, c) => {
  const y = 1 - ((c + 0.5) / CLUSTERS) * 2;
  const r = Math.sqrt(1 - y * y);
  const th = c * 2.39996;
  return [Math.cos(th) * r * R_TOPIC * 1.15, y * R_TOPIC * 0.75, Math.sin(th) * r * R_TOPIC];
});

/** Documents: PER per topic plus a few uniform background points. */
export const points: Vec3[] = [];
for (const c of centers) {
  for (let i = 0; i < PER; i++) {
    points.push([c[0] + gauss() * SIGMA * 1.2, c[1] + gauss() * SIGMA, c[2] + gauss() * SIGMA]);
  }
}
for (let i = 0; i < NOISE; i++) {
  const u = rnd() * 2 - 1;
  const th = rnd() * Math.PI * 2;
  const rr = R_TOPIC * 1.27 * Math.cbrt(rnd());
  const s = Math.sqrt(1 - u * u);
  points.push([Math.cos(th) * s * rr * 1.15, u * rr * 0.75, Math.sin(th) * s * rr]);
}

const d2 = (a: Vec3, b: Vec3) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;

const nearest = (q: Vec3, k: number, skip = -1): number[] =>
  points
    .map((p, i) => [i, d2(p, q)] as const)
    .filter(([i]) => i !== skip)
    .sort((a, b) => a[1] - b[1])
    .slice(0, k)
    .map(([i]) => i);

/**
 * Proximity graph: every point linked to its 3 nearest (deduplicated), plus
 * the few minimum-spanning-tree edges needed to connect the whole graph, so a
 * search can reach every topic (a vector index graph is navigable too).
 */
export const links: [number, number][] = (() => {
  const seen = new Set<string>();
  const out: [number, number][] = [];
  const add = (i: number, j: number) => {
    const a = Math.min(i, j);
    const b = Math.max(i, j);
    const key = `${a}-${b}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push([a, b]);
    }
  };
  points.forEach((p, i) => nearest(p, 3, i).forEach((j) => add(i, j)));
  // Prim's minimum spanning tree over all points.
  const n = points.length;
  const inTree = new Array<boolean>(n).fill(false);
  const best = new Array<number>(n).fill(Infinity);
  const from = new Array<number>(n).fill(-1);
  best[0] = 0;
  for (let it = 0; it < n; it++) {
    let u = -1;
    for (let i = 0; i < n; i++) if (!inTree[i] && (u < 0 || best[i] < best[u])) u = i;
    inTree[u] = true;
    if (from[u] >= 0) add(u, from[u]);
    for (let v = 0; v < n; v++) {
      if (inTree[v]) continue;
      const d = d2(points[u], points[v]);
      if (d < best[v]) {
        best[v] = d;
        from[v] = u;
      }
    }
  }
  return out;
})();

const adjacency: number[][] = points.map(() => []);
for (const [a, b] of links) {
  adjacency[a].push(b);
  adjacency[b].push(a);
}

/** Entry point of every search: the document nearest the origin. */
const ENTRY = nearest([0, 0, 0], 1)[0];

/**
 * Best-first search on the graph from the entry point (as in one layer of an
 * HNSW index, candidate list of size EF). Returns the graph path from the
 * entry to the closest document found, which is what the scene draws.
 */
const EF = 16;
const search = (q: Vec3): number[] => {
  const dq = (i: number) => d2(points[i], q);
  const parent = new Map<number, number>([[ENTRY, -1]]);
  const candidates = [ENTRY];
  let results = [ENTRY];
  while (candidates.length) {
    candidates.sort((a, b) => dq(a) - dq(b));
    const c = candidates.shift()!;
    if (results.length >= EF && dq(c) > dq(results[results.length - 1])) break;
    for (const nb of adjacency[c]) {
      if (parent.has(nb)) continue;
      parent.set(nb, c);
      candidates.push(nb);
      results.push(nb);
      results.sort((a, b) => dq(a) - dq(b));
      results = results.slice(0, EF);
    }
  }
  const path: number[] = [];
  for (let node = results[0]; node !== -1; node = parent.get(node)!) path.unshift(node);
  return path.slice(-MAX_HOPS);
};

// ---------------------------------------------------------------- projection

export const W = 480;
export const H = 400;
const SCALE = 2.86;
const CAMERA = 560;
/** Vertical centre, a little above the middle: near points project lower. */
const CY = 192;

export const restView: View = { yaw: -0.34, pitch: 0.44 };

/** Project a model point to SVG coordinates; returns [x, y, depth scale]. */
export const project = (p: Vec3, v: View): [number, number, number] => {
  const cy = Math.cos(v.yaw);
  const sy = Math.sin(v.yaw);
  const x1 = p[0] * cy - p[2] * sy;
  const z1 = p[0] * sy + p[2] * cy;
  const cp = Math.cos(v.pitch);
  const sp = Math.sin(v.pitch);
  const y2 = p[1] * cp - z1 * sp;
  const z2 = p[1] * sp + z1 * cp;
  const k = CAMERA / (CAMERA - z2 * SCALE);
  return [W / 2 + x1 * SCALE * k, CY - y2 * SCALE * k, k];
};

// ---------------------------------------------------------------- queries

/**
 * One query per topic. Each sits between its topic and another one (like a
 * question that mixes two subjects), so the k-NN fan is long enough to read.
 * The partner topic and the mix are chosen once, here, so that at the rest
 * view the six hits do not overlap and the fan stays inside the frame. The
 * clearest, most central query goes first: it is the one in the static frame.
 */
const lerp3 = (a: Vec3, b: Vec3, m: number): Vec3 => [
  a[0] * m + b[0] * (1 - m),
  a[1] * m + b[1] * (1 - m),
  a[2] * m + b[2] * (1 - m),
];

const placeQuery = (i: number) => {
  let best: { q: Vec3; nn: number[]; score: number; central: number } | null = null;
  for (let off = 1; off < CLUSTERS; off++) {
    for (const mix of [0.74, 0.68, 0.62]) {
      const q = lerp3(centers[i], centers[(i + off) % CLUSTERS], mix);
      const nn = nearest(q, K);
      const [qx, qy] = project(q, restView);
      const hits = nn.map((j) => project(points[j], restView));
      const lens = hits.map((h) => Math.hypot(h[0] - qx, h[1] - qy));
      if (Math.min(...lens) < 24 || Math.max(...lens) > 110) continue;
      if (qx < 60 || qx > W - 60 || qy < 50 || qy > H - 50) continue;
      let sep = Infinity;
      for (let a = 0; a < K; a++) {
        for (let b = a + 1; b < K; b++) sep = Math.min(sep, Math.hypot(hits[a][0] - hits[b][0], hits[a][1] - hits[b][1]));
      }
      const central = Math.hypot(qx - W / 2, qy - H / 2);
      if (!best || sep > best.score) best = { q, nn, score: sep, central };
    }
  }
  if (!best) {
    const q = lerp3(centers[i], centers[(i + 3) % CLUSTERS], 0.72);
    best = { q, nn: nearest(q, K), score: 0, central: Infinity };
  }
  return best;
};

export const plans = (() => {
  const placed = centers.map((_, i) => placeQuery(i));
  const lead = placed.reduce((b, p, i) => (p.score - p.central * 0.08 > placed[b].score - placed[b].central * 0.08 ? i : b), 0);
  return placed
    .map((_, n) => placed[(lead + n) % CLUSTERS])
    .map(({ q, nn }) => ({ q, path: search(q), nn }));
})();

// ---------------------------------------------------------------- animation

/** One query cycle, ms. Queries rotate through the 8 topics. */
export const CYCLE = 5200;
const HOP = 180;
const WALK_START = 300;
const EDGE = 360;
const STAGGER = 70;
const FADE_OUT = 4300;
const FADE_LEN = 600;

/** Depth buckets for the document layers. */
const FAR = 0.94;
const NEAR = 1.06;

const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
/**
 * Path data is written in tenths of a viewBox unit (the SVG uses a 10x
 * viewBox), so every coordinate is an integer: much cheaper to format than
 * decimals, which matters at 60 frames per second.
 */
export const U = 10;
const f = (n: number) => '' + Math.round(n * U);

export interface Frame {
  halos: string;
  linksFar: string;
  linksNear: string;
  far: string;
  mid: string;
  near: string;
  walk: string;
  walkOpacity: number;
  fan: string;
  hits: string;
  /** Opacity of the whole retrieval layer (fades out at the end of a cycle). */
  out: number;
  /** Query centre (viewBox units, not scaled by U), scale (depth x appear) and halo progress 0..1. */
  qx: number;
  qy: number;
  qScale: number;
  halo: number;
}

/**
 * The scene at cycle time `t` (ms; negative = before the first query) seen
 * from `view`. Pure, so the server can render the same frame as the client.
 */
export const frame = (t: number, view: View): Frame => {
  const P = points.map((p) => project(p, view));

  // Cluster halos: one circle per topic, radius 2.4 sigma at its depth.
  let halos = '';
  for (const c of centers) {
    const [x, y, k] = project(c, view);
    const r = 2.4 * SIGMA * SCALE * k;
    halos += `M${f(x - r)} ${f(y)}a${f(r)} ${f(r)} 0 1 0 ${f(2 * r)} 0a${f(r)} ${f(r)} 0 1 0 ${f(-2 * r)} 0`;
  }

  let linksFar = '';
  let linksNear = '';
  for (const [a, b] of links) {
    const seg = `M${f(P[a][0])} ${f(P[a][1])}L${f(P[b][0])} ${f(P[b][1])}`;
    if ((P[a][2] + P[b][2]) / 2 < 1) linksFar += seg;
    else linksNear += seg;
  }

  let far = '';
  let mid = '';
  let near = '';
  for (const [x, y, k] of P) {
    const dot = `M${f(x)} ${f(y)}h0`;
    if (k < FAR) far += dot;
    else if (k < NEAR) mid += dot;
    else near += dot;
  }

  const base = { halos, linksFar, linksNear, far, mid, near };
  if (t < 0) {
    return { ...base, walk: '', walkOpacity: 0, fan: '', hits: '', out: 0, qx: W / 2, qy: H / 2, qScale: 0, halo: 1 };
  }

  const plan = plans[Math.floor(t / CYCLE) % plans.length];
  const local = t % CYCLE;
  const [qx, qy, qk] = project(plan.q, view);
  const appear = ease(local / 450);
  const out = 1 - ease((local - FADE_OUT) / FADE_LEN);

  // 1) Greedy walk: hops appear one by one from the entry point.
  let walk = '';
  const hops = Math.min(plan.path.length, Math.floor((local - WALK_START) / HOP) + 1);
  if (local > WALK_START && hops > 0) {
    for (let i = 0; i < hops; i++) {
      const p = P[plan.path[i]];
      walk += `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`;
    }
    walk += `L${f(qx)} ${f(qy)}`;
  }
  const walkEnd = WALK_START + plan.path.length * HOP;
  const walkOpacity = Math.max(0, 1 - ease((local - walkEnd - 200) / 500));

  // 2) k-NN fan from the query; each hit lights when its edge arrives.
  const fanStart = walkEnd + 100;
  let fan = '';
  let hits = '';
  plan.nn.forEach((j, r) => {
    const p = P[j];
    const lit = ease((local - fanStart - r * STAGGER) / EDGE);
    if (lit > 0) fan += `M${f(qx)} ${f(qy)}L${f(qx + (p[0] - qx) * lit)} ${f(qy + (p[1] - qy) * lit)}`;
    if (lit >= 1) hits += `M${f(p[0])} ${f(p[1])}h0`;
  });

  return {
    ...base,
    walk,
    walkOpacity,
    fan,
    hits,
    out,
    qx,
    qy,
    qScale: qk * appear,
    halo: Math.min(1, local / 1000),
  };
};

/** Frame shown without JavaScript and with reduced motion: query 0 with its fan. */
export const STATIC_T = 3600;
