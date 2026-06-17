/** Validate manifest paths and core files exist */
import fs from "node:fs";
import path from "node:path";
import { contextOsDir, loadManifest, parseGlobalFlags } from "../lib/paths.mjs";

function checkFile(projectRoot, rel, errors) {
  const full = path.join(projectRoot, rel);
  if (!fs.existsSync(full)) {
    errors.push(`missing: ${rel}`);
    return false;
  }
  return true;
}

export async function cmdValidate(argv) {
  const { opts } = parseGlobalFlags(argv);
  const root = opts.root;
  const cos = contextOsDir(root);

  if (!fs.existsSync(cos)) {
    throw new Error(`No context-os/ at ${cos}. Run: context-os init`);
  }

  const manifest = loadManifest(root);
  const errors = [];
  const warnings = [];

  const coreMaps = [
    ["cores", manifest.cores],
    ["subcores", manifest.subcores],
  ];

  for (const [, map] of coreMaps) {
    if (!map) continue;
    for (const [id, rel] of Object.entries(map)) {
      if (!rel.endsWith(".md")) warnings.push(`${id}: path is not .md (${rel})`);
      checkFile(root, rel, errors);
      const text = fs.readFileSync(path.join(root, rel), "utf8");
      if (text.includes("{PROJECT_NAME}") || text.includes("{{PROJECT_NAME}}")) {
        warnings.push(`${id}: still has PROJECT_NAME placeholder`);
      }
      if (text.includes("{Why this core") || text.includes("{Technical and")) {
        warnings.push(`${id}: template sections not filled`);
      }
    }
  }

  for (const key of ["router", "routing_map", "maintenance"]) {
    const rel = manifest[key] ?? manifest[`${key}_path`];
    if (typeof rel === "string") checkFile(root, rel, errors);
  }

  checkFile(root, manifest.router ?? "context-os/router/question-router.md", errors);
  checkFile(root, manifest.routing_map ?? "context-os/router/routing-map.json", errors);

  const routingMap = JSON.parse(
    fs.readFileSync(path.join(root, manifest.routing_map ?? "context-os/router/routing-map.json"), "utf8")
  );
  if (!Array.isArray(routingMap.routes) || routingMap.routes.length === 0) {
    errors.push("routing-map.json: routes[] is empty");
  }

  console.log(`Validated ${root}`);
  console.log(`  cores: ${Object.keys(manifest.cores ?? {}).length}`);
  console.log(`  subcores: ${Object.keys(manifest.subcores ?? {}).length}`);
  console.log(`  routes: ${routingMap.routes?.length ?? 0}`);

  for (const w of warnings) console.log(`  warn: ${w}`);

  if (errors.length) {
    for (const e of errors) console.error(`  error: ${e}`);
    process.exit(1);
  }
  console.log("OK");
}
