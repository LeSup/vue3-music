import { createApp } from 'vue'
import { createPinia } from 'pinia'
import lazy from 'vue3-lazy'

import BaseButton from '@/components/BaseButton/index.vue'
import BaseScroll from '@/components/BaseScroll/index.vue'
import BaseSwiper from '@/components/BaseSwiper/index.vue'
import loadingDirective from '@/components/BaseLoading/directive'

import App from './App.vue'
import router from './router'

import './assets/styles/index.less'
import loadingImage from '@/assets/images/default.png'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazy, {
  loading: loadingImage
})

app.component('BaseButton', BaseButton)
app.component('BaseSwiper', BaseSwiper)
app.component('BaseScroll', BaseScroll)

app.directive('loading', loadingDirective)

app.mount('#app')
