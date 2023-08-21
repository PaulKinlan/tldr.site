import { Board } from "@google-labs/breadboard";
import "@google-labs/llm-starter";

import { VercelRequest, VercelResponse } from "@vercel/node";
import path from "path";
export default async (req: VercelRequest, res: VercelResponse) => {
  const { q } = req.query;

  const currentBoard = await Board.load(path.join(process.cwd(), "graphs", "news-summary.json"));
  const outputs = [];
  const probe = new EventTarget();

  // We'll have a simple event handler for the probe:
  // just print things to console.
  const eventHandler = (e) => {
    console.log(e.type, e.detail);
  };

  probe.addEventListener("input", eventHandler);
  probe.addEventListener("skip", eventHandler);
  probe.addEventListener("node", eventHandler);
  probe.addEventListener("output", eventHandler);

  for await (const result of currentBoard.run(probe)) {
    if (result.seeksInputs) {
      result.inputs = { text: q };
    }
    else {
      outputs.push(result.outputs);
    }
  }

  return res.json({ outputs });
};