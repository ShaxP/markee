import {
  List,
  ListItemText,
  Toolbar,
  ListItem,
  Divider,
  InputBase,
  IconButton,
  ListItemButton,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import MdDoc from "../models/MdDoc";
import { Box } from "@mui/system";
import { blue } from "@mui/material/colors";
import { service } from "../services/MdDocService";
import InputFrame from "./InputFrame";

type Props = {
  docs: MdDoc[];
  onSelectDocument: (doc: MdDoc) => void;
  onChangeDocument: (doc: MdDoc) => void;
};

export default function NotesDrawer({ docs, onSelectDocument }: Props) {
  const [selectedDoc, setSelectedDoc] = React.useState<MdDoc | undefined>(
    undefined
  );
  return (
    <div>
      <Toolbar disableGutters sx={{ backgroundColor: "#F8FAFC" }}>
        <div style={{ width: "10px" }} />
        <InputFrame>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton
            // type="submit"
            sx={{ p: "10px", color: "#94A3B8" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </InputFrame>
        <div style={{ width: "10px" }} />
      </Toolbar>
      <Divider />
      <List>
        {docs.map((doc: MdDoc, index: number) => {
          const sidemarkWidth = 8;
          const sidemarkHeight = 64;
          const gap = 16;
          return (
            <ListItemButton
              disableGutters
              selected={selectedDoc?.id === doc.id}
              key={doc.id}
              onClick={(event) => {
                if (selectedDoc != undefined) {
                  service.saveDocument(selectedDoc!);
                }
                onSelectDocument(doc);
                setSelectedDoc(doc);
              }}
              sx={{ bgcolor: index % 2 === 0 ? "#F8FAFC" : "white" }}
            >
              <Box
                bgcolor="primary.main"
                borderRadius="0px 5px 5px 0px"
                sx={{
                  width: `${sidemarkWidth}px`,
                  height: `${sidemarkHeight}px`,
                  margin: "0px",
                  display: selectedDoc?.id === doc.id ? "flex" : "none",
                }}
              />
              <Box
                sx={{
                  width: `${gap}px`,
                  height: "50px",
                  display: "flex",
                }}
              />

              <Typography
                sx={{ width: `calc(100% - ${sidemarkWidth + gap}px)` }}
              >
                <Typography variant="subtitle1" component="div">
                  {doc.title}
                </Typography>
                <Typography variant="body2" component="p">
                  {doc.content}
                  <br />
                </Typography>
                <Typography
                  variant="caption"
                  component="div"
                >{`modified: ${new Date(
                  doc.modified
                ).toDateString()}`}</Typography>
              </Typography>
            </ListItemButton>
          );
        })}
      </List>
    </div>
  );
}
