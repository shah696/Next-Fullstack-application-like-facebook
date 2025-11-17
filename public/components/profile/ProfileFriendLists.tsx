"use client";
import Image from "next/image";
import React from "react";

interface FriendsListProps {
  friends: string[];
}

export default function FriendsList({ friends }: FriendsListProps) {
  return (
    <div className="mt-6">
      <h2 className="font-semibold mb-2">Friends</h2>
      <ul className="space-y-2">
        {friends.map((f, i) => (
          <li key={i} className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
            <Image src="/profile.jpg" width={32} height={32} className="rounded-full" alt={f} />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
