import React, { useState } from 'react'

export default function Header() {

    const [buttonText, setButtonText] = useState("Connect Wallet")

  return (
    <div className='w-full h-16 flex flex-row justify-between items-center px-10 border-b-gray-300 border-[1px]'>
        <p className='text-primary-blue font-bold text-xl cursor-pointer'>Decentralized Voting System</p>
        <div className='bg-primary-blue rounded-lg'>
            <p className='text-white px-5 py-2 cursor-pointer'>{buttonText}</p>
        </div>
    </div>
  )
}
