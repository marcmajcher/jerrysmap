import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/mapgame',
      name: 'mapgame',
      component: () => import(/* webpackChunkName: "mapGame" */ './components/MapGame.vue'),
    },
    {
      path: '/',
      name: 'jerrysmap',
      component: () => import(/* webpackChunkName: "jerrysMap" */ './components/JerrysMap.vue'),
    },
  ],
});
