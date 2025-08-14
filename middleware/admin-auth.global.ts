export default defineNuxtRouteMiddleware((to) => {
  const isAdminRoute = to.path.startsWith('/admin')
  const isLogin = to.path === '/login'
  if (!isAdminRoute || isLogin) return

  if (process.client) {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (!token) return navigateTo('/login')
    if (role !== 'admin') return navigateTo('/login?reason=forbidden')
  }
})
