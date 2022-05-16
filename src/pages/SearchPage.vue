<template>
  <h1>검색 결과 리스트</h1>
  <SearchList :search-list="searchList" />
</template>

<script>
import SearchList from '~/components/SearchList'
import { API_KEY } from '~/constants'

export default {
  components: {
    SearchList,
  },
  data() {
    return {
      searchList: {
        type: Array,
        default: () => [],
      },
    }
  },
  created() {
    const keyword = this.$route.params.keyword
    console.log(keyword)
    this.fetchSearch()
  },
  mounted() {
    console.log(this)
  },
  methods: {
    async fetchSearch() {
      const result = await this.$fetch(`?apikey=${API_KEY}&s=${this.$route.params.keyword}&page=3`)
      this.searchList = result.Search
    },
  },
}
</script>
