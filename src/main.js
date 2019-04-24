import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import nui from './'

Vue.config.productionTip = false

Vue.use(nui)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
