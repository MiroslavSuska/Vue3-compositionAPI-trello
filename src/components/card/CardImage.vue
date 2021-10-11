<template>
  <figure
    v-if="image.filename"
    class="flex items-center border-b border-gray-200 overflow-hidden rounded-t"
  >
    <img :src="'./img/' + image.filename" :alt="image.alt" />
  </figure>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style scoped lang="scss"></style>
