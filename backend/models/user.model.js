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
    if (!username || !password) {
        throw Error('All fields must be filled.');
    }
    /*
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid.');
    }
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

// static login method
userSchema.statics.login = async function(username, password) {
    if (!username || !password) {
        throw Error('All fields must be filled.');
    }

    const user = await this.findOne({ username });
    if (!user) {
        throw Error('Incorrect username.');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Incorrect password.');
    }

    return user;
}

const User = mongoose.model('User', userSchema);

export default User;