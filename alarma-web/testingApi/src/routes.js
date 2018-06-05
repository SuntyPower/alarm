import tableReports from '@/components/tables/Reports.vue'
import formRegister from '@/components/forms/Register.vue'

const routes = [{
  path: '/',
  component: tableReports,
  name: 'table-reports'
},{
  path: '/register',
  component: formRegister,
  name: 'register'
}]


export default routes
