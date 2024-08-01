export function sendAvatarScrollEvent(entries, user) {
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
