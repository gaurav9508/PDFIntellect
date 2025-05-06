import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'

export default function WorkspaceHeader() {
    

    return (
        <div className='p-4 flex justify-between shadow-md'>
            <Image src = {'/logo.svg'} alt = 'logo' width = {40} height = {34}/>
            <UserButton />
        </div>
    )
}
