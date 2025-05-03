import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default function Header(props) {
    

    return (
        <div className='flex justify-end p-5 shadow-sm'>
            <UserButton />
        </div>
    )
}
