// const jwt = require('jsonwebtoken');
// const Users = require("../models/authModel");

// const signupController = async (req, res) => {
//     try {
//         const userData = req.body;
//         const newUser = new Users(userData);
//         const user = await newUser.save()
//         const requiredUserFields = {
//             email: user.email,
//             fullName: user.fullName,
//             role: user.role
//         }
//         const token = await jwt.sign(requiredUserFields, process.env.SECRET_KEY, { expiresIn: '1h' });
//         res.status(201).json({ status: "success", message: 'User created successfully', data: {...requiredUserFields,token} });
//     } catch (error) {
//         res.status(500).json({ status: "failed", message: 'Internal Server Error', error });
//     }
// }

// const loginController = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await Users.find({ email, password });

//         if (user.length > 0) {
            

//             const userResult = {
//                 email: user[0].email,
//                 fullName: user[0].fullName,
//                 role: user[0].role
//             }
//           const token = await jwt.sign(userResult, process.env.SECRET_KEY, { expiresIn: '1h' });

//             res.status(200).json({ status: "success", message: 'Login successful', data: {...userResult,token:token} });
//         } else {
//             res.status(401).json({ status: "failed", message: 'Invalid email or password' });
//         }
//     } catch (error) {
//         res.status(500).json({ status: "failed", message: 'Internal Server Error', error });
//     }
// }

// module.exports = {
//     signupController,
//     loginController
// }


const User = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already used' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ fullname, email, password: hashed, role: role || 'user' });

    res.status(201).json({ message: 'User created', user: { id: user._id, fullname: user.fullname, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '8h' });

    res.json({ user: { id: user._id, fullname: user.fullname, email: user.email, role: user.role }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
    signup,
    login
}