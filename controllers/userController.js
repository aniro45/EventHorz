const request = require('../app');
const Users = require('./../models/userModel');

//! Get All Users from the Database
exports.getAllUsers = async (req, res) => {
  //   console.log(req.body.user);
  try {
    console.log('getAllusers function has initiated!');

    // Build Query
    // 1) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => {
      delete queryObj[el];
    });

    // 2) Advanced Filtering
    console.log(req.query);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    //Different Block
    let query = Users.find(JSON.parse(queryStr));

    // 3) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    //Field Limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(10);

    if (req.query.page) {
      const numusers = await Users.countDocuments();
      if (skip >= numTours) throw new Error('This Page does not exists!');
    }

    // Execute Query
    const data = await query;
    //query.sort().select().skip().limit()       --Final 'query' After all the Filtering, how it would look

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
