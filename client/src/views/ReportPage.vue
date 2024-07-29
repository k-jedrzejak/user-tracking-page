<template>
  <div>
    <h1>Access Report</h1>
    <table>
      <tr>
        <th>Total Users</th>
        <th>Scrolled to Image (%)</th>
      </tr>
      <tr>
        <td>{{ totalUsers }}</td>
        <td>{{ scrollPercentage.toFixed(2) }}%</td>
      </tr>
    </table>
    <button @click="goHome">Back to Home</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalUsers: 0,
      scrollPercentage: 0,
    };
  },
  methods: {
    async fetchReportData() {
      try {
        const response = await fetch("/api/report");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        this.totalUsers = data.totalUsers;
        this.scrollPercentage = data.scrollPercentage;
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    },
    goHome() {
      this.$router.push("/");
    },
  },
  mounted() {
    this.fetchReportData();
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: center;
}

button {
  margin-top: 20px;
}
</style>
