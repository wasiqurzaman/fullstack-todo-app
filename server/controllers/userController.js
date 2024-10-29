import User from "../models/user.js";

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
    const username = req.params?.username;
    if (!username) return res.status(400).json({ "message": "username is required." });
    const user = await User.findOne({ username: username }).exec();
    if (!user) {
      return res.status(204).json({ "message": `No user with ${username} is found.` })
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

    const user = await User.create({
      username,
      email,
      password,
      createdAt: new Date()
    });

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ "message": "Something went wrong. User can not be created.", "error": `${err.message}` })
  }
}

const updateUser = async (req, res) => {
  try {
    const username = req.params?.username;
    const { password, email } = req.body;
    if (!password && !email) return res.status(400).json({ "message": "password or email required." });

    const user = await User.findOne({ username: username }).exec();

    if (!user) return res.json(204).json({ "message": `User with ${username} not found.` });

    if (req.body?.password) user.password = req.body.password;
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
    const username = req.params?.username;
    if (!username) return res.status(400).json({ "message": "username parameter is requires." })
    const user = await User.findOne({ username: username }).exec();
    if (!user) return res.json(204).json({ "message": `User with ${username} not found.` });

    const deletedUser = await user.deleteOne({ username });
    res.json(deleteUser);

  } catch (err) {
    console.log(err);
    res.status(500).json({ "message": `${err.message}` });
  }
}


export { getAllUser, getUser, createNewUser, updateUser, deleteUser };