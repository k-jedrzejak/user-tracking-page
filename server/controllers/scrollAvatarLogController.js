const AccessLog = require('../models/accessLog');

const handleScrollEvent = async (req, res) => {
  const { userId, firstName, lastName } = req.body;
  if (!userId || !firstName || !lastName) {
    return res.status(400).json({ message: 'UserId, firstName, and lastName are required' });
  }

  try {
    let accessLog = await AccessLog.findOne({ userId });

    if (!accessLog) {
      const newAccessLog = new AccessLog({
        userId,
        scrolledToImage: true,
        firstName,
        lastName
      });
      await newAccessLog.save();
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Error handling scroll event:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { handleScrollEvent };
