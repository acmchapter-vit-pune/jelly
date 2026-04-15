/**
 * models/AllowedLeader.js
 * Stores the whitelist of emails allowed to register as team leaders.
 */
import mongoose from 'mongoose';

const AllowedLeaderSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
}, { timestamps: true });

export default mongoose.models.AllowedLeader || mongoose.model('AllowedLeader', AllowedLeaderSchema);
