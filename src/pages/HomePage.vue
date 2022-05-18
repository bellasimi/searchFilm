<template>
  <div class="home">
    <img src="/images/main.jpg" alt="main" />
    <h1 class="home-title">영화를 검색해보세요</h1>
    <SearchBar />
  </div>
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
.home {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  text-align: center;
  margin-top: 120px;
  &-title {
    color: whilte;
  }
  > img {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    object-fit: cover;
  }
  &-title {
    color: white;
  }
}
</style>
