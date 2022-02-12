import type { NextApiRequest, NextApiResponse } from 'next';
import type { MdDoc } from '../../app/features/notebook/models/MdDoc';

const docs: MdDoc[] = [
    {
      id: '1',
      archived: false,
      todo: false,
      tags: ["Sports", "Art", "Fishing", "Golf", "Work"],
      modified: new Date(2018, 0o5, 0o5, 17, 23),
      content: "This is just a text",
    },
    {
      id: '2',
      archived: false,
      todo: true,
      tags: ["Sports", "Fishing", "Golf", "Web", "Karate"],
      modified: new Date(2021, 3, 21, 17, 23),
      content: "Just another text to see what the content will be",
    },
    {
      id: '3',
      archived: false,
      todo: true,
      tags: ["Art", "Fishing", "Beer", "Work"],
      modified: new Date(2015, 2, 16, 13, 21),
      content: "London brewery",
    },
    {
      id: '4',
      archived: true,
      todo: false,
      tags: ["Entertainment", "TV"],
      modified: new Date(2022, 1, 30, 9, 14),
      content: "Greatest series of all time is Ozark",
    },
  ];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MdDoc[]>
) {
  res.status(200).json(docs);
}