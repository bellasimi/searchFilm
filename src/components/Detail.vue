<template>
  <div class="detail">
    <i class="fa-solid fa-arrow-left-long fa-lg" @click="back"> 이전</i>
    <div class="upper-wrapper">
      <div class="poster">
        <img :src="film.Poster === 'N/A' ? defaultImage : film.Poster" alt="poster" />
      </div>
      <div class="contents">
        <h1 class="title">{{ film.Title }}</h1>
        <h3>개봉일: {{ film.Released }}</h3>
        <span>상영시간: {{ film.Runtime }}</span>
        <span>관람등급: {{ film.Released }}</span>
        <span>장르: {{ film.Genre }}</span>
        <h3>감독: {{ film.Genre }}</h3>
        <h3>출연진: {{ film.Actors }}</h3>
        <h2>줄거리</h2>
        <div class="plot">
          {{ film.Plot }}
        </div>
      </div>
    </div>
    <div class="down-wrapper"></div>
  </div>
</template>

<script>
export default {
  data() {
    return { defaultImage: 'http://via.placeholder.com/200' }
  },

  props: {
    film: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    back() {
      console.log('??')
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
.detail {
  width: 60%;
  margin: 20px auto 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  > i {
    cursor: pointer;
    position: absolute;
    top: 10px;
    left: -100px;
    &:hover {
      color: rgba(0, 0, 0, 0.5);
    }
  }
  .upper-wrapper {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
}
</style>
