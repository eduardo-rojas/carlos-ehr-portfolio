"use client";

import { useTheme } from "next-themes";
import { PartialBlock } from "@blocknote/core";
// import { BlockNoteView, useBlockNote } from "@blocknote/react";
// import "@blocknote/core/style.css";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const initialBlocks = initialContent ? JSON.parse(initialContent) : undefined;
  const [blocks, setBlocks] = useState<PartialBlock[]>(initialBlocks);
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });
    return response.url;
  };

  const editor = useCreateBlockNote({
    initialContent: blocks,
    uploadFile: handleUpload,
  });

  // const editor = useCreateBlockNote({
  //   initialContent: initialContent
  //     ? (JSON.parse(initialContent) as PartialBlock[])
  //     : undefined,
  // });
  //     : undefined, });
  //   {
  //   editable,
  //   initialContent: initialContent
  //     ? (JSON.parse(initialContent) as PartialBlock[])
  //     : undefined,
  //   onEditorContentChange: (editor) => {
  //     onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
  //   },
  // }
  return (
    <div>
      <BlockNoteView
        editable={editable}
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onChange={() => {
          setBlocks(editor.document);
          onChange(JSON.stringify(blocks));
        }}
      />
    </div>
  );
};

export default Editor;
