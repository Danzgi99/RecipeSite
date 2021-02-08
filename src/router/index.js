import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/Home.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/writerecipe',
    name: 'WriteRecipe',
    component: () => import('../components/WriteRecipe.vue')
  },
  {
    path: '/userrecipes',
    name: 'userRecipes',
    component: () => import('../components/Recipes.vue')
  },
  {
    path: '/searchrecipes',
    name: 'searchRecipes',
    component: () => import('../components/Search.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
