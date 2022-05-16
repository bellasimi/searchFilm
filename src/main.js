import App from '~/App'
import { createApp } from 'vue'
import request from '~/plugins/request'
import router from '~/plugins/routes'

const app = createApp(App)
app.use(request)
app.use(router)
app.mount('#app')
