import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

export default function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  const handleClick = () => {
    editor.focus(); // Focus the editor when clicked
  };

  return null;
}
