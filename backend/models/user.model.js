import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   username: String,
   password: String,
   avatar: String,
   friends: [String]
})

const User = mongoose.model('User', userSchema);

export default User;