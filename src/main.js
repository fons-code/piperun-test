
import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router/routes'


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,

  render: h => h(App),
});

