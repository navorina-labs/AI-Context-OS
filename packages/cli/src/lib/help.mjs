/** Usage and examples for agent-friendly CLI */
export function printHelp() {
  console.log(`context-os — domain-oriented context cores for AI agents

Usage:
  context-os init [options]          Scaffold context-os/ in a project
  context-os route <question>        Keyword-route a question to core(s)
  context-os validate [options]      Check manifest + core files
  context-os eval route [options]    Routing F1 on questions JSON (no LLM)

Init options:
  --name <project>     Project name (default: directory basename)
  --target <dir>       Where to create context-os/ (default: cwd)
  --profile minimal|saas   minimal = 4 cores; saas = 4 cores + 4 subcores
  --cursor-rule        Also write .cursor/rules/context-os.mdc
  --force              Overwrite existing context-os/
  --dry-run            Print planned files only

Global options:
  --root <dir>         Project root containing context-os/ (default: cwd)

Examples:
  npx context-os init --name myapp --profile saas
  context-os route "Why did MRR drop?" --root .
  context-os validate
  context-os eval route --questions context-os/eval/questions.json

Docs: https://github.com/Alex0nder/AI-Context-OS
`);
}
