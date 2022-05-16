<template>
  <div>
    <header>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/search">검색결과</RouterLink>
      <RouterLink to="{ name: 'Detail', params: { imdbID: 1111}, query: { imdbID: 12} }"
        >상세페이지</RouterLink
      >
    </header>
    <section class="page">
      <RouterView />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '검색어를 입력해주세요',
    }
  },
}
</script>

<style lang="scss" scoped>
header {
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
}

.page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px 0 0 0;
}
</style>
