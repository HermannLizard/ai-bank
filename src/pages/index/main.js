import Vue from 'vue'
import App from './App.vue'
import { Button, NavBar, Cell, CellGroup, Swipe, SwipeItem } from 'vant'

Vue.use(Button)
Vue.use(NavBar)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Swipe)
Vue.use(SwipeItem)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
