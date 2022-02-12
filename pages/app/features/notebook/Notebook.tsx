import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MdDoc from "./models/MdDoc";
import { service as docService } from "./services/MdDocService";
import { NotebookState, NotebookSelectionType } from "./state/NotebookState";
import { NotebookActionType } from "./state/NotebookAction";
import { notebookStateReducer } from "./state/Reducer";
import NotebookDrawer from "./components/NotebookDrawer";
import NotebookAppBar from "./components/NotebookAppBar";
import NoteEditor from "./components/NoteEditor";

export default function Notebook() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [selectedDocument, setSelectedDocument] = React.useState<
    MdDoc | undefined
  >(undefined);
  const handleDocumentSelection = (doc: MdDoc) => {
    setSelectedDocument(doc);
  };

  const handleFilterSelection = (type: NotebookSelectionType, tag?: string) => {
    const selectionToActionTypeMap = new Map<
      NotebookSelectionType,
      NotebookActionType
    >([
      [NotebookSelectionType.None, NotebookActionType.SELECT_NOTES],
      [NotebookSelectionType.Notes, NotebookActionType.SELECT_NOTES],
      [NotebookSelectionType.Tag, NotebookActionType.SELECT_TAG],
      [NotebookSelectionType.Todos, NotebookActionType.SELECT_TODOS],
      [NotebookSelectionType.Trash, NotebookActionType.SELECT_ARCHIVED],
    ]);

    dispatch({
      type: selectionToActionTypeMap.get(type)!,
      selectedTag: tag,
    });
  };

  const initialState: NotebookState = {
    docs: [],
    visibleDocs: [],
    tags: [],
    selection: NotebookSelectionType.None,
    counts: { notes: 0, todos: 0, archived: 0 },
  };

  const [state, dispatch] = React.useReducer(
    notebookStateReducer,
    initialState
  );

  React.useEffect(() => {
    const fetchData = async function () {
      let result = await docService.getAllDocuments();
      dispatch({ type: NotebookActionType.UPDATE_DOCS, docs: result });
    };
    fetchData();
    return () => {
      console.log("Clean up");
    };
  }, []);

  const drawerWidth = 480;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NotebookAppBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <NotebookDrawer
        width={drawerWidth}
        open={mobileOpen}
        docs={state.visibleDocs}
        tags={state.tags}
        counts={state.counts}
        selectionType={state.selection}
        onSelectFilter={handleFilterSelection}
        onSelectDocument={handleDocumentSelection}
        onDrawerToggle={handleDrawerToggle}
      />

      <NoteEditor drawerWidth={drawerWidth} doc={selectedDocument} />
    </Box>
  );
}
