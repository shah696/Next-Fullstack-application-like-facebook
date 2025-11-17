"use client";
import React from "react";

interface ProfilePostsProps {
  userId: string | null;
}

export default function ProfilePosts({ userId }: ProfilePostsProps) {
  // dummy posts; real app me API call
  const posts = [1, 2, 3];

  return (
    <div className="space-y-4">
      {posts.map((p) => (
        <div key={p} className="bg-white shadow rounded-lg p-4">
          <p>Post #{p} for user id: {userId}</p>
        </div>
      ))}
    </div>
  );
}
