/** Route a question to cores using keyword router */
import { parseGlobalFlags, loadManifest } from "../lib/paths.mjs";
import { loadRoutingMap, routeQuestion } from "../lib/router.mjs";

export async function cmdRoute(argv) {
  const { opts, rest } = parseGlobalFlags(argv);
  const question = rest.join(" ").trim();
  if (!question) {
    throw new Error('Usage: context-os route "<question>" [--root DIR]');
  }

  const map = loadRoutingMap(opts.root);
  const cores = routeQuestion(question, map);
  const manifest = loadManifest(opts.root);

  const out = {
    question,
    cores,
    router: "keyword",
    routing_map: map.version ?? "1.0.0",
  };

  if (process.stdout.isTTY) {
    console.log(`Cores: ${cores.join(", ")}`);
    for (const core of cores) {
      const rel =
        manifest.cores?.[core] ??
        manifest.subcores?.[core] ??
        `context-os/cores/${core}.md`;
      console.log(`  → ${rel}`);
    }
  } else {
    console.log(JSON.stringify(out, null, 2));
  }
}
