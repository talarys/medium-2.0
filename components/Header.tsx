import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <div className="bg-[#FFC017]">
      <div className=" font-semibold flex justify-between py-4 px-14 max-w-7xl  mx-auto ">
        {/* Left Side */}
        <div className="flex items-center">
          {/* Logo Link */}
          <Link href="/">
            <img
              className="mr-8 w-44 object-contain cursor-pointer"
              src="/MediumLogo.svg"
              alt="text"
            />
          </Link>
          <div className="md:inline-flex space-x-5 items-center hidden ">
            <h3 className="cursor-pointer">About</h3>
            <h3 className="cursor-pointer">Contact</h3>
            <h3 className="cursor-pointer">Follow</h3>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <h3 className="cursor-pointer">Sign In</h3>
          <h3 className="rounded-full px-3 py-2 bg-black text-white hover:bg-white hover:text-black cursor-pointer">
            Get Started
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Header
