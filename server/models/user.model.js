import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    // resetPasswordToken: String, 
    // resetPasswordExpiresAt: Date,
    // verificationToken: String,
    // verificationTokenExpiresAt: Date,

    // the hashed comments are'nt needed now probably when updates are happening can now use password token and verification
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);