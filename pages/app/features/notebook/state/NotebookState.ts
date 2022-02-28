import MdDoc from "../models/MdDoc";
import { TagData } from "../models/TagData";

export enum NotebookSelectionType {
  None,
  Notes,
  Todos,
  Trash,
  Tag,
}

export interface NotebookState {
  docs: MdDoc[];
  visibleDocs: MdDoc[];
  selection: NotebookSelectionType;
  selectedTag?: string;
  tags: TagData[];
  counts: NotebookCounts;
}

export interface NotebookCounts {
  notes: number;
  todos: number;
  archived: number;
}
