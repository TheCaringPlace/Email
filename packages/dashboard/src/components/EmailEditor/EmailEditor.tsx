import GjsEditor from "@grapesjs/react";
import grapesjs, { type Editor } from "grapesjs";
import grapesJSMJML from "grapesjs-mjml";
import "grapesjs/dist/css/grapes.min.css";

export interface EmailEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

export default function DefaultEditor({ initialValue, onChange }: EmailEditorProps) {
  const onEditor = (editor: Editor) => {
    console.log("Editor loaded", { editor });
    editor.addComponents(initialValue);
  };

  return (
    <GjsEditor
      // Pass the core GrapesJS library to the wrapper (required).
      // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
      grapesjs={grapesjs}
      // Load the GrapesJS CSS file asynchronously from URL.
      // This is an optional prop, you can always import the CSS directly in your JS if you wish.

      // GrapesJS init options
      options={{
        height: "calc(100vh - 300px)",
        storageManager: false,
        telemetry: false,
        assetManager: {
          upload: false,
        },
        pluginsOpts: {
          grapesJSMJML: {
            overwriteExport: true,
          },
        },
      }}
      plugins={[grapesJSMJML]}
      onEditor={onEditor}
      onUpdate={(_, editor) => onChange(editor.getHtml())}
    />
  );
}
