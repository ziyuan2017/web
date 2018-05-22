import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/pages/pos'

import axios from 'axios'
Vue.prototype.$axios = axios
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pos',
      component: Pos
    }
  ]
})
