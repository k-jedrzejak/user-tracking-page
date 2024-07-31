export async function fetchUser() {
  let user = {};
  try {
    const cachedUser = sessionStorage.getItem("user");
    if (cachedUser) {
      user = JSON.parse(cachedUser);
    } else {
      const response = await fetch(`/api/users`, {
        method: 'GET',
        credentials: 'include'
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired');
        }
        throw new Error("Network response was not ok");
      }
      const fetchedUser = await response.json();
      user = fetchedUser;
      sessionStorage.setItem("user", JSON.stringify(fetchedUser));
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
  return user;
}


export function logAvatarScroll(entries, user) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      fetch(`/api/scroll-avatar-event`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          firstName: user.first_name,
          lastName: user.last_name,
          event: "scrolled to avatar",
        })
      }).catch((error) => {
        console.error("Error sending scroll event:", error);
      });
    }
  });
}
