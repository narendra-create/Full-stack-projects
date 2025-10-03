"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setshowdropdown] = useState(false)


  return (
    <>
      <nav className='bg-gradient-to-b from-neutral-900 via-neutral-950 to-transparent sticky mb-5 text-white z-30 shadow px-8 pt-6 h-full text-sm top-0 '>
        <ul className='flex justify-between items-center top-0'>
          <li>
            <Link href={"/"} className='flex gap-2 items-center'>
              <span className='font-bold'>Get Me A coffee</span>
              <img src="/coffee-break.png" alt="coffee logo" className='w-8' />
            </Link>
          </li>
          <li className='flex gap-5 items-center'>
            {session && (
              <>
                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" onClick={() => setshowdropdown(!showdropdown)} onBlur={() => setTimeout(() => {
                  setshowdropdown(false)
                }, 100)} className="text-white rounded-2xl bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800" type="button">Welcome {session.user.email} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>

                <div id="dropdown" onBlur={() => setshowdropdown(false)} className={`absolute right-40 top-18 z-10 ${showdropdown ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-32 dark:bg-gray-700`}>

                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                      <Link href="/Dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                    </li>
                    <li>
                      <Link href={`/${session.user.email}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                    </li>
                    
                  </ul>
                </div>

                <Link
                  onClick={() => signOut()}
                  href={'/'}
                  className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
              focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
              font-medium rounded-4xl text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Logout
                </Link>
              </>
            )}
            {!session && <>
              <Link href={'/Working'} className='underline'>
                How it Works ?
              </Link>
              <Link
                href={'/Login'}
                className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
              focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
              font-medium rounded-4xl text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Login/Signup
              </Link>
            </>
            }
          </li>
        </ul >
      </nav >
    </>
  )
}

export default Navbar
