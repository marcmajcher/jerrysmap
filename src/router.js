import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'mapGame',
      component: () => import(/* webpackChunkName: "mapGame" */ './components/MapGame.vue'),
    },
    {
      path: '/austin',
      name: 'austinMap',
      component: () => import(/* webpackChunkName: "austinMap" */ './components/AustinMap.vue'),
    },
  ],
});
