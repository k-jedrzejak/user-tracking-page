import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Default Title';
  next();
});

createApp(App)
.use(router)
.mount('#app')

