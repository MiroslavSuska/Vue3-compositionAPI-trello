<template>
  <div v-if="tags" class="flex mt-2 text-white flex-wrap">
    <a
      v-for="(tag, index) in tags"
      :key="index"
      class="px-1 py-0.5 mr-1.5 mb-1.5 bg-gray-500 opacity-50 hover:opacity-100 rounded text-xs"
      :class="{ 'text-base': add }"
      href="#"
      >{{ tag }}</a
    >
    <a
      href="#"
      class="px-1 py-0.5 mr-1.5 mb-1.5 bg-gray-500 hover:opacity-100 opacity-50 rounded plus-button"
      v-if="add"
      @click="addTag"
    >
      <svg
        v-if="!isEditing"
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <span
        v-if="isEditing"
        :contenteditable="isEditing"
        ref="spanText"
        class="outline-none"
        @keydown.enter.prevent="saveTag"
        @keydown.esc="escapeText"
      ></span>
    </a>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";

export default {
  props: {
    tags: {
      type: Array,
    },
    add: {
      type: Boolean,
    },
    cardID: {
      type: Number,
    },
    listID: {
      type: Number,
    },
  },
  setup(props) {
    const state = reactive({
      //newTagText: false,
      isEditing: false,
    });
    const spanText = ref(null);

    const addTag = () => {
      state.isEditing = true;
      setTimeout(() => {
        spanText.value.focus();
      }, 0);
    };

    const saveTag = () => {
      if (spanText.value.textContent) {
        state.isEditing = false;
        window.eventBus.emit("save-new-tag", {
          listID: props.listID,
          cardID: props.cardID,
          tag: spanText.value.textContent,
        });
      }
    };

    const escapeText = () => {
      state.isEditing = false;
      spanText.value.textContent = "";
    };

    return { ...toRefs(state), addTag, spanText, saveTag, escapeText };
  },
};
</script>

<style scoped lang="scss"></style>
