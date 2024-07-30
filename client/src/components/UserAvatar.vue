<template>
  <div>
    <img :src="user.avatar" alt="User Avatar" v-if="user.avatar" />
    <div v-else>Avatar not available</div>
  </div>
</template>

<script>
export default {
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
  data() {
    return {
      hasLoggedScrollEvent: false,
    };
  },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.hasLoggedScrollEvent) {
        this.hasLoggedScrollEvent = true;
        this.onAvatarVisible(entries);
      }
    });
    observer.observe(this.$el);
  },
};
</script>
