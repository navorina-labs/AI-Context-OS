/** CLI dispatcher: init, route, validate, eval */
import { printHelp } from "./lib/help.mjs";
import { cmdInit } from "./commands/init.mjs";
import { cmdRoute } from "./commands/route.mjs";
import { cmdValidate } from "./commands/validate.mjs";
import { cmdEval } from "./commands/eval.mjs";
import { cmdCursorRule } from "./commands/cursor-rule.mjs";
import { cmdStats } from "./commands/stats.mjs";

export async function runCli(argv) {
  const args = argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === "--help" || cmd === "-h") {
    printHelp();
    return;
  }

  switch (cmd) {
    case "init":
      await cmdInit(args.slice(1));
      break;
    case "route":
      await cmdRoute(args.slice(1));
      break;
    case "validate":
      await cmdValidate(args.slice(1));
      break;
    case "eval":
      await cmdEval(args.slice(1));
      break;
    case "cursor-rule":
      await cmdCursorRule(args.slice(1));
      break;
    case "stats":
      await cmdStats(args.slice(1));
      break;
    case "version":
    case "--version":
    case "-V":
      console.log("context-os 0.1.0");
      break;
    default:
      throw new Error(`Unknown command: ${cmd}. Run: context-os --help`);
  }
}
