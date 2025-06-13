import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect } from 'react'
import EditorExtension from './EditorExtension'

import TextAlign from '@tiptap/extension-text-align'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import HighlightExtension  from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

export default function TextEditor({fileId}) {

    const notes = useQuery(api.notes.GetNotes, {
        fileId:fileId
    })

    console.log(notes);

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
            HighlightExtension ,
            Underline,
        ],
        editorProps:{
            attributes:{
                class:'focus:outline-none h-screen p-5'
            }
        }
    })

    useEffect(() => {
        editor && editor.commands.setContent(notes)
    }, [notes && editor])

    return (
        <div>
            <EditorExtension editor = {editor}/>
            <div className='overflow-scroll h-[88vh]'>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}
