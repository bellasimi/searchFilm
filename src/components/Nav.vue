<template>
  <nav>
    <RouterLink to="/" class="link">
      <div class="logo">
        <img src="/images/film.svg" alt="logo" class="logo__img" />
        <h1 class="logo__title">SearchFilm</h1>
      </div>
    </RouterLink>
    <SearchBar class="search-bar"></SearchBar>
  </nav>
</template>

<script>
import SearchBar from '~/components/SearchBar'

export default {
  components: {
    SearchBar,
  },
}
</script>
<style lang="scss" scoped>
nav {
  background-color: black;
  position: fixed;
  z-index: 2;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;

  .link {
    text-decoration: none;
  }
  .logo {
    width: 200px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    &__img {
      background-color: white;
      width: 50px;
      height: 100%;
      margin: 0 10px 0 10px;
    }
    &__title {
      font-size: 25px;
      font-weight: 600;
      color: white;
    }
  }
}

.search-bar {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 30%;
}
</style>
