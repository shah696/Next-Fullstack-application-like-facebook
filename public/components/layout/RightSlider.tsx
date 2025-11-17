import React from "react";
import Image from "next/image";

export default function RightSlider() {
  return (
    <div className="space-y-6">

      {/* Sponsored */}
      <div>
        <h3 className="font-semibold text-gray-600 mb-2">Sponsored</h3>
        <div className="space-y-3">

          {[1,2].map((ad) => (
            <div key={ad} className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
              <div className="w-28 h-20 bg-gray-300 relative rounded-lg">
                <Image
                  src={`/ad${ad}.jpg`}
                  fill
                  className="object-cover rounded-lg"
                  alt="sponsored"
                />
              </div>
              <div>
                <p className="font-semibold">Ad Title {ad}</p>
                <span className="text-sm text-gray-500">website.com</span>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Birthdays */}
      <div>
        <h3 className="font-semibold text-gray-600 mb-2">Birthdays</h3>
        <p className="text-sm">
          🎂 <strong>Ali Khan</strong> has a birthday today.
        </p>
      </div>

      {/* Contacts */}
      <div>
        <h3 className="font-semibold text-gray-600 mb-2">Contacts</h3>
        <ul className="space-y-2">
          {["Ali", "Musa", "John", "Ahmed", "Zara"].map((name, index) => (
            <li
              key={index}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
            >
              <Image
                src="/profile.jpg"
                alt="contact"
                width={32}
                height={32}
                className="rounded-full"
              />
              {name}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
