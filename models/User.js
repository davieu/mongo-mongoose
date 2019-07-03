const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, lowercase: true, unique: true, required: true },
  firstname: { type: String, lowercase: true, required: true },
  lastname: { type: String, lowercase:true, required: true},
  phone: { type: String, default: null },
  dateJoin: { type: Date, default: Date.now }, 
  lastActive: { type: Date, default: Date.now},
  roles: { type: String, default: 'user' }
})

const User = mongoose.model('User', UserSchema, 'users')

module.exports = User;