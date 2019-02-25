// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from 'src/router';
import store from 'src/store';
import Vuex from 'vuex';
import echarts from 'echarts';
import resMessage from 'src/utils/resMessage';
import http from 'src/axios/http';
import 'src/axios/interceptor';

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.prototype.$resMessage=resMessage;
Vue.prototype.$http=http;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
});
