/** Eval subcommands — routing F1 without LLM (full A/B/C eval stays in Oiloop harness) */
import fs from "node:fs";
import path from "node:path";
import { loadRoutingMap, routeQuestion, routingScores } from "../lib/router.mjs";
import { parseGlobalFlags } from "../lib/paths.mjs";

function parseEvalArgs(argv) {
  const sub = argv[0];
  const opts = { questions: "context-os/eval/questions.json" };
  const rest = [];
  for (let i = 1; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--questions" && argv[i + 1]) opts.questions = argv[++i];
    else rest.push(a);
  }
  return { sub, opts, rest };
}

export async function cmdEval(argv) {
  const { opts: global, rest: afterRoot } = parseGlobalFlags(argv);
  const { sub, opts } = parseEvalArgs(afterRoot);

  if (sub === "route" || sub === "routing") {
    await evalRouting(global.root, opts.questions);
    return;
  }

  console.log(`context-os eval — lightweight checks (no LLM)

Subcommands:
  route    Routing F1 on questions JSON

  context-os eval route --questions context-os/eval/questions.json

Full A/B/C accuracy eval: see experiments/*/ and Oiloop context-os/eval/
`);
}

async function evalRouting(projectRoot, questionsRel) {
  const qPath = path.isAbsolute(questionsRel)
    ? questionsRel
    : path.join(projectRoot, questionsRel);

  if (!fs.existsSync(qPath)) {
    throw new Error(
      `Questions file not found: ${qPath}\nCopy context-os/eval/questions.stub.json → questions.json and add expected_cores.`
    );
  }

  const questions = JSON.parse(fs.readFileSync(qPath, "utf8"));
  const map = loadRoutingMap(projectRoot);

  let f1Sum = 0;
  let n = 0;
  const failures = [];

  for (const q of questions) {
    const expected = q.expected_cores ?? [];
    const actual = routeQuestion(q.question, map);
    const scores = routingScores(expected, actual);
    f1Sum += scores.f1;
    n++;
    if (scores.f1 < 1) {
      failures.push({
        id: q.id ?? q.question_id,
        question: q.question,
        expected,
        actual,
        f1: scores.f1,
      });
    }
  }

  const meanF1 = n ? f1Sum / n : 0;
  console.log(`Routing eval: ${n} questions`);
  console.log(`  mean F1: ${meanF1.toFixed(3)}`);
  if (failures.length) {
    console.log(`  failures: ${failures.length}`);
    for (const f of failures.slice(0, 10)) {
      console.log(`    ${f.id}: expected [${f.expected}] got [${f.actual}] (F1=${f.f1.toFixed(2)})`);
    }
    if (failures.length > 10) console.log(`    ... +${failures.length - 10} more`);
    process.exit(1);
  }
  console.log("OK — all routes match expected_cores");
}
