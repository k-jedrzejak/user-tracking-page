import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ReportPage from '../views/ReportPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { title: 'UTP - Home' }
  },
  {
    path: '/report',
    name: 'Report',
    component: ReportPage,
    meta: { title: 'UTP - Report' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
