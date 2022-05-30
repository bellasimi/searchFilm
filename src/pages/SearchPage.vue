<template>
  <div class="search-page">
    <Nav />
    <SearchList
      v-if="isFetched"
      :search-list="searchList"
      :isLoading="isLoading"
      :total-results="totalResults"
    />
    <NotFound v-else />
    <Loading v-show="isLoading" />
    <button @click="loadMore" class="more" v-show="isFetched">더보기</button>
  </div>
</template>

<script>
import SearchList from '~/components/SearchList'
import Loading from '~/components/Loading'
import NotFound from '../components/NotFound.vue'
import Nav from '~/components/Nav'
export default {
  components: {
    SearchList,
    Loading,
    NotFound,
    Nav,
  },
  data() {
    return {
      searchList: [],
      page: 1,
      isLoading: false,
      isFetched: true,
      totalResults: 1,
      keyword: this.$route.params.keyword,
    }
  },
  watch: {
    $route(to, from) {
      if (to.path.includes('search')) {
        this.fetchSearch('route')
      }
    },
  },
  created() {
    this.fetchSearch()
  },
  methods: {
    async fetchSearch(type = 'render') {
      console.log('api요청')
      this.isLoading = true
      const params = `?s=${this.$route.params.keyword}&page=${this.page}`
      const result = await fetch(`/.netlify/functions/search${params}`).then((result) =>
        result.json()
      )

      if (result.Response === 'False') {
        this.isFetched = false
        alert('해당 검색 결과가 없습니다!')
        this.$router.push('/')
      }

      if (type === 'render') {
        this.searchList = [...this.searchList, ...result.Search]
      } else {
        this.searchList = result.Search
      }

      this.totalResults = result.totalResults
      this.isLoading = false
    },
    loadMore() {
      this.page += 1
      this.fetchSearch()
    },
    handleScroll() {
      const isScrollEnd = window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight
      const isEnd = isScrollEnd && !this.isLoading && this.searchList.length < this.totalResults
      if (isEnd) {
        this.page += 1
        this.$debounce(this.fetchSearch, 300)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.search-page {
  width: 100vw;
}
.more {
  width: 100px;
  height: 50px;
  margin: 10px auto 10px auto;
  border: none;
  border-radius: 10px;
  background-color: #c62828;
  color: white;
  font-weight: 600;
  cursor: pointer;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  &:hover {
    background-color: #ff5f52;
  }
}
</style>
