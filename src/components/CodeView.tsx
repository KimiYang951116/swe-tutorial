import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import { useTheme } from "../lib/theme";

const baseSetup = {
  lineNumbers: false,
  foldGutter: false,
  highlightActiveLine: false,
  highlightActiveLineGutter: false,
  highlightSelectionMatches: false,
  searchKeymap: false,
  autocompletion: false,
} as const;

/** Read-only, syntax-highlighted code display. */
export function CodeView({ code }: { code: string }) {
  const { isDark } = useTheme();
  return (
    <CodeMirror
      value={code}
      editable={false}
      basicSetup={baseSetup}
      extensions={[javascript(), EditorView.lineWrapping]}
      theme={isDark ? oneDark : "light"}
      className="text-[13px]"
    />
  );
}
