"use client";
import React from "react";
import LeftSidebar from "../layout/LeftSlider";
import Feed from "../layout/Feed";
import RightSidebar from "../layout/RightSlider";
import Navbar from "../Navbar";

export default function HomePage() {
  return (
    <div className="flex bg-gray-100 h-screen overflow-hidden">
      <Navbar/>
      {/* LEFT */}
      <div className="hidden md:block w-1/4 p-4 mt-14 overflow-y-auto">
        <LeftSidebar />
      </div>

      {/* CENTER FEED */}
      <div className="flex-1 p-4 overflow-y-auto mt-14">
        <Feed />
      </div>

      {/* RIGHT */}
      <div className="hidden lg:block w-1/4 p-4 mt-14 overflow-y-auto">
        <RightSidebar/>
      </div>

    </div>
  );
}
