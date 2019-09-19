import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
//import Home from './components/Home'
import ScreenRecipesEdit from './views/ScreenRecipesEdit.vue'
import ScreenMenuesCook from './views/ScreenMenuesCook.vue'
import ScreenCookGraph from './views/ScreenCookGraph.vue'
import ScreenRecipes from './views/ScreenRecipes'
import ScreenBackend from './views/ScreenBackend'
import ScreenMenuesEdit from './views/ScreenMenuesEdit'
import ScreenMenueEdit from './views/ScreenMenueEdit'

Vue.use(Router);

export default new Router({
    mode: 'history',
  routes: [
    {
        path: '/', redirect: { name: 'home' }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {displayTitle: 'Multitask Manager'}
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    //   meta: {displayTitle: 'About'}
    // },
    {
        path: '/recipes-edit/:id',
        name: 'recipes-edit',
        component: ScreenRecipesEdit,
        props: true,
        meta: {displayTitle: 'Rezept bearbeiten'}
    },
    {
        path: '/menuescook',
        name: 'menuescook',
        component: ScreenMenuesCook,
        meta: {displayTitle: 'Kochen'}
    },
    {
        path: '/menuescook/:id',
        name: 'menuescookgraph',
        component: ScreenCookGraph,
        props: true,
        meta: {displayTitle: 'Menue kochen/planen'}
    },
    {
        path: '/recipes',
        name: 'recipes',
        component: ScreenRecipes,
        meta: {displayTitle: 'Rezepte verwalten'}
    },
    {
        path: '/backend',
        name: 'backend',
        component: ScreenBackend,
        meta: {displayTitle: 'Backend'}
    },
    {
      path: '/menues-edit',
      name: 'menues-edit',
      component: ScreenMenuesEdit,
      meta: {displayTitle: 'Menues verwalten'}
    },
    {
      path: '/menue-edit/:id',
      name: 'menue-edit',
      component: ScreenMenueEdit,
      props: true,
      meta: {displayTitle: 'Menue bearbeiten'}
    },
    {
      path: '*', redirect: { name: 'home' }
    }
    

  ]
})
