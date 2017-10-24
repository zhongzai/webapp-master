// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'


//import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css';

//import style
import './assets/style/custom.css'
import './assets/fonts/icon.css'

import App from './App'
import router from './router.js'
import api from './service/api'
import localStore from './libs/localStorage'
import sessionStore from './libs/sessionStorage'

Vue.prototype.$api = api;
Vue.prototype.$user = {};
Vue.prototype.$localstore = localStore;
Vue.prototype.$sessionstore = sessionStore;


//mint ui
import MintUI  from 'mint-ui';
Vue.use(MintUI)

//end

import Vuex from 'vuex';
Vue.use(Vuex)
// load vuex i18n module
import vuexI18n from 'vuex-i18n';
const store = new Vuex.Store();
Vue.use(vuexI18n.plugin, store);

// add translations directly to the application
import EN from './i18n/en.json'
import CN from './i18n/zh-cn.json'
Vue.i18n.add('en', EN);
Vue.i18n.add('cn', CN);
// set the start locale to use
Vue.i18n.set('cn');


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  try {

    var user = {};

    if (to.path != "/") {

      var str = Vue.prototype.$sessionstore.get('user');
      console.log(str)
      if (!str) {
        throw 'please login first';
      }
      user = JSON.parse(str);
      // if ((!user || !user.role)) {
      if ((!user)) {
        throw 'please login first';
      }
      Vue.prototype.$user = user;
      next();
    }
    else {
      Vue.prototype.$user = user;
      next();
    }
  } catch (e) {
    console.log(e);
    next({path: '/', replace: true, query: {code: -1}});
  }

});


function SetTitle(title) {
  document.title = title;
  var mobile = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(mobile)) {
    var iframe = document.createElement('iframe');
    iframe.style.visibility = 'hidden';
    iframe.setAttribute('src', 'favicon.ico');
    var iframeCallback = function () {
      setTimeout(function () {
        iframe.removeEventListener('load', iframeCallback);
        document.body.removeChild(iframe);
      }, 0);
    };
    iframe.addEventListener('load', iframeCallback);
    document.body.appendChild(iframe);
  }
}
Vue.prototype.$setTitle = SetTitle;
//Vue.use(MintUI)
/* eslint-disable no-new */

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
