// models
const { body, validationResult } = require('express-validator');
const UserModel,
  { USER_TYPES } = require("../models/User.js");

export default {
  onGetAllUsers: async (req, res) => {
    try {
      const users = await UserModel.getUsers();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  onGetUserById: async (req, res) => {
    try {
      const user = await UserModel.getUserById(req.params.id);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      console.error("User controller | onGetUserById | Error: ", error);
      return res.status(500).json({ success: false, error: error });
    }
  },
  onCreateUser: async (req, res) => {
    try {
      const validation = makeValidation((types) => ({
        payload: req.body,
        checks: {
          firstname: { type: types.string },
          lastname: { type: types.string },
          type: { type: types.enum, options: { enum: USER_TYPES } },
        },
      }));
      if (!validation.success) return res.status(400).json(validation);

      const { firstname, lastname, type } = req.body;
      const user = await UserModel.createUser(firstname, lastname, type);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      console.error("User controller | onCreateUser | Error: ", error);
      return res.status(500).json({ success: false, error: error });
    }
  },
  onDeleteUserById: async (req, res) => {
    try {
      const user = await UserModel.deleteByUserById(req.params.id);
      return res.status(200).json({
        success: true,
        message: `Deleted a count of ${user.deletedCount} user.`,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
};
