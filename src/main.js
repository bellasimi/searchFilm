import App from '~/App'
import { createApp } from 'vue'
import router from '~/plugins/routes'

const app = createApp(App)
app.use(router)
app.mount('#app')
