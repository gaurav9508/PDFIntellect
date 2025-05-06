import React from 'react'

export default function PdfViewer({fileUrl}) {
    console.log(fileUrl);

    return (
        <div>
            <iframe src = {fileUrl+"#toolbar=0"} height = '90vh' width = '100%' className='h-[90vh]'/>
        </div>
    )
}

check
