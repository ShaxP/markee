import React, { forwardRef, Ref, useImperativeHandle, useRef } from "react";
import MdDoc from "../models/MdDoc";
import "remirror/styles/all.css";

import {
  BoldExtension,
  ItalicExtension,
  HeadingExtension,
  MarkdownExtension,
  CodeExtension,
  CodeBlockExtension,
  BlockquoteExtension,
  DropCursorExtension,
  EmojiExtension,
  ImageExtension,
  LinkExtension,
  StrikeExtension,
  SupExtension,
  UnderlineExtension,
  BulletListExtension,
  TaskListExtension,
  OrderedListExtension,
} from "remirror/extensions";
import {
  Remirror,
  ThemeProvider,
  useRemirror,
  useRemirrorContext,
} from "@remirror/react";
import { Box, Grid, InputBase, Toolbar } from "@mui/material";
import InputFrame from "./InputFrame";

export interface EditorRef {
  setContent: (content: any) => void;
}

// eslint-disable-next-line react/display-name
const ImperativeHandle = forwardRef((_: unknown, ref: Ref<EditorRef>) => {
  const { setContent } = useRemirrorContext({
    autoUpdate: true,
  });

  // Expose content handling to outside
  useImperativeHandle(ref, () => ({ setContent }));

  return <></>;
});

type Props = {
  doc?: MdDoc;
  content: string;
  title: string;
  documentChanged: (doc: MdDoc) => void;
};

export default function MdEditor({ doc, content, title }: Props) {
  const editorRef = useRef<EditorRef | null>(null);
  // const content = React.useMemo<String>(() => new String(doc?.content ?? ""));
  const [titleValue, setTitleValue] = React.useState(title);

  React.useCallback(() => {
    if (doc != null) {
      doc!.title = titleValue;
      console.log("Setting title");
    }
  }, [doc, titleValue]);

  const { manager, state, setState } = useRemirror({
    extensions: () => [
      new HeadingExtension(),
      new ItalicExtension(),
      new BoldExtension(),
      new MarkdownExtension(),
      new CodeExtension(),
      new CodeBlockExtension(),
      new BlockquoteExtension(),
      new DropCursorExtension(),
      new EmojiExtension(),
      new ImageExtension(),
      new LinkExtension(),
      new StrikeExtension(),
      new SupExtension(),
      new UnderlineExtension(),
      new BulletListExtension(),
      new TaskListExtension(),
      new OrderedListExtension(),
    ],
    content: content,
    selection: "start",
    stringHandler: "markdown",
  });

  React.useEffect(() => {
    editorRef.current!.setContent(content);
  }, [content]);

  return (
    <Box sx={{ width: "100%" }}>
      <Toolbar>
        Title:
        <Box sx={{ width: "20px" }} />
        <Grid key={0} item xs={3} sx={{ height: "100%" }}>
          <InputFrame>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Enter the title here"
              inputProps={{ "aria-label": "title" }}
              value={doc?.title ?? ""}
              onChange={(event) => {
                if (doc != undefined) {
                  doc!.title = event.target.value;
                  setTitleValue(event.target.value);
                }
              }}
            />
          </InputFrame>
        </Grid>
      </Toolbar>
      <ThemeProvider>
        <Remirror
          manager={manager}
          state={state}
          onChange={(parameter) => {
            // Update the state to the latest value.

            setState(parameter.state);
            console.log(parameter.state.doc.content);
            const ext = manager.extensions.find(
              (ex) => ex instanceof MarkdownExtension
            ) as MarkdownExtension;
            const md = ext.getMarkdown();
            console.log(md);
            if (doc != undefined) {
              doc!.content = md;
            }
          }}
          autoRender="start"
          placeholder="Enter your text here"
        >
          <ImperativeHandle ref={editorRef} />
        </Remirror>
      </ThemeProvider>
    </Box>
  );
}
