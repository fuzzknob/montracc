import Vue from 'vue'
import Filters from '@/filters'
import Ant from '@/plugins/Ant'
import 'heyui/themes/index.less'
import '@/styles/main.sass'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(Ant)
Vue.use(Filters)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
