"use client";
import { useRouter } from "next/navigation";
import  { useState } from "react";

function CreateAccount() {
  // State variables for form fields
  const [firstName, setFirstName] = useState(""); // Variable name corrected
  const [lastName, setLastName] = useState(""); // Variable name corrected (secondtName -> lastName)
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState(""); // State for gender
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault(); 
    setLoading(true);
    setError(null);

    // API ke liye 'name' field banana zaroori ho sakta hai agar backend mein use ho raha hai
    // Ya phir backend mein firstName aur lastName alag se handle karein
    const name = `${firstName} ${lastName}`;

    const payload = {
        name, 
        email,
        password,
        DOB, 
        gender,
    };
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Sahi state variables API ko bhej rahe hain
        body: JSON.stringify( payload ),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Success
        console.log('Registration Successful:', data.message);
        router.push('/'); 
        
      } else {
        // ❌ Error
        setError(data.error || 'Registration failed. Please check your details.');
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      // setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-8">
      <h1 className=" text-6xl text-center py-8 text-blue-600 font-bold">
        facebook
      </h1>
      <div className=" flex items-center justify-center ">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-[#000000] ">
            Create a new account
          </h1>
          <p className="text-center text-gray-600 mb-6">It’s quick and easy.</p>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Name fields (FIXED onChange) */}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} // <--- FIX: setFirstName use kiya
                className="w-1/2 p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-400 focus:ring-0"
                required
              />
              <input
                type="text"
                placeholder="Last name"
                value={lastName} // State variable updated: secondtName -> lastName
                onChange={(e) => setLastName(e.target.value)} // <--- FIX: setLastName use kiya
                className="w-1/2 p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-400 focus:ring-0"
                required
              />
            </div>

            {/* Date of birth (FIXED onChange) */}
            <div>
              <label className="text-sm text-gray-600">Date of birth</label>
              <input
                type="date"
                value={DOB}
                onChange={(e) => setDOB(e.target.value)} // <--- FIX: setDOB use kiya
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-400 focus:ring-0"
                required
              />
              
            </div>

            {/* Gender (FIXED: Added onChange to setGender) */}
            <div>
              <label className="text-sm text-gray-600">Gender</label>
              <div className="flex gap-4 mt-1" onChange={(e:any) => setGender(e.target.value)}> 
                
                {/* Isko select karne par setGender call hoga */}
                <label className={`flex items-center gap-2 border p-2 rounded-lg cursor-pointer w-1/3 justify-center ${gender === 'Male' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                  <input type="radio" name="gender" value="Male" checked={gender === 'Male'} readOnly required />
                  Male
                </label>
                <label className={`flex items-center gap-2 border p-2 rounded-lg cursor-pointer w-1/3 justify-center ${gender === 'Female' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                  <input type="radio" name="gender" value="Female" checked={gender === 'Female'} readOnly required />
                  Female
                </label>
                <label className={`flex  items-center gap-2 border p-2 rounded-lg cursor-pointer w-1/3 justify-center ${gender === 'Custom' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                  <input type="radio" name="gender" value="Custom" checked={gender === 'Custom'} readOnly required />
                  Custom
                </label>
              </div>
            </div>

            {/* Email (FIXED onChange) */}
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // <--- FIX: setEmail use kiya
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-400 focus:ring-0"
              required
            />

            {/* Password (FIXED onChange) */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // <--- FIX: setPassword use kiya
              placeholder="New password"
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-400 focus:ring-0"
              required
            />

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading} // Loading state mein button disable
              className={`w-full bg-green-600 text-white font-semibold p-3 rounded-lg mt-4 transition-colors ${loading ? 'bg-green-400 cursor-not-allowed' : 'hover:bg-green-700 cursor-pointer'}`}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;