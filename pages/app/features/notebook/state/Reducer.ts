import { NotebookAction, NotebookActionType } from "./NotebookAction";
import { NotebookSelectionType, NotebookState } from "./NotebookState";
import { service as docService } from "../services/MdDocService";

export function notebookStateReducer(
  state: NotebookState,
  action: NotebookAction
): NotebookState {
  let newState: NotebookState = state;
  switch (action.type) {
    case NotebookActionType.SELECT_ARCHIVED:
      newState = {
        ...state,
        visibleDocs: docService.getArchived(state.docs),
        selection: NotebookSelectionType.Trash,
      };
      break;
    case NotebookActionType.SELECT_NOTES:
      newState = {
        ...state,
        visibleDocs: docService.getNotes(state.docs),
        selection: NotebookSelectionType.Notes,
      };
      break;
    case NotebookActionType.SELECT_TODOS:
      newState = {
        ...state,
        visibleDocs: docService.getTodos(state.docs),
        selection: NotebookSelectionType.Todos,
      };
      break;
    case NotebookActionType.SELECT_TAG:
      newState = {
        ...state,
        visibleDocs: docService.getTagged(state.docs, action.selectedTag!),
        selection: NotebookSelectionType.Tag,
      };
      break;
    case NotebookActionType.UPDATE_DOCS:
      const archived = docService.getArchived(action.docs!);
      const todos = docService.getTodos(action.docs!);
      const notes = docService.getNotes(action.docs!);
      newState = {
        ...state,
        docs: action.docs!,
        visibleDocs: docService.getNotes(action.docs!),
        tags: docService.getAllTags(action.docs!),
        counts: {
          notes: notes.length,
          archived: archived.length,
          todos: todos.length,
        },
      };
  }
  return newState;
}
