"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function LeftSlider() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleProfileClick = () => {
    if (session?.user?.id) {
      router.push(`/profile.php?id=${session.user.id}`);
    } else {
      alert("User ID not found!");
    }
  };

  return (
    <div className="space-y-4">

      {/* Profile */}
      <div
        onClick={handleProfileClick} // ✅ fixed
        className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
      >
        {/* <Image
          src="/profile.jpg"
          width={40}
          height={40}
          className="rounded-full"
          alt="profile"
        /> */}
        <span className="font-semibold">{session?.user?.name || "User"}</span>
      </div>

      {/* Main Menu */}
      <ul className="space-y-2">
        <li className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg">Friends</li>
        <li className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg">Groups</li>
        <li className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg">Marketplace</li>
        <li className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg">Watch</li>
        <li className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg">Memories</li>
      </ul>

      <hr />

      {/* Shortcuts */}
      <h3 className="font-semibold text-gray-600">Your Shortcuts</h3>
      <ul className="space-y-2">
        <li className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg">My Coding Group</li>
        <li className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg">Frontend Devs</li>
        <li className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg">Gaming Community</li>
      </ul>

    </div>
  );
}
