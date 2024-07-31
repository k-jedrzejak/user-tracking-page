<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <table class="table table-bordered mx-auto">
    <thead>
      <tr>
        <th scope="col">Total Users</th>
        <th scope="col">Scrolled to Avatar (%)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td scope="row">{{ totalUsers }}</td>
        <td scope="row">{{ scrollPercentage.toFixed(2) }}%</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "ReportTable",
  props: {
    totalUsers: {
      type: Number,
      required: true,
    },
    scrollPercentage: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
table {
  width: 90%;
}
</style>
