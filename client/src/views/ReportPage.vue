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
    <ActionButton @clickBtn="goHome">Back to Home</ActionButton>
  </div>
</template>

<script>
import ActionButton from "../components/ActionButton";
import {
  fetchReportData,
  getCachedReportData,
  cacheReportData,
} from "../utils/reportUtils";

export default {
  name: "ReportPage",
  components: { ActionButton },
  data() {
    return {
      totalUsers: 0,
      scrollPercentage: 0,
    };
  },
  methods: {
    async loadReportData() {
      try {
        const cachedReport = getCachedReportData();
        if (cachedReport) {
          this.totalUsers = cachedReport.totalUsers;
          this.scrollPercentage = cachedReport.scrollPercentage;
        } else {
          const data = await fetchReportData();
          this.totalUsers = data.totalUsers;
          this.scrollPercentage = data.scrollPercentage;
          cacheReportData(data);
        }
      } catch (error) {
        console.error("Error loading report data:", error);
      }
    },
    goHome() {
      this.$router.push("/");
    },
  },
  mounted() {
    this.loadReportData();
  },
};
