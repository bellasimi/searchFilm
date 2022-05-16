<template>
  <h1>상세페이지</h1>
  <Detail :film="film" />
</template>

<script>
import Detail from '~/components/Detail'
import { API_KEY } from '~/constants'

export default {
  components: {
    Detail,
  },
  data() {
    return {
      film: {
        type: Object,
        default: () => ({}),
      },
    }
  },
  created() {
    this.fetchDetail()
  },
  methods: {
    async fetchDetail() {
      const result = await this.$fetch(
        `?apikey=${API_KEY}&i=${this.$route.params.imdbID}&plot=full`
      )
      this.film = result
    },
  },
}
</script>
