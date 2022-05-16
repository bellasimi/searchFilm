import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '~/pages/HomePage'
import SearchPage from '~/pages/SearchPage'
import DetailPage from '~/pages/DetailPage'
export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/search/:keyword',
      component: SearchPage,
    },
    {
      path: '/detail/:imdbID',
      name: 'Detail',
      component: DetailPage,
    },
    {
      path: '/:notFound(.*)',
      component: HomePage,
    },
  ],
})
