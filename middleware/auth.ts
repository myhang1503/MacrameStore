export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/login') return

  if (process.client) {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (!token) return navigateTo('/login')
    if (role !== 'admin') return navigateTo('/login?reason=forbidden')
  }
})
