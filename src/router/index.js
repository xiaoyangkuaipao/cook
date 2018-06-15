import Vue from 'vue'
import Router from 'vue-router'
import cookbookPage from '@/pages/cookbookPage'
import cookbookDetail from '@/pages/cookbookDetail'
import cookbookSearchPage from '@/pages/cookbookSearchPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pages',
      component: cookbookPage
    },
    {
      path: '/detail',
      name: 'detail',
      component: cookbookDetail
    },
    {
      path: '/search',
      name: 'search',
      component: cookbookSearchPage
    }
  ]
})
