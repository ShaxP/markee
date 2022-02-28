import { Paper } from "@mui/material";
import React, { ReactNode } from "react";

type Props = {
  width?: string;
  children?: ReactNode;
};

export default function InputFrame({ width, children }: Props) {
  return (
    <Paper
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: width ?? "100%",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "#E2E8F0",
        boxShadow: "0",
        backgroundColor: "#F1F5F9",
        borderRadius: "15px",
      }}
    >
      {children}
    </Paper>
  );
}
