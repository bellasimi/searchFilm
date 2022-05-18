<template>
  <nav>
    <RouterLink to="/"> <img src="/images/film.svg" alt="logo" />SearchFilm</RouterLink>
    <SearchBar v-show="isSearchBar"></SearchBar>
  </nav>
</template>

<script>
import SearchBar from '~/components/SearchBar'

export default defineComponent({})
</script>

<style lang="scss" scoped>
nav {
  background-color: white;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
}
</style>
