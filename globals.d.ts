// types/globals.d.ts

import { Mongoose } from 'mongoose';

// Mongoose cache structure ko define karte hain
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Global object mein mongoose property ko extend karte hain
declare global {
  var mongoose: MongooseCache;
}

// Ye line is file ko module banaati hai, zaruri hai.
export {};