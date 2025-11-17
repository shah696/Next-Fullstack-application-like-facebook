import dbConnect from '@/lib/mongodb';
import User from '@/app/models/User';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await dbConnect();
  try {
    // 1. User data destructuring
    const { name, DOB, gender, email, password } = await request.json();

    // 2. DOB validation
    const dobDate = new Date(DOB); 
    if (isNaN(dobDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid Date of Birth format.' },
        { status: 400 }
      );
    }

    // 3. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email address.' },
        { status: 400 }
      );
    }

    // 4. Create and save new user
    // Note: Aapko User model mein password ko hash (bcrypt) karna chahiye.
    const newUser = new User({ 
      name, 
      DOB: dobDate, 
      gender, 
      email, 
      password 
    });
    
    await newUser.save();

    // 5. Success Response: Ab yeh theek se return ho raha hai (201 Created)
    return NextResponse.json(
      { message: 'User registered successfully!', userId: newUser._id },
      { status: 201 }
    );

  } catch (error) {
    // 6. Error Handling: Agar koi database ya server side error ho.
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed due to a server error.' },
      { status: 500 }
    );
  }
}