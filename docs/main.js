import Vue from 'vue'
import App from './App.vue'
import router from './router'
import nui from '../src'

Vue.config.productionTip = false

Vue.use(nui)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
