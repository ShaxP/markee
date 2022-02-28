import type { NextApiRequest, NextApiResponse } from "next";
import type MdDoc from "../../app/features/notebook/models/MdDoc";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const id = req.query.id as string;
  const recordFromBody = req.body;

  if (method != "PUT") {
    res.status(505).send(`Method ${method} is not implemented`);
  } else {
    const jsonFile = path.resolve("./data", "docs.json");
    try {
      console.log(`Trying to read the file: ${jsonFile}`);
      const jsonData = await readFile(jsonFile);
      console.log(
        `Json data read from file, content is : ${jsonData.toString()}`
      );
      const docs: MdDoc[] | undefined = JSON.parse(jsonData.toString()).docs;

      delay(1000);
      if (!docs) {
        res
          .status(404)
          .send("Error: Something is wrong with the format of the json file");
      } else {
        // res.setHeader("Content-Type", "application/json");
        // res.status(200).send(JSON.stringify(docs, null, 2));
        const newDocs = docs.map((rec) => {
          return rec.id === id ? recordFromBody : rec;
        });
        writeFile(jsonFile, JSON.stringify({ docs: newDocs }, null, 2));
        res.status(200).json(recordFromBody);
        console.log(`PUT /api/docs/${id} status: 200`);
      }
    } catch (e) {
      res
        .status(404)
        .send("Error: Something went wrong when reading the json data");
    }
  }
}
