import Vue from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'
import store from './store/index'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'

new Vue({
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
