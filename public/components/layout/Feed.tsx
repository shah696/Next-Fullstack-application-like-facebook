import React from "react";
import Image from "next/image";

export default function Feed() {
  return (
    <div className="max-w-full mx-auto">

      {/* Stories */}
      <div className="flex gap-3 overflow-x-auto pb-3">
        {[1,2,3,4,5].map((s) => (
          <div key={s} className="w-28 h-48 bg-gray-300 rounded-xl relative">
            {/* <Image
              src={`/story${s}.jpg`}
              alt="story"
              fill
              className="object-cover rounded-xl"
            /> */}
          </div>
        ))}
      </div>

      {/* Create Post */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Image
            src="/profile.jpg"
            width={40}
            height={40}
            className="rounded-full"
            alt="profile"
          />
          <input
            placeholder="What's on your mind?"
            className="flex-1 bg-gray-100 p-3 rounded-full outline-none"
          />
        </div>

        <hr className="my-3" />

        <div className="flex justify-evenly text-sm text-gray-600">
          <button className="hover:bg-gray-100 p-2 rounded-lg">Live Video</button>
          <button className="hover:bg-gray-100 p-2 rounded-lg">Photo/Video</button>
          <button className="hover:bg-gray-100 p-2 rounded-lg">Feeling/Activity</button>
        </div>
      </div>

      {/* Posts */}
      {[1, 2, 3].map((p) => (
        <div key={p} className="bg-white shadow rounded-lg p-4 mt-4">
          
          {/* Post Header */}
          <div className="flex items-center gap-3 mb-3">
            {/* <Image
              src="/profile.jpg"
              width={40}
              height={40}
              className="rounded-full"
              alt="profile"
            /> */}
            <div>
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-sm text-gray-500">2 hrs ago</span>
            </div>
          </div>

          {/* Caption */}
          <p className="mb-3">This is a sample Facebook-style post.</p>

          {/* Image */}
          <div className="w-full h-80 relative bg-gray-300 rounded-lg">
            {/* <Image
              src={`/post${p}.jpg`}
              alt="post"
              fill
              className="object-cover rounded-lg"
            /> */}
          </div>

          {/* Actions */}
          <div className="flex justify-between text-gray-600 text-sm mt-3 pt-2 border-t">
            <button className="hover:bg-gray-100 p-2 rounded-lg">👍 Like</button>
            <button className="hover:bg-gray-100 p-2 rounded-lg">💬 Comment</button>
            <button className="hover:bg-gray-100 p-2 rounded-lg">↗️ Share</button>
          </div>

        </div>
      ))}

    </div>
  );
}
