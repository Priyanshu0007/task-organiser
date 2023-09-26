'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { MagnifyingGlassCircleIcon,UserCircleIcon } from '@heroicons/react/24/solid'
import Avatar from 'react-avatar'
import { useBoardStore } from '@/store/BoardStore'
import fetchSuggestion from '@/utils/fetchSuggestion'
const Header = () => {
    const [board,searchString,setSearchString]=useBoardStore((state)=>[state.board,state.searchString,state.setSearchString]);
    const [loading,setLoading]=useState<boolean>(false);
    const [suggestion,setSuggestion]=useState<string>("")
    // useEffect(()=>{
    //     if(board.columns.size===0){return;}
    //     setLoading(true);
    //     const fetchSuggestionFunc=async ()=>{
    //     fetchSuggestion(board);
    //     setSuggestion(suggestion);
    //     setLoading(false);
    //     }
    //     fetchSuggestionFunc();
    // },[board])
  return (
    <header>
        <div className='flex flex-col md:flex-row items-center p-5  rounded-b-2xl'>
        <div className='absolute top-0 left-0 w-full h-96  -z-50'></div>
        <Image src='https://cdn.worldvectorlogo.com/logos/trello-logo.svg' alt='logo' height={100} width={300} className='w-44 md:w-56 pb-10 mb:pb-0 object-contain' />
        <div className='flex items-center space-x-5 flex-1 justify-end'>
            <form className='flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial'>
                <MagnifyingGlassCircleIcon className='ml-2 h-6 w-6 text-gray-400' />
                <input type='text' value={searchString} onChange={(e)=>setSearchString(e.target.value)} placeholder='Search' className='flex-1 outline-none p-2' />
                <button hidden type='submit'>Search</button>
            </form>
            <a href='https://github.com/Priyanshu0007'>
            <Avatar name='Priyanshu Gupta' round size='50' color='#0055D1'/>
            </a>
        </div>
        </div>
        <div className='flex items-center justify-center px-5 md:py-5'>
            <p className='flex items-center text-sm p-5 font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic mx-w-3xl text-[#0055D1]'>
                <UserCircleIcon className={`inline-black h-10 w-10 text-[#0055D1] mr-1 ${loading && "animate-spin"}`} />
                {suggestion && !loading? suggestion : "GPT is summarising your tasks for the day...{ Not work because GPT is paid to use }"}
            </p>
        </div>
    </header>
  );
}

export default Header