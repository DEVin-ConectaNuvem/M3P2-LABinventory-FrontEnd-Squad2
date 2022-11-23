import { createRouter, createWebHashHistory } from 'vue-router'

import routes from './routes/routes'

const router = createRouter({
    routes, 
    history: createWebHashHistory()
})

router.beforeEach((to) => {
    document.title = `${to.meta.title}`
})

export default router