import { createApp } from 'vue'
import { createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import CountryDetail from './pages/CountryDetail.vue'
import store from './store'
import VueGtag, { trackRouter } from "vue-gtag-next";

const routes = [
    { path: '/', component: Home },
    { path: '/country/:id', component: CountryDetail },
    { path: '/:pathMatch(.*)', redirect: '/' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

trackRouter(router);

createApp(App)
    .use(store)
    .use(router)
    .use(VueGtag, {
        property: {
            id: "G-59KHKEN6XX"
        }
    })
    .mount('#app')

