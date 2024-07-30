<template>
  <div>
    <img :src="user.avatar" alt="User Avatar" class="avatar" />
  </div>
</template>

<script>
export default {
  name: "UserAvatar",
  props: {
    user: {
      type: Object,
      required: true,
    },
    onAvatarVisible: {
      type: Function,
      required: true,
    },
  },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      this.onAvatarVisible(entries);
    });
    observer.observe(this.$el);
  },
};
</script>

<style>
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
</style>
