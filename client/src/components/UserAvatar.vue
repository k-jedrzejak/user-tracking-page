<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
    <img v-if="user.avatar" :src="user.avatar" alt="User Avatar" />
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
