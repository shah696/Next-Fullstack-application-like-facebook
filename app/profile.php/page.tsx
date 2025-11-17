"use client";

import FriendsList from "@/public/components/profile/ProfileFriendLists";
import ProfileHeader from "@/public/components/profile/ProfileHeader";
import ProfilePosts from "@/public/components/profile/ProfilePosts";
import { useSearchParams } from "next/navigation";

export default function ProfilePage() {
  const params = useSearchParams();
  const userId = params.get("id");

  // dummy data, real app me backend fetch karo
  const username = "Shah Hussain";
  const profilePic = "/profile.jpg";
  const coverPic = "/cover.jpg";
  const friends = ["Ali", "Musa", "John", "Ahmed", "Zara"];

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row gap-6">
      
      {/* Left column: profile & friends */}
      <div className="md:w-1/3">
        <ProfileHeader username={username} profilePic={profilePic} coverPic={coverPic} />
        <FriendsList friends={friends} />
      </div>

      {/* Right column: posts */}
      <div className="md:w-2/3">
        <ProfilePosts userId={userId} />
      </div>

    </div>
  );
}
