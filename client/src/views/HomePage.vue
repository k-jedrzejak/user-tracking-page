<!-- src/App.vue -->
<template>
  <div id="home">
    <h1>Webpage with 20 Paragraphs</h1>

    <button @click="viewReport">View Report</button>
    <div id="user-info">
      <p>First Name: {{ user.first_name }}</p>
      <p>Last Name: {{ user.last_name }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
    <div v-for="i in 20" :key="i">
      <p>
        Paragraph {{ i }}: Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Nullam vehicula urna ac purus tristique, eu cursus ex lacinia.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
        cubilia curae; Suspendisse potenti. Sed sit amet volutpat eros. Aliquam
        erat volutpat. Integer nec turpis nec lacus efficitur bibendum in nec
        arcu. Phasellus ut sapien ut est feugiat viverra. Integer vehicula
        sapien ut lacus ultrices feugiat. Donec feugiat consequat tortor, a
        volutpat est ultricies ut. Nullam ullamcorper nulla ac mi ultrices, nec
        facilisis odio efficitur. Sed eu eros a justo facilisis malesuada. Cras
        non suscipit sapien. Fusce eget nunc a magna aliquam laoreet. Curabitur
        gravida nec leo et fermentum. Phasellus vestibulum tincidunt nulla ac
        tincidunt.
      </p>
      <div v-if="i === 10" class="avatar-container">
        <img :src="user.avatar" alt="User Avatar" class="avatar" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async fetchUser() {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        this.user = await response.json();
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    viewReport() {
      this.$router.push("/report");
    },
    observeAvatar() {
      const avatar = document.querySelector(".avatar");
      if (avatar) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Upewnij się, że user._id, user.first_name i user.last_name są dostępne
              if (
                this.user._id &&
                this.user.first_name &&
                this.user.last_name
              ) {
                fetch("/api/scroll-event", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    userId: this.user._id,
                    firstName: this.user.first_name,
                    lastName: this.user.last_name,
                    event: "scrolled to avatar",
                  }),
                }).catch((error) => {
                  console.error("Error sending scroll event:", error);
                });
              } else {
                console.error("User information is incomplete");
              }
            }
          });
        });
        observer.observe(avatar);
      }
    },
  },
  mounted() {
    this.fetchUser();
    this.$nextTick(() => {
      this.observeAvatar();
    });
  },
};
</script>

<style>
.avatar-container {
  text-align: center;
  margin: 20px 0;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
</style>
