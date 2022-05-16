<template>
  <div>{{ film.Title }}</div>
  <img :src="film.Poster" />
</template>

<script>
export default {
  props: {
    film: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
