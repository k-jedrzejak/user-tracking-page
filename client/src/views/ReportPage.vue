<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-8 mx-auto d-flex justify-content-between my-4">
        <h1>Access Report</h1>
        <ActionButton @click-btn="goHome">Back to Home</ActionButton>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-8 mx-auto border-start">
        <div v-if="isDataLoaded">
          <ReportTable
            :total-users="totalUsers"
            :scroll-percentage="scrollPercentage"
          />
        </div>
        <div v-else>Generate Report...</div>
      </div>
    </div>
  </div>
</template>

<script>
import ActionButton from "../components/ActionButton";
import { defineAsyncComponent } from "vue";
import { fetchReportData } from "../services/reportService";

const ReportTable = defineAsyncComponent(() =>
  import("../components/ReportTable")
);

export default {
  name: "ReportPage",
  components: { ActionButton, ReportTable },
  data() {
    return {
      totalUsers: null,
      scrollPercentage: null,
      isDataLoaded: false,
    };
  },
  created() {
    this.loadReportData();
  },
  methods: {
    async loadReportData() {
      try {
        const data = await fetchReportData();
        this.totalUsers = data.totalUsers;
        this.scrollPercentage = data.scrollPercentage;
        this.isDataLoaded = true;
      } catch (error) {
        console.error("Error loading report data:", error);
      }
    },
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
table {
  width: 90%;
}
</style>
