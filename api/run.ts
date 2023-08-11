import { Board } from "@google-labs/breadboard";
import { OutputValues, InputValues } from "@google-labs/graph-runner";
import { Starter } from "@google-labs/llm-starter";

import { VercelRequest, VercelResponse } from "@vercel/node";

const ask = async (inputs: InputValues): Promise<OutputValues> => {
  const defaultValue = "<Exit>";
  const message = ((inputs && inputs.message) as string) || "Enter some text";
  const input = prompt(message, defaultValue);
  if (input === defaultValue) return { exit: true };
  return { text: input };
};

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