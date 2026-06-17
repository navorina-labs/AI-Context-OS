#!/usr/bin/env node
/** Context OS CLI entry */
import { runCli } from "../src/cli.mjs";

runCli(process.argv).catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
