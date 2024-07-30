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
            <Suspense>
              <template #default>
                <UserAvatarAsync
                  :user="user"
                  :onAvatarVisible="logAvatarScroll"
                />
              </template>
              <template #fallback>
                <div>Loading avatar...</div>
              </template>
            </Suspense>
            <UserAvatar :user="user" :onAvatarVisible="logAvatarScroll" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import WebParagraph from "../components/WebParagraph.vue";
import ActionButton from "../components/ActionButton.vue";
import { fetchUser, logAvatarScroll } from "../utils/userUtils";
import { totalParagraphs, avatarIndex } from "../config/config"; // Import variables from config file

// Asynchronously import UserAvatar component
const UserAvatarAsync = defineAsyncComponent(() =>
  import("../components/UserAvatar.vue")
);

export default {
  components: {
    UserAvatarAsync,
    WebParagraph,
    ActionButton,
  },
  data() {
    return {
      user: this.loadUserFromSession(),
      totalParagraphs,
      avatarIndex,
    };
  },
  methods: {
    loadUserFromSession() {
      const cachedUser = sessionStorage.getItem("user");
      return cachedUser ? JSON.parse(cachedUser) : {};
    },
    async fetchUserData() {
      if (Object.keys(this.user).length === 0) {
        this.user = await fetchUser();
      }
    },
    viewReport() {
      this.$router.push("/report");
    },
    logAvatarScroll(entries) {
      logAvatarScroll(entries, this.user);
    },
  },
  async created() {
    await this.fetchUserData();
  },
};
</script>
