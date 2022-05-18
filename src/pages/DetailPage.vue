<template>
  <h1>상세페이지</h1>
  <Detail :film="film" />
  <Loading v-show="isLoading" />
</template>

<script>
import Detail from '~/components/Detail'
import Loading from '~/components/Loading'

export default {
  components: {
    Detail,
    Loading,
  },
  data() {
    return {
      film: {
        type: Object,
        default: () => ({}),
      },
      isLoading: {
        type: Boolean,
        default: false,
      },
    }
  },
  created() {
    this.fetchDetail()
  },
  methods: {
    async fetchDetail() {
      this.isLoading = true
      const params = `?i=${this.$route.params.imdbID}&plot=full`
      const result = await fetch('/.netlify/functions/searchDetail').then((result) => result.json())
      this.film = result
      this.isLoading = false
    },
  },
}
</script>
