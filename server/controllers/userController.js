const User = require('../models/user');

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUser };
