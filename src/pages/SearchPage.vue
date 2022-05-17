<template>
  <h1>검색 결과 리스트</h1>
  <SearchList :search-list="searchList" />
</template>

<script>
import SearchList from '~/components/SearchList'
export default {
  components: {
    SearchList,
  },
  data() {
    return {
      searchList: {
        type: Object,
        default: () => [],
      },
    }
  },
  mounted() {
    this.fetchSearch()
  },
  methods: {
    async fetchSearch() {
      const result = await fetch('/.netlify/functions/workspace', {
        method: 'POST',
        body: JSON.stringify({
          params: `&s=${this.$route.params.keyword}&page=3`,
        }),
      }).then((result) => result.json())

      this.searchList = result.Search
    },
  },
}
</script>
