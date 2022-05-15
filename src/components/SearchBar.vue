<template>
  <div>
    <h1>검색어 입력</h1>
    <input v-model="keyword" :placeholder="keyword" />
    <button @click="fetchSearch">확인</button>
    <SearchList v-show="isList" :search-list="searchList" />
  </div>
</template>

<script>
import { API_KEY } from '~/constants'
import SearchList from '~/components/SearchList'
export default {
  components: {
    SearchList,
  },
  data() {
    return {
      keyword: '검색어를 입력해 주세요',
      isList: false,
    }
  },
  methods: {
    async fetchSearch() {
      const result = await this.$fetch(`?apikey=${API_KEY}&s=${this.keyword}&page=3`)
      this.searchList = result.Search
      this.isList = true
    },
  },
}
</script>
