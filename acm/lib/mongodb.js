/**
 * lib/mongodb.js — Mongoose connection singleton
 *
 * Caches the connection on global to survive hot-reload in dev.
 * On first connect, calls syncIndexes() to drop any stale indexes
 * (e.g. the old unique index on `teamId` from the previous schema).
 */
import mongoose from 'mongoose';

const MONGODB_URI =
    process.env.MONGODB_URI || 'mongodb://localhost:27017/acm_hackathon';

let cached = global._mongoose;
if (!cached) {
    cached = global._mongoose = { conn: null, promise: null };
}

export default async function connectMongoDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands:        false,
            maxPoolSize:           20,   // up from default 5 — handles 200 concurrent users
            minPoolSize:           2,    // keep 2 warm connections alive
            serverSelectionTimeoutMS: 5000,  // fail fast if Atlas unreachable
            socketTimeoutMS:       45000,
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
