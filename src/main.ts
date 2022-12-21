import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

import 'normalize.css/normalize.css'
import './assets/scss/tailwind/tailwind.scss'

/* import font awesome icon component */
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {
  faLock,
  faStarOfLife,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons'
import {
  faEnvelope,
  faEyeSlash,
  faEye,
  faUser
} from '@fortawesome/free-regular-svg-icons'

library.add(
  faEnvelope,
  faLock,
  faEyeSlash,
  faEye,
  faUser,
  faStarOfLife,
  faChevronLeft
)

const app = createApp(App)

app.component('fa-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
