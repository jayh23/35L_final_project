import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    avatar: {
        type: String,
    },
    friends: {
        type: [String],
    }
})

// Static signup method.
userSchema.statics.signup = async function(username, password) {
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

    // Encrypts the password.
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ username, password: hash }); // short for new this(...).save()

    return user;
}

// Static login method.
userSchema.statics.login = async function(username, password) {
    if (!username || !password) {
        throw Error('All fields must be filled.');
    }

    // Checks whether the username and password match.
    const user = await this.findOne({ username });
    const match = user ? await bcrypt.compare(password, user.password) : false;
    if (!user || !match) {
        throw Error('Incorrect username or password.');
    }

    return user;
}

const User = mongoose.model('User', userSchema);

export default User;