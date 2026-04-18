/**
 * models/Selection.js — Mongoose schema for PS selections
 *
 * Unique index on { email } ensures one selection per team leader.
 * This is the final safety net against race conditions at the DB layer.
 */
import mongoose from 'mongoose';

const SelectionSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        psId: {
            type: String,
            required: true,
            trim: true,
        },
        selectedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { collection: 'ps_selections' }
);

// One PS per team leader email — ultimate idempotency guarantee
SelectionSchema.index({ email: 1 }, { unique: true });

export default mongoose.models.Selection ||
    mongoose.model('Selection', SelectionSchema);
