global.CustomEvent = class extends Event { 
  constructor(message, data) {
    super(message, data)
    this.detail = data.detail
  }
};

import { Board } from "@google-labs/breadboard";

import { VercelRequest, VercelResponse } from "@vercel/node";


export default async (req: VercelRequest, res: VercelResponse) => {
  const { q } = req.query;

  const currentBoard = await Board.load("../graphs/search-summary.json");
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