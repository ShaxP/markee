import type { NextApiRequest, NextApiResponse } from "next";
import type MdDoc from "../../app/features/notebook/models/MdDoc";
import fs from "fs";
import path from "path";
import { promisify } from "util";

// const docs: MdDoc[] = [
//   {
//     id: "1",
//     archived: false,
//     todo: false,
//     tags: ["Sports", "Art", "Fishing", "Golf", "Work"],
//     modified: new Date(2018, 0o5, 0o5, 17, 23),
//     title: "Random",
//     content: "This is *just* a text",
//   },
//   {
//     id: "2",
//     archived: false,
//     todo: true,
//     tags: ["Sports", "Fishing", "Golf", "Web", "Karate"],
//     modified: new Date(2021, 3, 21, 17, 23),
//     title: "Another note",
//     content: "Just another text to see what the content will be",
//   },
//   {
//     id: "3",
//     archived: false,
//     todo: true,
//     tags: ["Art", "Fishing", "Beer", "Work"],
//     modified: new Date(2015, 2, 16, 13, 21),
//     title: "London brewry",
//     content: "London brewery is one of the **finest** institutes in UK",
//   },
//   {
//     id: "4",
//     archived: true,
//     todo: false,
//     tags: ["Entertainment", "TV"],
//     modified: new Date(2022, 1, 30, 9, 14),
//     title: "Ozark",
//     content: "Greatest series of all time is Ozark",
//   },
// ];
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const readFile = promisify(fs.readFile);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jsonFile = path.resolve("./data", "docs.json");
  try {
    console.log(`Trying to read the file: ${jsonFile}`);
    const jsonData = await readFile(jsonFile);
    console.log(
      `Json data read from file, content is : ${jsonData.toString()}`
    );
    const docs = JSON.parse(jsonData.toString()).docs;

    delay(1000);
    if (!docs) {
      res
        .status(404)
        .send("Error: Something is wrong with the format of the json file");
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(docs, null, 2));
    }
  } catch (e) {
    res
      .status(404)
      .send("Error: Something went wrong when reading the json data");
  }
}
