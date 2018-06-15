// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import vueAxios from 'vue-axios'
import axios from 'axios'
import './app.css'
import 'element-ui/lib/theme-chalk/index.css'
import loadMore from './directives/index';
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(vueAxios, axios)

Vue.filter("stepFilter", function(index) {
  console.log(index)
  const arr = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十",];
  if(index < 10) {
    return arr[index]
  }else{
    var temp1 = arr[parseInt(index/10)-1];
    var temp2 = arr[index%10]
    var result = "";
    if(index < 20) {
      result = "十"+temp2
    }else{
      result =  temp1+"十"+temp2
    }
    return result
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
