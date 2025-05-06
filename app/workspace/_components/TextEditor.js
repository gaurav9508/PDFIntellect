import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import EditorExtenion from './EditorExtenion'

import TextAlign from '@tiptap/extension-text-align'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'

export default function TextEditor(props) {
    const editor = useEditor({
        extensions: [StarterKit,
            Placeholder.configure({
                placeholder:'Start taking your notes here...'
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            BulletList,
            ListItem,
        ],
        editorProps:{
            attributes:{
                class:'focus:outline-none h-screen p-5'
            }
        }
    })

    return (
        <div>
            <EditorExtenion editor = {editor}/>
            <div>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}
