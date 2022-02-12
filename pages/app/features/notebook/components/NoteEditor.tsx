import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import MdDoc from "../models/MdDoc";

type Props = {
  drawerWidth: number;
  doc?: MdDoc;
};

export default function MdDocEditor({ drawerWidth, doc }: Props) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Toolbar />
      <Typography paragraph>
        {doc === undefined ? "No document selected" : doc!.content}
      </Typography>
    </Box>
  );
}
