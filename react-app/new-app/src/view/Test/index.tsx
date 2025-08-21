
import React, { useState, useRef } from 'react';
// import Editor from '@monaco-editor/react';
// import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
// import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
// import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
// import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
// import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
// import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { Editor, loader } from '@monaco-editor/react';


loader.config({ monaco });



function CodeEditor() {

  const editorRef = useRef(null);
  function handleEditorDidMount(editor: any, monaco: any) {

    editorRef.current = editor;
  }

  return (
    <div>
    <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
      />
    </div>
  );
}



export default CodeEditor;