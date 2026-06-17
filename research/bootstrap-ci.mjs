#!/usr/bin/env node
/** Bootstrap 95% CI on paired accuracy deltas (B vs A, optional C vs A). */
import fs from "node:fs";
import path from "node:path";

const DEFAULT_ITERATIONS = 10_000;
const DEFAULT_SEED = 42;

function parseArgs(argv) {
  const opts = {
    iterations: DEFAULT_ITERATIONS,
    seed: DEFAULT_SEED,
    metric: "accuracy_delta_b_vs_a",
    pairedPath: null,
    outPath: null,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--iterations" && argv[i + 1]) opts.iterations = Number(argv[++i]);
    else if (a === "--seed" && argv[i + 1]) opts.seed = Number(argv[++i]);
    else if (a === "--metric" && argv[i + 1]) opts.metric = argv[++i];
    else if (a === "--out" && argv[i + 1]) opts.outPath = argv[++i];
    else if (!a.startsWith("-")) opts.pairedPath = a;
  }
  if (!opts.pairedPath) {
    console.error(
      "Usage: node bootstrap-ci.mjs <paired.csv> [--iterations N] [--metric accuracy_delta_b_vs_a] [--out summary.json]"
    );
    process.exit(1);
  }
  return opts;
}

/** Minimal RFC4180-ish CSV reader for eval paired exports. */
function readCsv(filePath) {
  const text = fs.readFileSync(filePath, "utf8").trim();
  const lines = text.split(/\r?\n/);
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const cols = line.split(",");
    const row = {};
    headers.forEach((h, i) => {
      row[h] = cols[i] ?? "";
    });
    return row;
  });
}

function num(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function mean(vals) {
  if (vals.length === 0) return null;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

/** Mulberry32 PRNG for reproducible bootstrap. */
function mulberry32(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function percentile(sorted, p) {
  if (sorted.length === 0) return null;
  const idx = (sorted.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
}

function bootstrapDeltas(rows, metric, iterations, seed) {
  const deltas = rows.map((r) => num(r[metric])).filter((v) => v !== null);
  if (deltas.length === 0) {
    console.error(`No numeric values for metric: ${metric}`);
    process.exit(1);
  }

  const rand = mulberry32(seed);
  const samples = [];
  const n = deltas.length;

  for (let i = 0; i < iterations; i++) {
    let sum = 0;
    for (let j = 0; j < n; j++) {
      const idx = Math.floor(rand() * n);
      sum += deltas[idx];
    }
    samples.push(sum / n);
  }

  samples.sort((a, b) => a - b);
  const observed = mean(deltas);
  const winRate = samples.filter((s) => s > 0).length / iterations;
  const strictlyWin = samples.filter((s) => s >= 0).length / iterations;

  return {
    metric,
    n_questions: n,
    iterations,
    seed,
    observed_mean_delta: observed,
    ci_95: {
      low: percentile(samples, 0.025),
      median: percentile(samples, 0.5),
      high: percentile(samples, 0.975),
    },
    bootstrap_win_rate_delta_gt_0: winRate,
    bootstrap_win_rate_delta_gte_0: strictlyWin,
    per_question_deltas: deltas,
    questions_b_beat_a: deltas.filter((d) => d > 0).length,
    questions_tie: deltas.filter((d) => d === 0).length,
    questions_b_lose: deltas.filter((d) => d < 0).length,
  };
}

function main() {
  const opts = parseArgs(process.argv);
  const pairedPath = path.resolve(opts.pairedPath);
  const rows = readCsv(pairedPath);

  const result = {
    paired_csv: pairedPath,
    generated_at: new Date().toISOString(),
    b_vs_a: bootstrapDeltas(rows, opts.metric, opts.iterations, opts.seed),
  };

  if (rows[0]?.accuracy_delta_c_vs_a !== undefined) {
    result.c_vs_a = bootstrapDeltas(
      rows,
      "accuracy_delta_c_vs_a",
      opts.iterations,
      opts.seed + 1
    );
  }

  const json = JSON.stringify(result, null, 2);
  console.log(json);

  const outPath =
    opts.outPath ?? path.join(path.dirname(pairedPath), "bootstrap-ci.json");
  fs.writeFileSync(outPath, json);
  console.error(`Wrote ${outPath}`);
}

main();
