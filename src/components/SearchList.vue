<template>
  <ul>
    <li v-for="searchItem in searchList" :key="searchItem.imdbID" class="search__list">
      {{ searchItem.Title }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    searchList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  created() {
    console.log(this.searchList)
  },
}
</script>
