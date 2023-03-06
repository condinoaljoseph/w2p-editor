import ExampleTheme from "./themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { InitialConfigType } from '@lexical/react/LexicalComposer'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { $convertFromMarkdownString, TRANSFORMERS } from '@lexical/markdown';

import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import ActionsPlugin from "./plugins/ActionPlugin";

function Placeholder() {
  return (
    <div className="editor-placeholder">
      Play around with the Markdown plugin...
    </div>
  );
}

const editorConfig: InitialConfigType = {
  namespace: 'composer',
  editorState: () => $convertFromMarkdownString("# Hello, I am Dern \nI am the greatest *embalmer* of all time \n```javascript console.log('hello world, i am dern');``` \nMy hobbies: \n- Watching anime \n- Playing guitar", TRANSFORMERS),
  theme: ExampleTheme,
  onError(error: Error) {
    throw error;
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode
  ]
};

export default function Editor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container"> <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <CodeHighlightPlugin />
        </div>
        <ActionsPlugin />
      </div>
    </LexicalComposer>
  );
}
