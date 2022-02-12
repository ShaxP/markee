import { DockSharp } from "@mui/icons-material";
import axios from "axios";
import { stringify } from "querystring";
import { MdDoc } from "../models/MdDoc";
import { TagData } from "../models/TagData";

export interface MdDocService {
  getAllDocuments: () => Promise<MdDoc[]>;

  getAllTags: (docs: MdDoc[]) => TagData[];

  getNotes: (docs: MdDoc[]) => MdDoc[];

  getTodos: (docs: MdDoc[]) => MdDoc[];

  getArchived: (docs: MdDoc[]) => MdDoc[];

  getTagged: (docs: MdDoc[], tag: string) => MdDoc[];
}

class DefaultMdDocService implements MdDocService {
  async getAllDocuments(): Promise<MdDoc[]> {
    let result = await axios.get<MdDoc[]>("/api/docs");
    return result.data;
  }

  getAllTags(docs: MdDoc[]): TagData[] {
    let map = new Map<string, number>();
    docs.forEach((element: MdDoc) => {
      element.tags.forEach((tag: string) => {
        if (map.has(tag)) {
          map.set(tag, map.get(tag)! + 1);
        } else {
          map.set(tag, 1);
        }
      });
    });
    let result: { tag: string; count: number }[] = new Array<{
      tag: string;
      count: number;
    }>();
    map.forEach((value: number, key: string) => {
      result.push({ tag: key, count: value });
    });
    return result;
  }

  getNotes(docs: MdDoc[]): MdDoc[] {
    return docs.filter((doc: MdDoc) => !doc.archived);
  }

  getTodos(docs: MdDoc[]): MdDoc[] {
    return docs.filter((doc: MdDoc) => doc.todo);
  }

  getArchived(docs: MdDoc[]): MdDoc[] {
    return docs.filter((doc: MdDoc) => doc.archived);
  }

  getTagged(docs: MdDoc[], tag: string): MdDoc[] {
    return docs.filter((doc: MdDoc) => doc.tags.includes(tag));
  }
}

export const service: MdDocService = new DefaultMdDocService();
