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
  display: grid;
  grid-auto-rows: 300px;

  @include media($lg) {
    grid-template-columns: repeat(5, 1fr);
  }

  @include media($md) {
    grid-template-rows: repeat(3, 1fr);
  }

  @include media($sm) {
    grid-template-rows: 1fr;
  }

  &__items {
    width: 90%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;

    .poster {
      width: 100%;
      height: 50%;
      object-fit: cover;
    }
    .title {
    }
  }
}
</style>
