import React, { useState } from 'react'
import Image from 'next/image'
import logo from '@/assets/images/fix.png'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function MintingHeader() {
  const [nav, setNav] = useState(false)
  const handleClick = () => {
    setNav(!nav)
  }

  return (
    <nav className="w-screen px-8 py-6 shadow-lg ">
      <div className="flex items-center max-sm:justify-between md:gap-6">
        <Image src={logo} alt="Logo" width={150} className="lg:w-[194px]" />
        {/* menu */}
        <div>
          <ul className="hidden space-x-8 md:flex">
            <li className="text-[#171717] opacity-[0.68]">
              <Link href="/" className="cursor-pointer hover:text-[#FAD02C]">
                Home
              </Link>
            </li>
            <li className="text-[#171717] opacity-[0.68]">
              <Link
                href="/dashboard"
                className="cursor-pointer hover:text-[#FAD02C]"
              >
                Dashboard
              </Link>
            </li>
            <li className="text-[#171717] opacity-[0.68]">
              <Link
                href="/minting/connect"
                className="cursor-pointer hover:text-[#FAD02C]"
              >
                Minting
              </Link>
            </li>
          </ul>
        </div>
        {/* hamburger */}
        <div
          className={nav ? 'z-50 text-white md:hidden' : 'z-50 md:hidden'}
          onClick={handleClick}
        >
          {!nav ? <FaBars /> : <FaTimes />}
        </div>
      </div>

      {/* mobile menu */}
      <ul
        className={
          !nav
            ? 'hidden'
            : 'absolute top-0 left-0 z-20 flex  h-screen w-full flex-col items-center justify-center bg-[#374C8C]'
        }
      >
        <li className="py-6 text-2xl text-white">
          <Link href="/" className="cursor-pointer hover:text-[#374C8C]">
            Home
          </Link>
        </li>
        <li className="py-6 text-2xl text-white">
          <Link
            href="/dashboard"
            className="cursor-pointer hover:text-[#374C8C]"
          >
            Dashboard
          </Link>
        </li>
        <li className="py-6 text-2xl text-white">
          <Link
            href="/minting/connect"
            className="cursor-pointer hover:text-[#374C8C]"
          >
            Minting
          </Link>
        </li>
      </ul>
    </nav>
  )
}
