import Image from "next/image";

function FacebookLoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center">
        {/* Logo Image */}
        <div className="w-24 h-24 flex items-center justify-center rounded-full animate-pulse">
          <Image
            src="/favicon.ico"  
            alt="Facebook Logo"
            width={60}
            height={60}
          />
        </div>

        {/* Optional loading text */}
        <p className="mt-4 text-gray-500 text-lg">Loading...</p>
      </div>
    </div>
  );
}

export default FacebookLoadingPage;
