import App from '~/App'
import { createApp } from 'vue'
import request from '~/plugins/request'

const app = createApp(App)
app.use(request)
app.mount('#app')
