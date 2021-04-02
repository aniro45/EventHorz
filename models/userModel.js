const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, 'A user must have a a First Name!'],
    trim: true,
    minlength: [3, 'A First Name must have atleast 3 characters!'],
    maxlength: [30, 'A First Name must have atmost 30 character'],
  },

  lname: {
    type: String,
    required: [true, 'A user must have a last name'],
    trim: true,
    minlength: [3, 'A Last Name must have almost 3 charachters!'],
    maxlength: [30, 'A Last Name must have a atomst 30 charachters!'],
  },

  email: {
    type: String,
    required: [true, 'Please must provide your email'],
    unique: true,
    lowercase: true,
    // validate: ['Please provide a valid email'],
  },

  mobile: {
    type: Number,
    unique: true,
    maxlength: [10, 'mobile Number must be of 10 digit only'],
    minength: [10, 'mobile Number must be of 10 digit only'],
  },

  dateOfBirth: {
    type: Date,
    required: [true, 'Please Provide Date Of Birth'],
  },

  collegeName: {
    type: String,
    required: [true, 'Please Provide College Name'],
    trim: true,
  },

  role: {
    type: String,
    required: [true, 'Please Select the role'],
    enum: {
      values: ['student', 'teacher', 'college'],
      message: 'user must have role like student, teacher or College',
    },
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

//Creating Model fro UserSchema
const Users = mongoose.model('usex', UserSchema);
module.exports = Users;
