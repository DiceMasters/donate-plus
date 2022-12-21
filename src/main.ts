import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

import 'normalize.css/normalize.css'
import './assets/scss/tailwind/tailwind.scss'

/* import font awesome icon component */
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import * as icons from '@/plugins/font-awesome'

// i18n
import {i18n} from '@/plugins/i18n'

library.add(icons)

const app = createApp(App)

app.component('fa-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
