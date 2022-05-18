import { toNumber } from '@vue/shared'

export default {
  install(app) {
    app.config.globalProperties.$debounce = (fn, delay) => {
      let timer = null
      return function () {
        const context = this
        const args = arguments

        clearTimeout(timer)
        timer = setTimeout(fn.apply(context, args), delay)
      }
    }
  },
}
