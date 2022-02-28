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
  SxProps,
  Theme,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { TagData } from "../models/TagData";
import { NotebookCounts, NotebookSelectionType } from "../state/NotebookState";
import { Tag } from "@mui/icons-material";

type Props = {
  counts: NotebookCounts;
  tags: TagData[];
  selectionType: NotebookSelectionType;
  onSelection: (type: NotebookSelectionType, tag?: string) => void;
};

function _getTextStyle(condition: boolean) {
  return {
    color: condition ? "primary.main" : undefined,
  };
}

function _getChipStyle(condition: boolean) {
  return {
    color: condition ? "primary.main" : undefined,
    borderRadius: 2,
    minWidth: 40,
    fontWeight: condition ? "bold" : "normal",
    bgcolor: condition ? "#DADDFD" : undefined,
  };
}

function _getIconColor(condition: boolean) {
  return condition ? "primary" : undefined;
}

export default function FiltersDrawer({
  counts,
  tags,
  selectionType,
  onSelection,
}: Props) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  const [selectedTag, setSelectedTag] = React.useState<string | undefined>(
    undefined
  );
  return mounted ? (
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
            setSelectedTag(undefined);
          }}
        >
          <ListItemIcon>
            <AssignmentIcon
              fontSize="small"
              color={_getIconColor(
                selectionType in
                  [
                    NotebookSelectionType.Notes,
                    selectionType === NotebookSelectionType.None,
                  ]
              )}
            />
          </ListItemIcon>
          <ListItemText
            primary="Notes"
            sx={_getTextStyle(
              selectionType in
                [
                  NotebookSelectionType.Notes,
                  selectionType === NotebookSelectionType.None,
                ]
            )}
          />
          <Chip
            label={counts.notes}
            sx={_getChipStyle(
              selectionType in
                [
                  NotebookSelectionType.Notes,
                  selectionType === NotebookSelectionType.None,
                ]
            )}
          />
        </ListItemButton>
        <ListItemButton
          key="todo"
          onClick={(event) => {
            onSelection(NotebookSelectionType.Todos);
            setSelectedTag(undefined);
          }}
        >
          <ListItemIcon>
            <AssignmentTurnedInIcon
              fontSize="small"
              color={_getIconColor(
                selectionType === NotebookSelectionType.Todos
              )}
            />
          </ListItemIcon>
          <ListItemText
            primary="Todo"
            sx={_getTextStyle(selectionType === NotebookSelectionType.Todos)}
          />
          <Chip
            label={counts.todos}
            sx={_getChipStyle(selectionType === NotebookSelectionType.Todos)}
          />
        </ListItemButton>
        <ListItemButton
          key="trash"
          onClick={(event) => {
            onSelection(NotebookSelectionType.Trash);
            setSelectedTag(undefined);
          }}
        >
          <ListItemIcon>
            <DeleteIcon
              fontSize="small"
              color={_getIconColor(
                selectionType === NotebookSelectionType.Trash
              )}
            />
          </ListItemIcon>
          <ListItemText
            primary="Trash"
            sx={_getTextStyle(selectionType === NotebookSelectionType.Trash)}
          />
          <Chip
            label={counts.archived}
            sx={_getChipStyle(selectionType === NotebookSelectionType.Trash)}
          />
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
              setSelectedTag(tag);
            }}
          >
            <ListItemIcon>
              <TagOutlinedIcon
                fontSize="small"
                color={_getIconColor(
                  selectionType == NotebookSelectionType.Tag &&
                    selectedTag === tag
                )}
              />
            </ListItemIcon>
            <ListItemText
              primary={tag}
              sx={_getTextStyle(
                selectionType == NotebookSelectionType.Tag &&
                  selectedTag === tag
              )}
            />
            <Chip
              label={count}
              sx={_getChipStyle(
                selectionType == NotebookSelectionType.Tag &&
                  selectedTag === tag
              )}
            />
          </ListItemButton>
        ))}
      </List>
    </div>
  ) : (
    <div />
  );
}
