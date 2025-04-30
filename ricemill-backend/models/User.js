/*const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);*/







const mongoose = require('mongoose');

   const userSchema = new mongoose.Schema({
       firstName: {
           type: String,
           required: true
       },
       lastName: {
           type: String,
           required: false
       },
       phoneNumber: {
           type: String,
           required: true,
           unique: true
       },
       username: {
           type: String,
           required: true,
           unique: true
       },
       role: {
           type: String,
           required: true,
           enum: ['mill_owner', 'customer'] // Updated enum values
       },
       otp: {
           type: String
       },
       otpExpires: {
           /*type: Date*/
           type: Number 
       }
   });

   module.exports = mongoose.model('User', userSchema);