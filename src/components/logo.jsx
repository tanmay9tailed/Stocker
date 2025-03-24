import React from 'react'
import Image from "next/image"

export default function Logo() {
  return (
    <div className="flex justify-start">
        <div className='flex justify-center bg-zinc-100 p-2 rounded-lg m-2 w-[100px] h-auto'>
        <Image className='w-[150] h-[118]' src="/logo.png" height={118} width={150} alt='logo' ></Image>

        </div>
    </div>
  )
}

