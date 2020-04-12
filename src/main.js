import Vue from 'vue'
import HeyUI from 'heyui'
import 'heyui/themes/index.less'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(HeyUI)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
