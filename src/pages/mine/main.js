import Vue from 'vue'
import App from './App.vue'
import { NavBar, Cell, CellGroup, Image as VanImage, Loading } from 'vant'

Vue.use(NavBar)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(VanImage)
Vue.use(Loading)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
