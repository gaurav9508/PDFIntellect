import { 
    AlignCenter, 
    AlignJustify, 
    AlignLeft, 
    AlignRight, 
    Bold, 
    CornerDownLeft, 
    Highlighter, 
    Indent, Italic, 
    MoveLeft, Outdent, 
    Redo, Redo2,
    Sparkles,
    Strikethrough, Subscript, Underline, Undo, Undo2 } from 'lucide-react'
import React, { use, useMemo } from 'react'
import { List } from 'lucide-react'
import { useAction, useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { notFound, useParams } from 'next/navigation'
import { chatSession } from '../../../configs/AIModel'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'

export default function EditorExtension({editor}) {

    const { fileId } = useParams();
    const SearchAI = useAction(api.myAction.search)
    const saveNotes = useMutation(api.notes.AddNotes)
    const {user} = useUser();


    const onAiClick = async () =>{
        toast("Generating....")
        const selectedText = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            ' '
        )
        console.log("selectedText: ", selectedText)

        const result = await SearchAI({
            query:selectedText,
            fileId: fileId
        })

        const UnformattedAns = JSON.parse(result);
        let AllUnformattedAns = '';
        UnformattedAns && UnformattedAns.forEach(item => {
            AllUnformattedAns = AllUnformattedAns+item.pageContent
        });

        const PROMPT = "For question:"+selectedText+" and with the given content as answer, give appropriate answer in HTML format."+
        " The answer content is : "+AllUnformattedAns;

        const AIModelResult = await chatSession.sendMessage(PROMPT);
        console.log(AIModelResult.response.text());
        const FinalAns = AIModelResult.response.text().replace('```','').replace('html','').replace('```','');

        const AllText = editor.getHTML();
        // editor.commands.setContent(AllText+'<p><strong>Answer:</strong>'+FinalAns+'</p>')
        // editor.commands.setContent(AllText + '<div style="margin-top:5em;"><p><strong>Answer:</strong> ' + FinalAns + '</p></div>');
        editor.commands.setContent(AllText + '<br/><p><strong>Answer:</strong> ' + FinalAns + '</p>');

        saveNotes({
            notes:editor.getHTML(),
            fileId:fileId,
            createdBy:user?.primaryEmailAddress?.emailAddress
        })

    }

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
                        className={`cursor-pointer ${
                            editor.isActive('underline') ? 'text-blue-500' : ''
                        }`}
                        title="Underline"
                    >
                        <Underline />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        className={`cursor-pointer ${
                            editor.isActive('highlight') ? 'text-blue-500' : ''
                        }`}
                        title="Highlight"
                    >
                        <Highlighter />
                    </button>
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
                    <button
                        onClick={() => onAiClick()}
                        className={'hover:text-blue-500'}
                    >
                        <Sparkles/>
                    </button>
                </div>
            </div>
        </div>
    );
}
