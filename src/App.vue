<template>
  <div>
    <Nav />
    <section class="page">
      <RouterView />
    </section>
  </div>
</template>

<script>
import Nav from '~/components/Nav'
export default {
  components: {
    Nav,
  },
  data() {
    return {
      keyword: '검색어를 입력해주세요',
    }
  },
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px 0 0 0;
}
</style>
