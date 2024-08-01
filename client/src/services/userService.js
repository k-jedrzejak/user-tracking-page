export async function fetchUser() {
  let user = {};
  try {
      const response = await fetch(`/api/users`, {
        method: 'GET',
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const fetchedUser = await response.json();
      user = fetchedUser;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
  return user;
}

