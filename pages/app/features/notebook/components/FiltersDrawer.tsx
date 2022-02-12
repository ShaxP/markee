import React from "react";

import {
  List,
  ListItem,
  Typography,
  Button,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  Chip,
  ListItemButton,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { TagData } from "../models/TagData";
import { NotebookCounts, NotebookSelectionType } from "../state/NotebookState";

type Props = {
  counts: NotebookCounts;
  tags: TagData[];
  selectionType: NotebookSelectionType;
  onSelection: (type: NotebookSelectionType, tag?: string) => void;
};

export default function FiltersDrawer({
  counts,
  tags,
  selectionType,
  onSelection,
}: Props) {
  return (
    <div>
      <List>
        <ListItem>
          <Typography variant="h5" component="div" gutterBottom>
            Notebook
          </Typography>
        </ListItem>
        <ListItem>
          <Button sx={{ width: "100%" }} variant="contained">
            New Note
          </Button>
        </ListItem>
        <ListItem>
          <ListSubheader />
        </ListItem>
        <ListItemButton
          key="notes"
          onClick={(event) => {
            onSelection(NotebookSelectionType.Notes);
          }}
        >
          <ListItemIcon>
            <AssignmentIcon
              fontSize="small"
              color={
                selectionType === NotebookSelectionType.Notes ||
                selectionType === NotebookSelectionType.None
                  ? "secondary"
                  : undefined
              }
            />
          </ListItemIcon>
          <ListItemText primary="Notes" />
          <Chip label={counts.notes} />
        </ListItemButton>
        <ListItemButton
          key="todo"
          onClick={(event) => {
            onSelection(NotebookSelectionType.Todos);
          }}
        >
          <ListItemIcon>
            <AssignmentTurnedInIcon
              fontSize="small"
              color={
                selectionType === NotebookSelectionType.Todos
                  ? "secondary"
                  : undefined
              }
            />
          </ListItemIcon>
          <ListItemText primary="Todo" />
          <Chip label={counts.todos} />
        </ListItemButton>
        <ListItemButton
          key="trash"
          onClick={(event) => {
            onSelection(NotebookSelectionType.Trash);
          }}
        >
          <ListItemIcon>
            <DeleteIcon
              fontSize="small"
              color={
                selectionType === NotebookSelectionType.Trash
                  ? "secondary"
                  : undefined
              }
            />
          </ListItemIcon>
          <ListItemText primary="Trash" />
          <Chip label={counts.archived} />
        </ListItemButton>
      </List>
      <ListItem>
        <ListSubheader>Tags</ListSubheader>
      </ListItem>
      <List>
        {tags.map(({ tag, count }) => (
          <ListItemButton
            key={tag}
            onClick={(event) => {
              onSelection(NotebookSelectionType.Tag, tag);
            }}
          >
            <ListItemIcon>
              <TagOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={tag} />
            <Chip label={count} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}
