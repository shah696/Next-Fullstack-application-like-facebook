"use client";
import Image from "next/image";
import React from "react";

interface ProfileHeaderProps {
  username: string;
  profilePic: string;
  coverPic?: string;
}

export default function ProfileHeader({ username, profilePic, coverPic }: ProfileHeaderProps) {
  return (
    <div className="mb-6">
      <div className="w-full h-48 relative bg-gray-300 rounded-lg overflow-hidden">
        {coverPic && <Image src={coverPic} fill className="object-cover" alt="cover" />}
      </div>

      <div className="flex items-center gap-4 mt-[-40px] px-4">
        <Image
          src={profilePic}
          width={80}
          height={80}
          className="rounded-full border-4 border-white"
          alt="profile"
        />
        <h1 className="text-2xl font-bold">{username}</h1>
      </div>
    </div>
  );
}
