<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <button class="btn btn-primary" @click="handleClick">
    <slot>Default Text</slot>
  </button>
</template>

<script>
export default {
  name: "ActionButton",
  emits: ["click-btn"],
  methods: {
    handleClick() {
      this.$emit("click-btn");
    },
  },
};
</script>
