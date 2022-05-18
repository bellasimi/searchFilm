import App from '~/App'
import { createApp } from 'vue'
import router from '~/plugins/routes'
import debounce from '~/plugins/debounce'

const app = createApp(App)
app.use(router)
app.use(debounce)
app.mount('#app')
