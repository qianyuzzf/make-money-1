import {createApp} from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

const app = createApp(App);
app.use(store).use(router);
app.mount('#app');


window.onload = function () {
  setTimeout(() => {
    window.scroll(0, 100);
  }, 0);
};

if (document.documentElement.clientWidth > 500) {
  window.alert('使用手机浏览效果更佳');
  const img = document.createElement('img');
  img.src = '/qrcode.png';
  img.style.position = 'fixed';
  img.style.left = '50%';
  img.style.top = '50%';
  img.style.transform = 'translate(-50%,-50%)';
  img.style.boxShadow = '0 0 5px rgba(0,0,0,0.8)';
  document.body.appendChild(img);
}