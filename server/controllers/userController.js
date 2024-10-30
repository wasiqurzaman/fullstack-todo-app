import User from "../models/user.js";
import bcrypt from "bcrypt";

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) return res.status(204).json({ "message": "No users found." });
    res.json(users);
  } catch (err) {
    res.status(500).json({ "message": `${err.message}` });
  }
}

const getUser = async (req, res) => {
  try {
    const id = req.params?.id;
    if (!id) return res.status(400).json({ "message": "id is required." });
    if (id !== req.user._id.toString()) return res.sendStatus(401);
    const user = await User.findOne({ _id: id }).exec();
    if (!user) {
      return res.status(400).json({ "message": `No user with id: ${id} is found.` })
    }
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ "message": `${err.message}` })
  }
}

const createNewUser = async (req, res) => {
  try {
    const { username, email, password } = req?.body;
    if (!username || !email || !password) return res.status(400).json({ "message": "username, email and password is required." })

    const foundUser = await User.findOne({ username });

    if (foundUser) return res.status(400).json({ "message": `username already exist. Try another username.` })

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ "message": "Something went wrong. User can not be created.", "error": `${err.message}` })
  }
}

const updateUser = async (req, res) => {
  try {
    const id = req.params?.id;
    const { password, email } = req.body;
    if (!password && !email) return res.status(400).json({ "message": "password or email required." });

    const user = await User.findOne({ _id: id, _id: req.user._id, username: req.user.username }).exec();

    if (!user) return res.status(400).json({ "message": `User with ${id} not found.` });

    if (req.body?.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.password = hashedPassword;
    }
    if (req.body?.email) user.email = req.body.email;

    const updatedUser = await user.save();
    res.json(updateUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ "message": `${err.message}` });
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = req.params?.id;
    if (!id) return res.status(400).json({ "message": "id parameter is requires." })
    const user = await User.findOne({ _id: id, _id: req.user._id, username: req.user.username }).exec();
    if (!user) return res.status(400).json({ "message": `User with ${id} not found.` });

    const deletedUser = await user.deleteOne({ _id: id });
    res.json(deleteUser);

  } catch (err) {
    console.log(err);
    res.status(500).json({ "message": `${err.message}` });
  }
}


export { getAllUser, getUser, createNewUser, updateUser, deleteUser };