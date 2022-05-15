import { API_END_POINT } from '~/constants'

export default {
  install(app, options) {
    app.config.globalProperties.$fetch = (url, header) => {
      return fetch(`${API_END_POINT}${url}`, header).then((res) => res.json())
    }
  },
}
