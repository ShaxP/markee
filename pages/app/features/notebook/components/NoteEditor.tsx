import { Box, Grid, InputBase, Paper, Toolbar } from "@mui/material";
import React from "react";
import MdDoc from "../models/MdDoc";
// import { CmdKey, commandsCtx, Ctx } from "@milkdown/core";
import { defaultValueCtx, Editor, rootCtx } from "@milkdown/core";
import { nordLight } from "@milkdown/theme-nord";
import { slash } from "@milkdown/plugin-slash";
import { ReactEditor, useEditor } from "@milkdown/react";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { gfm } from "@milkdown/preset-gfm";
import { history } from "@milkdown/plugin-history";
import { clipboard } from "@milkdown/plugin-clipboard";
import { cursor } from "@milkdown/plugin-cursor";
import { math } from "@milkdown/plugin-math";
import { tooltip } from "@milkdown/plugin-tooltip";
import { emoji } from "@milkdown/plugin-emoji";
import { diagram } from "@milkdown/plugin-diagram";
import { indent } from "@milkdown/plugin-indent";
import { menu } from "../plugin-menu";
import InputFrame from "./InputFrame";

type Props = {
  drawerWidth: number;
  doc?: MdDoc;
};
export default function MdDocEditor({ drawerWidth, doc }: Props) {
  const mkd = React.useMemo(() => doc?.content ?? "", [doc?.content]);
  const editor = useEditor(
    (root) => {
      return (
        Editor.make()
          .config((ctx) => {
            ctx.set(rootCtx, root);
            ctx.set(defaultValueCtx, mkd);

            ctx
              .get(listenerCtx)
              .markdownUpdated((ctx, markdown, prevMarkdown) => {
                doc!.content = markdown;
              });
          })
          .use(nordLight)

          .use(gfm)
          // .use(codeSandBox)
          .use(listener)
          .use(clipboard)
          .use(history)
          .use(cursor)
          .use(diagram)
          .use(tooltip)
          .use(math)
          .use(emoji)
          .use(indent)
          // .use(upload)
          .use(slash)
          .use(menu())
      );
    },
    [doc]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Toolbar>
        <Grid key={0} item xs={6} sx={{ height: "100%" }}>
          <InputFrame>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Title"
              inputProps={{ "aria-label": "title" }}
            />
          </InputFrame>
        </Grid>
      </Toolbar>
      <ReactEditor editor={editor} />
    </Box>
  );
}
