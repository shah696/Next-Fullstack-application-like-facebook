"use client";
import React, { useState, useRef } from "react";
import { FaCamera, FaTimes } from "react-icons/fa"; // Icons for Camera and Close button

interface ProfilePostsProps {
  userId: string | null;
}

export default function ProfilePostUpload({ userId }: ProfilePostsProps) {
  
  // State to hold the selected image file URL for preview
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  // State to track if the upload process is ongoing
  const [isUploading, setIsUploading] = useState(false); 
  
  // Ref to trigger the hidden file input field
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Function to handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
        // Create a temporary URL for image preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  // 2. Dummy function for the actual upload logic
  const handleImageUpload = async () => {
    if (!previewImage || !userId) {
        alert("Please select an image and ensure you are logged in.");
        return;
    }
    
    setIsUploading(true);
    // 💡 Real world mein: Yahan FormData use hoga aur API call hogi.
    // Example: await fetch('/api/upload-profile-pic', { method: 'POST', body: formData });
    
    console.log(`Uploading picture for user: ${userId}`);
    
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    
    setIsUploading(false);
    alert("Profile picture uploaded successfully! (Dummy)");
    
    // Clear the preview after successful upload (or refresh the page/user session)
    setPreviewImage(null); 
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear file input
    }
  };

  // 3. Function to remove the selected preview image
  const handleRemoveImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear file input
    }
  };

  return (
    <div className="p-5 bg-white shadow-md rounded-lg max-w-xl mx-auto mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
            Set Your Profile Picture
        </h2>

        {/* 1. Hidden File Input */}
        <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden" // Input ko chupa diya
            disabled={isUploading}
        />
        
        {/* 2. Image Preview Area */}
        <div className="relative flex items-center justify-center h-48 w-full border-2 border-dashed border-gray-300 rounded-lg overflow-hidden mb-4">
            
            {previewImage ? (
                // Image Preview
                <div className="relative w-full h-full">
                    <img
                        src={previewImage}
                        alt="Profile Preview"
                        className="object-cover w-full h-full"
                    />
                    
                    {/* Remove Image Button */}
                    <button
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg z-10"
                        disabled={isUploading}
                    >
                        <FaTimes className="h-4 w-4" />
                    </button>
                </div>
            ) : (
                // Clickable Placeholder for File Selection
                <div 
                    onClick={() => !isUploading && fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center p-4 text-gray-500 hover:text-blue-500 cursor-pointer transition"
                >
                    <FaCamera className="h-8 w-8 mb-2" />
                    <p className="text-sm font-medium">Click to select image</p>
                </div>
            )}
        </div>

        {/* 3. Upload Button */}
        <button
            onClick={handleImageUpload}
            className={`w-full py-2 rounded-lg font-semibold text-white transition ${
                previewImage && !isUploading 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!previewImage || isUploading} // Agar image select na ho ya upload ho raha ho toh disable
        >
            {isUploading ? 'Uploading...' : 'Upload Profile Picture'}
        </button>

    </div>
  );
}