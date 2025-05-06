import { 
    AlignCenter, 
    AlignJustify, 
    AlignLeft, 
    AlignRight, 
    Bold, 
    CornerDownLeft, 
    //Highlighter, 
    Indent, Italic, 
    MoveLeft, Outdent, 
    Redo, Redo2,
    Strikethrough, Subscript, Underline, Undo, Undo2 } from 'lucide-react'
import React from 'react'
import { List } from 'lucide-react'

export default function EditorExtenion({editor}) {
    return editor && (
        <div className='p-5 flex gap-3'>
            <div className="control-group">
                <div className="button-group flex gap-3">
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={`cursor-pointer ${editor.isActive({ textAlign: 'left' }) ? 'text-blue-500' : ''}`}
                        title="Align Left"
                    >
                        <AlignLeft />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={`cursor-pointer ${editor.isActive({ textAlign: 'center' }) ? 'text-blue-500' : ''}`}
                        title="Align Center"
                    >
                        <AlignCenter />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={`cursor-pointer ${editor.isActive({ textAlign: 'right' }) ? 'text-blue-500' : ''}`}
                        title="Align Right"
                    >
                        <AlignRight />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                        className={`cursor-pointer ${editor.isActive({ textAlign: 'justify' }) ? 'text-blue-500' : ''}`}
                        title="Align Justify"
                    >
                        <AlignJustify />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`cursor-pointer ${editor?.isActive('bold') ? 'text-blue-500' : ''}`}
                        title="Bold"
                    >
                        <Bold />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`cursor-pointer ${editor.isActive('italic') ? 'text-blue-500' : ''}`}
                        title="Italic"
                    >
                        <Italic />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={`cursor-pointer ${editor.isActive('underline') ? 'is-active' : ''}`}
                        title="Underline"
                    >
                        <Underline />
                    </button>
                    {/* <button
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        className={`cursor-pointer ${editor.isActive('highlight') ? 'is-active' : ''}`}
                        title="Highlight"
                    >
                        <Highlighter />
                    </button> */}
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={`cursor-pointer ${editor.isActive('strike') ? 'is-active' : ''}`}
                        title="Strikethrough"
                    >
                        <Strikethrough />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleSubscript().run()}
                        className={`cursor-pointer ${editor.isActive('subscript') ? 'is-active' : ''}`}
                        title="Subscript"
                    >
                        <Subscript />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleSuperscript().run()}
                        className={`cursor-pointer ${editor.isActive('superscript') ? 'is-active' : ''}`}
                        title="Superscript"
                    >
                        <Subscript />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        className="cursor-pointer"
                        title="Undo"
                    >
                        <Undo2 />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        className="cursor-pointer"
                        title="Redo"
                    >
                        <Redo2 />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`cursor-pointer ${editor.isActive('bulletList') ? 'text-blue-500' : ''}`}
                        title="Bullet List"
                    >
                        <List />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().splitListItem('listItem').run()}
                        disabled={!editor.can().splitListItem('listItem')}
                        className="cursor-pointer"
                        title="Split List Item"
                    >
                        <CornerDownLeft />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
                        disabled={!editor.can().sinkListItem('listItem')}
                        className="cursor-pointer"
                        title="Indent List Item"
                    >
                        <Indent />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().liftListItem('listItem').run()}
                        disabled={!editor.can().liftListItem('listItem')}
                        className="cursor-pointer"
                        title="Outdent List Item"
                    >
                        <Outdent />
                    </button>
                </div>
            </div>
        </div>
    );
}
