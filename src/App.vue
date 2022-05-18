<template>
  <div class="page">
    <section>
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
.page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 100px 0 0 0;

  > section {
    margin: 10px auto 0 auto;
  }
}
</style>
