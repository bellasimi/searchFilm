<template>
  <ul class="search">
    <li
      v-for="searchItem in searchList"
      :key="searchItem.imdbID"
      class="search__items"
      @click="$router.push(`/detail/${searchItem.imdbID}`)"
    >
      <img class="poster" :src="searchItem.Poster" alt="poster" />
      <div class="title">{{ searchItem.Title }}</div>
      <div class="year">{{ searchItem.Year }}</div>
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
  methods: {},
}
</script>

<style lang="scss" scoped>
@use 'sass:map';

$lg: 1000px;
$md: 800px;
$sm: 400px;

@mixin media($display) {
  $breakpoints: (
    lg: $lg,
    md: $md,
    sm: $sm,
  );

  @media all and (max-width: map.get($breakpoints,$display)) {
    @content;
  }
}
.search {
  cursor: pointer;
  list-style: none;
  position: relative;
  display: grid;
  grid-auto-rows: 300px;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;

  @include media(md) {
    grid-template-columns: repeat(3, 1fr);
  }

  @include media(sm) {
    grid-template-columns: 1fr;
  }

  &__items {
    width: 80%;
    @include media(sm) {
      width: 100%;
    }
    height: 90%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;

    .poster {
      width: 100%;
      height: 70%;
      object-fit: cover;
    }
    .title {
      font-size: 16px;
      font-weight: 600;
      margin: 15px 5px 0 5px;
    }
    .year {
      font-size: 14px;
      font-weight: 600;
    }
    &:hover {
      transform: scale(1.1);
      box-shadow: 2px 2px 2px 2px rgba(12, 12, 12, 0.301);
    }
  }
}
</style>
