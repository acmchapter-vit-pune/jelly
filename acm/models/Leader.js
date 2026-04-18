/**
 * models/Leader.js — Team leader credentials
 */
import mongoose from 'mongoose';

const LeaderSchema = new mongoose.Schema({
    teamName: { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Leader || mongoose.model('Leader', LeaderSchema);
