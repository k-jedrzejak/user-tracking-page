<template>
  <button @click="handleClick">
    <slot>Default Text</slot>
  </button>
</template>

<script>
export default {
  name: "ActionButton",
  methods: {
    handleClick() {
      this.$emit("clickBtn");
    },
  },
};
</script>
