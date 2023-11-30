const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    // User's name, a required field with an error message if missing.
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    // User's email, a required field with a unique constraint and email format validation.
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        // Email format validation using a regular expression.
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
    },
    // User's role, which must be either 'user' or 'publisher' with a default value of 'user'.
    role: {
        type: String,
        enum: ['user', 'publisher'],
        default: 'user',
    },
    // User's password, a required field with a minimum length of 6 characters. It's not selected by default in queries.
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 6,
        select: false,
    },
    // Application associated with the user, a required field.
    app: {
        type: String,
        required: true,
    },
    // Token for resetting the password.
    resetPasswordToken: String,
    // Expiration date for the reset password token.
    resetPasswordExpire: Date,
    // Creation date of the user, with a default value of the current date and time.
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
});

// encrypt `password` field using bcrypt
// this is a middleware
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//get jwt(that contains user id and signs it with the JWT_SECRET secret key) and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

//match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
    //generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //hash that token and set to resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // set expire to that hashed token
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    // return the un-hashed token to user
    return resetToken;
};

module.exports = mongoose.model('Users', UserSchema);
