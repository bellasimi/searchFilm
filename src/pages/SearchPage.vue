<template>
  <div class="search-page" @scroll="handleScroll">
    <h1>검색 결과 리스트</h1>
    <SearchList
      v-if="isFetched"
      :search-list="searchList"
      :isLoading="isLoading"
      :total-results="totalResults"
    />
    <NotFound v-else />
    <Loading v-show="isLoading" />
    <button @click="loadMore">더보기</button>
  </div>
</template>

<script>
import SearchList from '~/components/SearchList'
import Loading from '~/components/Loading'
import NotFound from '../components/NotFound.vue'
export default {
  components: {
    SearchList,
    Loading,
    NotFound,
  },
  data() {
    return {
      searchList: [],
      page: 1,
      isLoading: false,
      isFetched: true,
      totalResults: 1,
    }
  },
  created() {
    this.fetchSearch()
  },
  methods: {
    async fetchSearch() {
      this.isLoading = true
      const params = `?s=${this.$route.params.keyword}&page=${this.page}`
      const result = await fetch(`/.netlify/functions/search${params}`).then((result) =>
        result.json()
      )

      if (!result.Response) {
        this.isFetched = false
      }

      this.searchList = [...this.searchList, ...result.Search]
      this.totalResults = result.totalResults
      this.isLoading = false
    },
    loadMore() {
      this.page += 1
      this.fetchSearch()
    },
    handleScroll() {
      const isScrollEnd = widow.innerHeight + window.scrollY + 100 >= document.body.offsetHeight
      const isEnd =
        isScrollEnd && !this.isLoading && this.searchList.length < this.totalResults.length
      if (isEnd) {
        this.page += 1
        this.$debounce(this.fetchSearch, 300)
      }
    },
  },
}
</script>
