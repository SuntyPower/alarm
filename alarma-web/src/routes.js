import Login from '@/components/Login.vue'
import LastReports from '@/components/tables/LastReports.vue'
import Register from '@/components/forms/Register.vue'
import Profile from '@/components/Profile.vue'
const routes = [
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
    path: '/reports',
    component: LastReports,
    name: 'reports'
  },
  {
    path: '/register',
    component: Register,
    name: 'register'
  },
  {
    path: '/profile',
    component: Profile,
    name: 'profile'
  }
]

export default routes
