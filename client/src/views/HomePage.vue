<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-8 mx-auto d-flex justify-content-between my-4">
        <h1>User Tracking Page</h1>
        <ActionButton @clickBtn="viewReport">View Report</ActionButton>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-8 mx-auto border-start">
        <template v-for="i in totalParagraphs" :key="i">
          <WebParagraph :index="i" class="mb-4" />
          <div v-if="i === avatarIndex" class="avatar-container text-center">
            <div v-if="loading">Loading avatar...</div>
            <UserAvatar
              v-else
              :user="user"
              :onAvatarVisible="logAvatarScroll"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import WebParagraph from "../components/WebParagraph.vue";
import ActionButton from "../components/ActionButton.vue";
import { fetchUser, logAvatarScroll } from "../utils/userUtils";
import { totalParagraphs, avatarIndex } from "../config/config";
import UserAvatar from "../components/UserAvatar.vue";

export default {
  components: {
    WebParagraph,
    ActionButton,
    UserAvatar,
  },
  data() {
    return {
      user: {},
      loading: true,
      totalParagraphs,
      avatarIndex,
    };
  },
  async created() {
    await this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      this.loading = true;
      try {
        this.user = await fetchUser();
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        this.loading = false;
      }
    },
    viewReport() {
      this.$router.push("/report");
    },
    logAvatarScroll(entries) {
      logAvatarScroll(entries, this.user);
    },
  },
};
</script>
