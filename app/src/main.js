import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'
import Restaurants from "./components/Restaurants.vue";
import RestaurantDetail from "./components/RestaurantDetail.vue";
import RestaurantMap from "./components/RestaurantMap.vue";
import HelloWorld from "./components/HelloWorld.vue";
import * as VueGoogleMaps from "vue2-google-maps";

// configs...
Vue.use(VueMaterial);
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDUTrlG_4B2gIFjcb7kYMwYVUdju9UAxd0",
    libraries: "places" // necessary for places input
  }
});
// config du router :
const router = new VueRouter({
  routes:[
    { 
      path: '/', 
      component: HelloWorld, 
      props:{
        msg:" site des restaurants"
      } 
    },
    { 
      path: '/restaurants', 
      component: Restaurants 
    },
    { 
      path: '/restaurant/:id', 
      component: RestaurantDetail 
    },
    {
      path: '/map/:id',
      component: RestaurantMap
    }
  ],
  mode:'history'
});

new Vue({
  router,
  render: h => h(App), // si router pas de rendu de composant
}).$mount('#app');
