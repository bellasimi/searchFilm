<template>
  <div>
    <h1>영화 검색 사이트</h1>
    <SearchBar />
  </div>
</template>

<script>
import SearchBar from '~/components/SearchBar'
export default {
  components: {
    SearchBar,
  },
  data() {
    return {
      keyword: '검색어를 입력해주세요',
    }
  },
}
</script>
