import Main from '@/pages/Main.vue'
import PostPages from '@/pages/PostPages.vue'
import About from '@/pages/About.vue'
import PostPage from '@/pages/PostPage.vue'
import PostPagesWithStore from '@/pages/PostPagesWithStore.vue'
import PostPagesCompositionAPI from '@/pages/PostPagesCompositionAPI.vue'
import {createRouter} from 'vue-router'
import {createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPages
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostPage
    },
    {
        path: '/store',
        component: PostPagesWithStore
    },
    {
        path: '/composition',
        component: PostPagesCompositionAPI
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router