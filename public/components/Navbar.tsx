"use client";

import Image from "next/image";
import { 
    FaHome, 
    FaTv, 
    FaUsers, 
    FaStore, 
    FaAngleDown,
    // 👇 Naye Icons
    FaCommentDots, // Chat/Message Icon
    FaBell         // Notification Icon
} from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();

 const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    // Logout hone ke baad user ko /login page par bhej dega
    signOut({ redirect:false }); 
  };
  
  // Agar session load ho raha hai, toh kuch na dikhao
  if (status === "loading") {
    return null; 
  }

  // Agar user logged out hai, toh kuch bhi display na karein (ya koi aur UI dikhayein)
  if (status === "unauthenticated") {
      return null; 
  }
const userName = session?.user?.name || 'My Account';
  // User ka image URL
  const userImage = session?.user?.image || 'https://via.placeholder.com/150';
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
            {/* <div className="hidden md:flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-full">
              <Image
                src={session?.user?.image || "/favicon.ico"}
                width={32}
                height={32}
                className="rounded-full"
                alt="profile"
              />
              <span className="font-semibold text-sm">
                {session?.user?.name || "User"}
              </span>
            </div> */}

           {/* Message Icon */}
    <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
        <FaCommentDots className="h-5 w-5 text-gray-700" />
    </div>

    {/* Notification Icon */}
    <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
        <FaBell className="h-5 w-5 text-gray-700" />
    </div>
           <div className="relative">
            {/* Dropdown Trigger Button */}
            <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center p-2 rounded-full hover:bg-gray-200 cursor-pointer transition duration-150 ease-in-out"
            >
                {/* Profile Picture */}
                <img 
                    src={userImage} 
                    alt="Profile" 
                    className="h-8 w-8 rounded-full object-cover mr-2"
                />
                <span className="text-sm font-semibold hidden sm:inline">{userName.split(' ')[0]}</span>
                <FaAngleDown className="ml-2 h-4 w-4 text-gray-600" />
            </div>

            {/* 👇 Dropdown Content */}
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-20">
                    
                    {/* 1. Profile Header */}
                    <div className="p-3 border-b border-gray-100 flex items-center">
                        <img 
                            src={userImage} 
                            alt="Profile" 
                            className="h-10 w-10 rounded-full object-cover mr-3"
                        />
                        <div>
                            <p className="font-bold text-gray-900">{userName}</p>
                            <p className="text-xs text-blue-600 cursor-pointer hover:underline">View Profile</p>
                        </div>
                    </div>
                    
                    {/* 2. Menu Items (Example) */}
                    <div className="p-2">
                        <div className="p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
                            Settings & Privacy
                        </div>
                        <div className="p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
                            Help & Support
                        </div>
                    </div>

                    {/* 3. Logout Button */}
                    <div className="p-2 border-t border-gray-100">
                        <button
                            onClick={handleLogout}
                            className="w-full text-left p-2 text-sm text-red-600 font-semibold hover:bg-red-50 rounded-lg transition"
                        >
                            Log Out
                        </button>
                    </div>

                </div>
            )}
        </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
