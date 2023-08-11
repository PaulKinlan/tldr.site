import { Board } from "@google-labs/breadboard";

import { VercelRequest, VercelResponse } from "@vercel/node";
import path from "path";


export default async (req: VercelRequest, res: VercelResponse) => {
  const { q } = req.query;

  const currentBoard = await Board.load(path.join(process.cwd(), "..", "graphs","search-summary.json");
  const outputs = [];

  for await (const result of currentBoard.run()) {
    if (result.seeksInputs) {
      result.inputs = { text: q };
    }
    else {
      outputs.push(result.outputs);
    }
  }
cc
  return res.json({ outputs });
};