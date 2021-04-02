const Users = require('./../models/userModel');

//! Get All Users from the Database
exports.getAllUsers = async (req, res) => {
  //   console.log(req.body.user);
  console.log('getAllusers function has initiated!');

  const data = await Users.find();
  res.status(200).json({
    Status: 'Successfull',
    results: data.length,
    requestAt: req.requestTime,
    data: {
      data: data,
    },
  });
};

//! Create New User in the Database
exports.createNewUser = async (req, res) => {
  console.log('createNewUser function has initiated!');
  const newUser = await Users.create(req.body);

  res.status(201).json({
    Status: 'Successfull',
    requestAt: req.requestTime,
    data: {
      data: newUser,
    },
  });
};

//! Get only one User from the Database using ID
exports.getUser = async (req, res) => {
  console.log('getUserById funtion has initiated!');
  const user = await Users.findById(req.params.id);

  res.status(200).json({
    Status: 'Successfull',
    requestAt: req.requestTime,
    data: {
      user: user,
    },
  });
};

//! Update User data from the Database using ID (PATCH)
exports.patchUserById = async (req, res) => {
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
};

//! Delete a certain User from the Database using ID
exports.deleteUserById = async (req, res) => {
  console.log('deleteUserById function has initiated!');

  const deletedUser = await Users.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'Deleted Succesfully',
    requestAt: req.requestTime,
    data: {
      data: null,
    },
  });
};
