'use client'
import Image from 'next/image'
import React from 'react'
import { MagnifyingGlassCircleIcon,UserCircleIcon } from '@heroicons/react/24/solid'
import Avatar from 'react-avatar'
const Header = () => {
  return (
    <header>
        <div className='flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl'>
        <div className='absolute top-0 left-0 w-full h-96  bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-md filter blur-3xl opacity-50 -z-50'></div>
        <Image src='https://links.papareact.com/c2cdd5' alt='logo' height={100} width={300} className='w-44 md:w-56 pb-10 mb:pb-0 object-contain' />
        <div className='flex items-center space-x-5 flex-1 justify-end'>
            <form className='flex items-center space-x-5 bg-white rounded-md p2 shadow-md flex-1 md:flex-initial'>
                <MagnifyingGlassCircleIcon className='h-6 w-6 text-gray-400' />
                <input type='text' placeholder='Search' className='flex-1 outline-none p-2' />
                <button hidden type='submit'>Search</button>
            </form>
            <Avatar name='Priyanshu Gupta' round size='50' color='#0055D1'/>
        </div>
        </div>
        <div className='flex items-center justify-center px-5 md:py-5'>
            <p className='flex items-center text-sm p-5 font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic mx-w-3xl text-[#0055D1]'>
                <UserCircleIcon className='inline-black h-10 w-10 text-[#0055D1] mr-1' />
                GPT is summarising your tasks for the day...
            </p>
        </div>
    </header>
  );
}

export default Header