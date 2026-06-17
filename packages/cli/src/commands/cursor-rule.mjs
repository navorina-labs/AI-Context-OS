/** Install .cursor/rules/context-os.mdc without scaffolding cores */
import fs from "node:fs";
import path from "node:path";

function parseArgs(argv) {
  const opts = {
    target: process.cwd(),
    force: false,
    variant: "generic",
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--target" && argv[i + 1]) opts.target = path.resolve(argv[++i]);
    else if (a === "--variant" && argv[i + 1]) opts.variant = argv[++i];
    else if (a === "--force") opts.force = true;
    else if (a === "--help" || a === "-h") {
      console.log(`context-os cursor-rule — write .cursor/rules/context-os.mdc

Options:
  --target <dir>     Project root (default: cwd)
  --variant generic|oiloop   Rule template (default: generic)
  --force            Overwrite existing rule`);
      process.exit(0);
    }
  }
  return opts;
}

const RULES = {
  generic: `---
description: Route decision-scoped questions through Context OS cores
alwaysApply: true
---

Before answering project-specific decision questions:

1. Read \`context-os/manifest.json\` and \`context-os/router/question-router.md\`
2. Route to 1 primary + 0–2 secondary cores — do not load the full repository
3. Open only Sources listed in the selected core(s)
4. After code changes affecting entities in a core, update that core per \`context-os/MAINTENANCE.md\`
`,
  oiloop: `---
description: Route decision-scoped questions through Context OS cores (Oiloop)
alwaysApply: true
---

Before loading broad repository context:

1. Match \`context-os/router/routing-map.json\` — open 1–2 routed cores from \`context-os/cores/\`
2. Follow **Key Entities** and **Invariants**; respect **Exclusions** (workspace-core OL06 scope)
3. Runtime path: ContextRouter → ContextCoreLoader → SystemPromptBuilder (production default: keyword B)

Avoid citing symbols outside routed core scope. Keep \`context-os/cores/\` in sync with \`Resources/cores/\`.
`,
};

export async function cmdCursorRule(argv) {
  const opts = parseArgs(argv);
  const rule = RULES[opts.variant];
  if (!rule) {
    throw new Error(`Unknown variant: ${opts.variant}. Use generic or oiloop.`);
  }

  const ruleDir = path.join(opts.target, ".cursor", "rules");
  const rulePath = path.join(ruleDir, "context-os.mdc");

  if (fs.existsSync(rulePath) && !opts.force) {
    throw new Error(`${rulePath} exists. Use --force to overwrite.`);
  }

  fs.mkdirSync(ruleDir, { recursive: true });
  fs.writeFileSync(rulePath, rule);
  console.log(`Wrote ${path.relative(opts.target, rulePath)} (${opts.variant})`);
}
