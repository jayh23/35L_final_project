import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    friends: {
        type: [String],
    }
})

// static signup method
userSchema.statics.signup = async function(username, email, password) {

    // validation
    if (!username || !email || !password) {
        throw Error('All fields must be filled.');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid.');
    }
    /*
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough.');
    } 
    */

    const exists = await this.findOne({ username });
    if (exists) {
        throw Error('Username already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ username, email, password: hash }); // short for new this(...).save()

    return user;
}

const User = mongoose.model('User', userSchema);

export default User;