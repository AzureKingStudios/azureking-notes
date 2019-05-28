const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    userName: {
        unique: true,
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
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
    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    // console.log('first',user)
    // console.log('password', password)

    if(!user) {
        throw new Error('Unable to login');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log('ismatch', isMatch)
    
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
})

const User = mongoose.model('User', userSchema);

module.exports = User;