<template>
  <div class="detail-page">
    <Nav />
    <Detail :film="film" />
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import Detail from '~/components/Detail'
import Loading from '~/components/Loading'
import Nav from '~/components/Nav'

export default {
  components: {
    Nav,
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
      const result = await fetch(`/.netlify/functions/searchDetail${params}`).then((result) =>
        result.json()
      )
      this.film = result
      this.isLoading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.search-page {
  width: 100vw;
}
</style>
