const mongoose = require('mongoose');
require('mongoose-type-url');

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

  username: {
    type: String,
    required: [true, 'Please provide the username'],
    unique: true,
    lowercase: true,
    minlength: [2, 'username should be of at least 2 characters!'],
    maxlength: [17, 'username should not have more than 17 characters!'],
  },

  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: 'user must be among following, male, female or other!',
    },
  },

  headline: {
    type: String,
    maxlength: [18, 'headline should not be greater than 18 characters!'],
  },

  bio: {
    type: String,
    maxlength: [400, 'bio should not be grater than 150 characters!'],
    trim: true,
  },

  profilePic: {
    type: String,
    default: 'default.jpeg',
  },

  coverPic: {
    type: String,
    default: 'defaultbg.jpeg',
  },

  socialLinks: [
    {
      type: mongoose.SchemaTypes.Url,
    },
  ],

  location: {
    type: String,
    maxlength: [25, 'location should not be greater than 25 characters!'],
    minLength: [1, 'location must be at least of 1 character!'],
    trim: true,
  },

  skills: [
    {
      type: String,
      trim: true,
    },
  ],

  password: {
    type: String,
    required: [true, 'user must provide password!'],
    minlength: [8, 'Passowrd must be of at least 8 characters'],
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, 'user must provide confirm password field!'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'passwords are not the same!',
    },
    select: false,
  },

  passwordChangedAt: {
    type: Date,
    default: Date.now(),
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

//Creating Model fro UserSchema
const Users = mongoose.model('usex', UserSchema);
module.exports = Users;
