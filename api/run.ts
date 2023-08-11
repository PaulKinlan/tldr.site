import { Board } from "@google-labs/breadboard";

import { VercelRequest, VercelResponse } from "@vercel/node";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async (req: VercelRequest, res: VercelResponse) => {
  const { q } = req.query;

  console.log(__dirname)
  const currentBoard = await Board.load(path.join(__dirname, "..", "graphs","search-summary.json");
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