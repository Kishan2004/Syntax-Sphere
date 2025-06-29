import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

const TiptapEditor = ({ input, setInput }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Bold,
      Italic,
      Heading.configure({ levels: [1, 2] }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: input.description || "<p>Start writing your course description...</p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setInput({ ...input, description: html });
    },
  });

  if (!editor) return null;

  return (
    <div className="border p-4 rounded-md space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-2">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className="px-2 py-1 border rounded">
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className="px-2 py-1 border rounded">
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="px-2 py-1 border rounded">
          H1
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="px-2 py-1 border rounded">
          H2
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="px-2 py-1 border rounded">
          • Bullet List
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="px-2 py-1 border rounded">
          1. Ordered List
        </button>
        <button onClick={() => editor.chain().focus().undo().run()} className="px-2 py-1 border rounded">
          Undo
        </button>
        <button onClick={() => editor.chain().focus().redo().run()} className="px-2 py-1 border rounded">
          Redo
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="min-h-[150px] border rounded p-2" />
    </div>
  );
};

export default TiptapEditor;
