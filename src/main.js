import Vue from 'vue'
import App from './App.vue'
import main from './scss/main.scss'
import router from './router'

Vue.config.productionTip = false

/**BOOTSTRAP */

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/**FIREBASE */
import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

/**NOTIFICACIONES */
import Notifications from 'vue-notification'
Vue.use(Notifications)

/**AUTENTICACION  */
import * as firebase from 'firebase/app';
import 'firebase/auth';
Vue.component(firebase);

import Firebase from './components/db.js'

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Firebase.auth.currentUser) {
      next('/')
      
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

new Vue({
  router,
  main,
  render: h => h(App)
}).$mount('#app')
