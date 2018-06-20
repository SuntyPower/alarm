import Login from '@/components/Login.vue'
import LastReports from '@/components/tables/LastReports.vue'
import Register from '@/components/forms/Register.vue'
import Profile from '@/components/Profile.vue'
const routes = [
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: { isPublic: true }
  },
  {
    path: '/reports',
    component: LastReports,
    name: 'reports',
    meta: { isPublic: true }
  },
  {
    path: '/register',
    component: Register,
    name: 'register',
    meta: { isPublic: true }
  },
  {
    path: '/profile',
    component: Profile,
    name: 'profile',
    meta: { isPublic: true }
  }
]

export default routes
