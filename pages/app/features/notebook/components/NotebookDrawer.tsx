import { Box, Drawer, Grid, Paper } from "@mui/material";
import React from "react";
import MdDoc from "../models/MdDoc";
import { TagData } from "../models/TagData";
import { NotebookCounts, NotebookSelectionType } from "../state/NotebookState";
import FiltersDrawer from "./FiltersDrawer";
import NotesDrawer from "./NotesDrawer";

type Props = {
  width: number;
  open: boolean;
  counts: NotebookCounts;
  tags: TagData[];
  selectionType: NotebookSelectionType;
  onSelectFilter: (type: NotebookSelectionType, tag?: string) => void;
  onSelectDocument: (doc: MdDoc) => void;
  onDrawerToggle: () => void;
  docs: MdDoc[];
};

export default function NotebookDrawer(props: Props) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  const drawer = (
    <Grid
      sx={{ height: "100%", flexGrow: 0 }}
      container
      direction="row"
      spacing={0}
    >
      <Grid key={0} item xs={6} sx={{ height: "100%" }}>
        <Paper sx={{ height: "100%", borderRadius: "0", boxShadow: 1 }}>
          <FiltersDrawer
            tags={props.tags}
            counts={props.counts}
            selectionType={props.selectionType}
            onSelection={props.onSelectFilter}
          />
        </Paper>
      </Grid>
      <Grid key={1} item xs={6} sx={{ height: "100%" }}>
        <Box sx={{ height: "100%" }}>
          <NotesDrawer
            docs={props.docs}
            onSelectDocument={props.onSelectDocument}
            onChangeDocument={props.onSelectDocument}
          />
        </Box>
      </Grid>
    </Grid>
  );
  return mounted ? (
    <Box
      component="nav"
      sx={{ width: { sm: props.width }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={props.open}
        onClose={props.onDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.width,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.width,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  ) : (
    <div />
  );
}
