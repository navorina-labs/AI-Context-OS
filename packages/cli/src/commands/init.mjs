/** Scaffold context-os/ from bundled templates */
import fs from "node:fs";
import path from "node:path";
import { contextOsDir, templateProfileDir } from "../lib/paths.mjs";

function parseInitArgs(argv) {
  const opts = {
    name: null,
    target: process.cwd(),
    profile: "minimal",
    cursorRule: false,
    force: false,
    dryRun: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--name" && argv[i + 1]) opts.name = argv[++i];
    else if (a === "--target" && argv[i + 1]) opts.target = path.resolve(argv[++i]);
    else if (a === "--profile" && argv[i + 1]) opts.profile = argv[++i];
    else if (a === "--cursor-rule") opts.cursorRule = true;
    else if (a === "--force") opts.force = true;
    else if (a === "--dry-run") opts.dryRun = true;
    else if (a === "--help" || a === "-h") {
      console.log(`context-os init — scaffold context-os/

Options:
  --name <project>       Project display name
  --target <dir>         Parent directory (default: cwd)
  --profile minimal|saas minimal = 4 cores; saas adds revenue/paywall/billing/onboarding subcores
  --cursor-rule          Write .cursor/rules/context-os.mdc
  --force                Overwrite existing context-os/
  --dry-run              List files only`);
      process.exit(0);
    }
  }
  if (!opts.name) {
    opts.name = path.basename(opts.target) || "my-project";
  }
  if (opts.profile !== "minimal" && opts.profile !== "saas") {
    throw new Error(`--profile must be minimal or saas, got: ${opts.profile}`);
  }
  return opts;
}

function substitute(content, vars) {
  let out = content;
  for (const [key, value] of Object.entries(vars)) {
    out = out.replaceAll(`{{${key}}}`, value);
    out = out.replaceAll(`{${key}}`, value);
  }
  return out;
}

function walkFiles(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walkFiles(full));
    else out.push(full);
  }
  return out;
}

function renameCoreFile(relPath) {
  return relPath.replace(/\.template\.md$/, ".md");
}

export async function cmdInit(argv) {
  const opts = parseInitArgs(argv);
  const destRoot = contextOsDir(opts.target);
  const srcRoot = templateProfileDir(opts.profile);

  if (fs.existsSync(destRoot) && !opts.force) {
    throw new Error(
      `${destRoot} already exists. Use --force to overwrite or pick another --target.`
    );
  }

  const vars = {
    PROJECT_NAME: opts.name,
    PROJECT_SLUG: opts.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    DATE: new Date().toISOString().slice(0, 10),
    PROFILE: opts.profile,
  };

  const planned = [];

  for (const srcFile of walkFiles(srcRoot)) {
    const rel = path.relative(srcRoot, srcFile);
    if (rel.endsWith(".saas.stub.json")) continue;
    const destRel = renameCoreFile(rel);
    const destFile = path.join(destRoot, destRel);
    planned.push({ srcFile, destFile, destRel });
  }

  if (opts.dryRun) {
    console.log(`Would create ${planned.length} files under ${destRoot}:`);
    for (const p of planned) console.log(`  ${p.destRel}`);
    return;
  }

  if (opts.force && fs.existsSync(destRoot)) {
    fs.rmSync(destRoot, { recursive: true, force: true });
  }

  for (const { srcFile, destFile } of planned) {
    fs.mkdirSync(path.dirname(destFile), { recursive: true });
    const raw = fs.readFileSync(srcFile, "utf8");
    fs.writeFileSync(destFile, substitute(raw, vars));
  }

  if (opts.cursorRule) {
    const ruleDir = path.join(opts.target, ".cursor", "rules");
    fs.mkdirSync(ruleDir, { recursive: true });
    const rulePath = path.join(ruleDir, "context-os.mdc");
    const rule = `---
description: Route decision-scoped questions through Context OS cores
globs:
alwaysApply: true
---

Before answering project-specific decision questions:

1. Read \`context-os/manifest.json\` and \`context-os/router/question-router.md\`
2. Route to 1 primary + 0–2 secondary cores — do not load the full repository
3. Open only Sources listed in the selected core(s)
4. After code changes affecting entities in a core, update that core per \`context-os/MAINTENANCE.md\`
`;
    fs.writeFileSync(rulePath, rule);
    console.log(`Wrote ${path.relative(opts.target, rulePath)}`);
  }

  console.log(`Created context-os/ for "${opts.name}" (${opts.profile}) at ${destRoot}`);
  console.log(`Next:`);
  console.log(`  1. Fill cores in context-os/cores/ (and subcores/ if saas)`);
  console.log(`  2. Customize context-os/router/routing-map.json`);
  console.log(`  3. context-os validate`);
  console.log(`  4. context-os route "your question here"`);
}
