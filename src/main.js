
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'

Vue.use(Quasar) 

Quasar.start(() => {
  
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App'))
  })
})
