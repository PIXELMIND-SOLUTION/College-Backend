// import mongoose from 'mongoose';

// const { Schema } = mongoose;


// // User Schema without required and trim
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     // Removed 'required' and 'trim'
//   },
//   email: {
//     type: String,
//     lowercase: true,
//   },
//   mobile: {
//     type: String,
//   },
//   otp: {
//     type: String,
//   },
//   password: {
//   type: String,
// },
// confirmPassword: {
//   type: String,
// },
// aadhaarCardNumber: {
//   type: String,
//   unique: true
// },
//  // ✅ Delete account fields
//   deleteToken: {
//     type: String,
//   },
//   deleteTokenExpiration: {
//     type: Date,
//   },
//   forms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }],
// }, {
//   timestamps: true  // CreatedAt and UpdatedAt fields automatically
// });

// // Create model based on schema
// const User = mongoose.model('User', userSchema);

// export default User;



import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
  },
  mobile: {
    type: String,
  },
  otp: {
    type: String,
  },
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
  aadhaarCardNumber: {
    type: String,
    // Remove unique: true from here to avoid duplicate index warning
  },
  deleteToken: {
    type: String,
  },
  deleteTokenExpiration: {
    type: Date,
  },
  forms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }],
}, {
  timestamps: true
});

userSchema.index({ email: 1 });
userSchema.index({ aadhaarCardNumber: 1 }, { unique: true, sparse: true });
userSchema.index({ mobile: 1 });

const User = mongoose.model('User', userSchema);
export default User;

