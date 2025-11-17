'use client';

// Zaroori Imports: 'useEffect' aur 'useSession' session check ke liye add kiye gaye hain
import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react"; 
import { useRouter } from "next/navigation";
import Home from "../public/components/home/Home";
import FacebookLoadingPage from "@/public/components/facebookLoadingPage";

export default function AuthPage() {
    const router = useRouter()
    // 💡 useSession hook se user ka login status pata karte hain
    // const { status } = useSession(); 

    const { data: session, status } = useSession();

console.log("Session Status:", status);
console.log("Session Data:", session);

    console.log(status)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    
    // State for loading and error handling
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 🛡️ CRITICAL LOGIC: Agar user already authenticated hai, toh turant root path '/' par redirect kar do.
    // useEffect(() => {
    //     // Status 'authenticated' aate hi user ko Home Page (/) par bhej dega
    //     if (status === "authenticated") {
    //         router.push("/"); 
    //     }
    // }, [status, router]); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                setError("Login failed. Check your email and password.");
                console.error("Login Error:", result.error);
            } else if (result?.ok) {
                // Login successful. Redirect to the root path '/'
                console.log("Login successful!");
                router.push("/"); // 🎯 Redirect to the root page '/'
            }

        } catch (err) {
            setError("An unexpected error occurred during login.");
            console.error("Catch Error:", err);
        } finally {
            setIsLoading(false);
        }
    };

   // 🔑 Conditional rendering based on authentication
  if (status === "loading") {
    return <FacebookLoadingPage/>;
  }

  if (status === "authenticated") {
    return <div>
      <Home/>
    </div>; // user authenticated hai to HomePage render karo
  }

    // ⭐ YEH HAI AAPKA ORIGINAL FACEBOOK UI KA CODE ⭐
    return (
        <div className="flex items-center justify-between px-42 h-screen bg-gray-100">
            <div className="flex flex-col gap-4 pb-[105px]">
                <h1 className="text-6xl text-blue-600 font-bold">facebook</h1>
                <p className="text-[24px] text-[#000000] font-[14px]">
                    Facebook helps you connect and share <br /> with the people in your
                    life.
                </p>
            </div>
            <div className="bg-white shadow-xl rounded-2xl p-4 w-[450px]">
                
                {/* Error Message Display */}
                {error && (
                    <div className="p-3 mb-3 bg-red-100 text-red-600 rounded-lg text-center">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        onChange={handleChange}
                        className="w-full p-3 mb-3 border border-gray-300 rounded-lg outline-none focus:border-blue-400 focus:ring-0"
                        value={formData.email}
                        required
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full p-3 mb-3 border border-gray-300 rounded-lg outline-none focus:border-blue-400 focus:ring-0"
                        value={formData.password}
                        required
                    />

                    <button
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-blue-300"
                        disabled={isLoading} 
                    >
                        {isLoading ? "Logging In..." : "Log In"}
                    </button>
                </form>

                <div className="flex items-center justify-center py-4">
                    <p className="cursor-pointer text-blue-600 hover:underline underline-offset-2">
                        Forget password?
                    </p>
                </div>

                <div className="mb-4 flex items-center">
                    <div className="flex-grow border-t border-gray-300" />
                    <div className="flex-grow border-t border-gray-300" />
                </div>

                <div className="flex items-center justify-center">
                    <button
                        onClick={()=>{router.push("/create-account")}}
                        className=" bg-green-500 cursor-pointer hover:bg-green-600 text-white p-3 rounded-lg gap-2 flex items-center font-semibold transition"
                    >
                        Create new account
                    </button>
                </div>

            </div>
        </div>
    );
}