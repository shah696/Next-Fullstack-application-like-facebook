import mongoose, { Schema, Document, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';

// --- 1. Custom User Document Interface ---
// Saari nayi fields ko interface mein add kiya gaya
export interface IUser extends Document {
  name: string; // Nayi field
  DOB: Date; // Nayi field (Date type)
  gender: 'Male' | 'Female' | 'Custom'; // Nayi field (Enum/String type)
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  // Custom method signature pehle jaisa hi rahega
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// --- 2. Schema Definition ---
const UserSchema: Schema<IUser> = new Schema(
  {
    // Nayi fields add kiye gaye hain
    name: { type: String, required: true },
    DOB: { type: Date, required: true }, // Date of Birth ke liye Date type
    gender: { 
      type: String, 
      enum: ['Male', 'Female', 'Custom'], // Yeh ensure karta hai ki value in teen mein se hi koi ho
      required: true 
    },
    
    // Purani fields
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

// --- 3. Pre-save Hook (Password Hashing) ---
// Is mein koi change nahi aayega, yeh 'password' field ko hash karta rahega
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- 4. Custom Method (Password Comparison) ---
// Is mein bhi koi change nahi aayega
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// --- 5. Model Export ---
const User = (models.User || model<IUser>('User', UserSchema));
export default User;