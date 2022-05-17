<template>
  <h1>상세페이지</h1>
  <Detail :film="film" />
</template>

<script>
import Detail from '~/components/Detail'

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
      const result = await fetch('/.netlify/functions/workspace', {
        method: 'POST',
        body: JSON.stringify({
          params: `&i=${this.$route.params.imdbID}&plot=full`,
        }),
      }).then((result) => result.json())
      this.film = result
    },
  },
}
</script>
