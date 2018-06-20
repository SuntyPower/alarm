import Login from '@/components/Login.vue'
import LastReports from '@/components/tables/LastReports.vue'
import Register from '@/components/forms/Register.vue'
import Profile from '@/components/Profile.vue'
import Device from '@/components/cards/Device.vue'
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
    name: 'reports'
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
    name: 'profile'
  },
  {
    path: '/devices',
    component: Device,
    name: 'device'
  }
]

export default routes
