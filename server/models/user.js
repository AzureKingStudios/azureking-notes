const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Note = require('./note');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, 
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

userSchema.index({ email: 1 }, { unique: true});

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET);
    //if the number of tokens is greater than 4 one is removed so that 5 is the max number of tokens
    if(user.tokens.length >= 5) {
        user.tokens.splice(0,1);
    }
    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});

    if(!user) {
        throw new Error('Unable to login');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if(!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

userSchema.pre('remove', async function(next) {
    const user = this;
    await Note.deleteMany({owner: user._id});
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;