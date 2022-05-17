<template>
  <div class="search-bar">
    <input v-model="keyword" :placeholder="keyword" />
    <button @click="validateKeyword">검색</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '검색어를 입력해 주세요',
    }
  },
  methods: {
    validateKeyword() {
      const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
      const isInvalid =
        regex.test(this.keyword) || this.keyword.length < 2 || this.keyword.length > 15
      if (isInvalid) {
        alert('검색어는 한글을 제외하고 2~15자로 입력해주세요')
      } else {
        this.$router.push(`/search/${this.keyword}`)
      }
    },
  },
}
</script>
