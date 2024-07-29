const axios = require('axios');

async function fetchUserData() {
  try {
    const response = await axios.get(process.env.FAKE_USER_API);
    console.log("USER DATA", response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

module.exports = fetchUserData;