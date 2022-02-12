import MdDoc from "../models/MdDoc";
import { TagData } from "../models/TagData";

export enum NotebookActionType {
  SELECT_NOTES = "SELECT_NOTES",
  SELECT_TODOS = "SELECT_TODOS",
  SELECT_ARCHIVED = "SELECT_ARCHIVED",
  SELECT_TAG = "SELECT_TAG",
  UPDATE_DOCS = "UPDATE_DOCS",
}

export interface NotebookAction {
  type: NotebookActionType;
  docs?: MdDoc[];
  visibleDocs?: MdDoc[];
  tags?: TagData[];
  selectedTag?: string;
}
