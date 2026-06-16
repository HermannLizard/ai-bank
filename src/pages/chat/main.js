import Vue from 'vue'
import App from './App.vue'
import { Icon, Button, Popup, Loading, Picker } from 'vant'

Vue.use(Icon)
Vue.use(Button)
Vue.use(Popup)
Vue.use(Loading)
Vue.use(Picker)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
