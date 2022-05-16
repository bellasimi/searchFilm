<template>
  <div class="search-bar">
    <input v-model="keyword" :placeholder="keyword" />
    <button @click="$router.push(`/search/${keyword}`)">검색</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '검색어를 입력해 주세요',
    }
  },
}
</script>


