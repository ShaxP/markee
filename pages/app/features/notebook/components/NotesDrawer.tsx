import {
  List,
  ListItemText,
  Toolbar,
  ListItem,
  Divider,
  InputBase,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import MdDoc from "../models/MdDoc";

type Props = {
  docs: MdDoc[];
  onSelectDocument: (doc: MdDoc) => void;
};

export default function NotesDrawer({ docs, onSelectDocument }: Props) {
  return (
    <div>
      <Toolbar>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {docs.map((doc: MdDoc) => (
          <ListItem
            button
            key={doc.id}
            onClick={(event) => {
              onSelectDocument(doc);
            }}
          >
            <ListItemText
              primary={doc.content}
              secondary={`modified: ${new Date(doc.modified).toDateString()}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
