<template>
  <ul class="search__list">
    <li
      v-for="searchItem in searchList"
      :key="searchItem.imdbID"
      class="search__item"
      @click="$router.push(`/detail/${searchItem.imdbID}`)"
    >
      {{ searchItem.Title }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    searchList: {
      type: Object,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.search__item {
  cursor: pointer;
  list-style: none;
}
</style>
