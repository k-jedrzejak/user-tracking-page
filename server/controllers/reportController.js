const User = require('../models/user');
const AccessLog = require('../models/accessLog');

const generateReport = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const scrolledUsers = await AccessLog.countDocuments({ scrolledToImage: true });

    let scrollPercentage = 0;
    if (totalUsers > 0) {
      scrollPercentage = (scrolledUsers / totalUsers) * 100;
    }

    res.json({ totalUsers, scrollPercentage });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { generateReport };
