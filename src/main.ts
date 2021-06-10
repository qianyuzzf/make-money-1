import {createApp} from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');

if (document.documentElement.clientWidth > 500) {
  window.alert('使用手机浏览效果更佳');
}

window.onload = function () {
  setTimeout(() => {
    window.scroll(0, 0);
  }, 0);
};