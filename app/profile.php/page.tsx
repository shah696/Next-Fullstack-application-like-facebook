"use client";

import ProfilePostUpoad from "@/public/components/profile/ProfilePostUpload";
import { useSearchParams } from "next/navigation";

export default function ProfilePage() {
  const params = useSearchParams();
  const userId = params.get("id");

  // dummy data, real app me backend fetch karo

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row gap-6">
      
      {/* Left column: profile & friends */}
     

      {/* Right column: posts */}
      <div className="md:w-2/3">
        <ProfilePostUpoad userId={userId} />
      </div>

    </div>
  );
}
