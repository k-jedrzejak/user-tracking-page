<template>
  <div id="home">
    <h1>Webpage with 20 Paragraphs</h1>

    <ActionButton @clickBtn="viewReport">View Report</ActionButton>
    <div v-for="i in 20" :key="i">
      <WebParagraph :index="i" />
      <div v-if="i === 10" class="avatar-container">
        <Suspense>
          <template #default>
            <UserAvatar :user="user" :onAvatarVisible="logAvatarScroll" />
          </template>
          <template #fallback>
            <div>Loading avatar...</div>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from "../components/UserAvatar.vue";
import WebParagraph from "../components/WebParagraph.vue";
import ActionButton from "../components/ActionButton.vue";
import { fetchUser, logAvatarScroll } from "../utils/userUtils";

export default {
  components: {
    UserAvatar,
    WebParagraph,
    ActionButton,
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async loadUser() {
      this.user = await fetchUser();
    },
    viewReport() {
      this.$router.push("/report");
    },
    logAvatarScroll(entries) {
      logAvatarScroll(entries, this.user);
    },
  },
  mounted() {
    this.loadUser();
  },
};
</script>
