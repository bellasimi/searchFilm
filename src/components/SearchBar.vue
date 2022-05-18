<template>
  <div class="search-bar">
    <form @submit.prevent="validateKeyword" class="search-bar__form">
      <input v-model="keyword" :placeholder="keyword" />
      <i class="fa-solid fa-magnifying-glass" @click="validateKeyword"></i>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
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

<style lang="scss" scoped>
.search-bar {
  display: flex;
  justify-content: center;

  &__form {
    position: relative;
    width: 100%;

    > i {
      position: absolute;
      top: 9px;
      right: 1px;
      cursor: pointer;
    }
  }
  input {
    border-radius: 10px;
    padding: 2px 10px;
    width: 100%;
    height: 25px;
  }
  &__button {
    color: white;
    cursor: pointer;
    margin: 4px 0 0 5px;
  }
}
</style>
