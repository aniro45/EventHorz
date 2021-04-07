const request = require('../app');
const Users = require('./../models/userModel');
const APIFeatures = require('./../utils/apiFeatures');

//! Get All Users from the Database from shubham
exports.getAllUsers = async (req, res) => {
  //   console.log(req.body.user);
  try {
    console.log('getAllusers function has initiated!');
    // Execute Query
    const features = new APIFeatures(Users.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const data = await features.query;

    //Send Response
    res.status(200).json({
      Status: 'Successfull',
      results: data.length,
      requestAt: req.requestTime,
      data: {
        data: data,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      Message: err,
    });
  }
};

//! Create New User in the Database
exports.createNewUser = async (req, res) => {
  try {
    console.log('createNewUser function has initiated!');
    const newUser = await Users.create(req.body);

    res.status(201).json({
      Status: 'Successfull',
      requestAt: req.requestTime,
      data: {
        data: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      Message: err,
    });
  }
};

//! Get only one User from the Database using ID
exports.getUser = async (req, res) => {
  try {
    console.log('getUserById funtion has initiated!');
    const user = await Users.findById(req.params.id);

    res.status(200).json({
      Status: 'Successfull',
      requestAt: req.requestTime,
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      Message: err,
    });
  }
};

//! Update User data from the Database using ID (PATCH)
exports.patchUserById = async (req, res) => {
  try {
    console.log('patchUserById function has initiated!');

    const patchedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
      returnOriginal: false,
      useFindAndModify: false,
      runValidators: true,
    });

    res.status(200).json({
      status: 'Updated Successfully',
      requestAt: req.requestTime,
      data: {
        updatedData: patchedUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      Message: err,
    });
  }
};

//! Delete a certain User from the Database using ID
exports.deleteUserById = async (req, res) => {
  try {
    console.log('deleteUserById function has initiated!');

    const deletedUser = await Users.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'Deleted Succesfully',
      requestAt: req.requestTime,
      data: {
        data: null,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      Message: err,
    });
  }
};
