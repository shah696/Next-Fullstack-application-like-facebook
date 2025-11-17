"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { FaHome, FaTv, FaUsers, FaStore } from "react-icons/fa";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-full mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: FB Logo + Search */}
          <div className="flex items-center gap-4">
            <Image src="/favicon.ico" alt="Facebook" width={40} height={40} />
            <div className="hidden md:flex items-center h-full bg-gray-100 rounded-full px-3 py-3">
              <input
                type="text"
                placeholder="Search Facebook"
                className="bg-transparent outline-none h-full text-sm w-24 md:w-36"
              />
            </div>
          </div>

          {/* Center: Menu Icons */}
          <div className="flex items-center gap-6">
            <div className="px-8 py-4 rounded-md hover:bg-gray-100 cursor-pointer">
              <FaHome className="text-2xl text-blue-600" />
            </div>
            <div className="px-8 py-4 rounded-md hover:bg-gray-100 cursor-pointer">
              <FaTv className="text-2xl text-gray-700" />
            </div>
            <div className="px-8 py-4 rounded-md hover:bg-gray-100 cursor-pointer">
              <FaUsers className="text-2xl text-gray-700" />
            </div>
            <div className="px-8 py-4 rounded-md hover:bg-gray-100 cursor-pointer">
              <FaStore className="text-2xl text-gray-700" />
            </div>
          </div>

          {/* Right: Profile + Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-full">
              <Image
                src={session?.user?.image || "/profile.jpg"}
                width={32}
                height={32}
                className="rounded-full"
                alt="profile"
              />
              <span className="font-semibold text-sm">
                {session?.user?.name || "User"}
              </span>
            </div>

            <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
              💬
            </div>
            <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
              🔔
            </div>
            <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
              ▾
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
