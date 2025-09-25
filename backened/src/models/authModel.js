// const mongoose = require('mongoose');

// // create schema for authentication and model
// const authSchema = new mongoose.Schema({
//     fullName: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: [3, 'Username must be at least 3 characters long'],
//         maxlength: [50, 'Username must be at most 50 characters long'],
//         validate: {
//             validator: function(v) {
//                 return /^[a-zA-Z0-9_]+$/.test(v);
//             },
//             message: props => `${props.value} is not a valid username!`
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: [6, 'Password must be at least 6 characters long'],
//         maxlength: [100, 'Password must be at most 100 characters long'],
//         validate: {
//             validator: function(v) {
//                 return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(v);
//             },
//             message: props => `${props.value} is not a valid password!`
//         }
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         unique: true,
//         validate: {
//             validator: function(v) {
//                 return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
//             },
//             message: props => `${props.value} is not a valid email!`
//         }
//     },
//     date: { type: Date, default: Date.now },
//     role:{
//         type: String,
//         enum: ['user', 'admin', 'superadmin'],
//         default: 'user'
//     }
// });
// const Users = mongoose.model('Users', authSchema);
// module.exports = Users;


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, default: 'user' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
