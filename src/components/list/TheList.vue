<template>
  <section class="list relative" :class="{ 'overflow-hidden': isListPopped }">
    <header class="header">
      <h3
        ref="listTitle"
        class="p-1 font-bold leading-none text-gray-900 outline-none"
        :class="{ 'shadow-outline': isEditable }"
        @dblclick="startEditing"
        :contenteditable="isEditable"
        @blur="saveTitle"
        @keydown.enter="saveTitle"
        @keydown.esc="escapeText"
      >
        {{ title }}
      </h3>

      <a
        class=""
        href="#"
        @click="isListPopped = true"
        @blur="isListPopped = false"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
      </a>
    </header>

    <transition-group name="card" tag="ul">
      <the-card
        v-for="card in cards"
        :key="card.id"
        :card="card"
        :listID="id"
      />
    </transition-group>

    <card-create-form :id="id" />

    <transition name="listPopup">
      <list-popup
        v-if="isListPopped"
        @close-list-popup="isListPopped = false"
        :listID="id"
      />
    </transition>
  </section>
</template>

<script>
import TheCard from "../card/TheCard";
import CardCreateForm from "../card/CardCreateForm";
import ListPopup from "./ListPopup";
import { ref, toRefs, reactive } from "vue";

export default {
  components: { TheCard, CardCreateForm, ListPopup },
  props: {
    title: {
      type: String,
    },
    cards: {
      type: Array,
    },
    id: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const listTitle = ref(null);
    const state = reactive({
      isEditable: false,
      isListPopped: false,
    });

    const saveTitle = () => {
      if (listTitle.value.textContent) {
        state.isEditable = false;
        emit("edit-list-title", {
          id: props.id,
          text: listTitle.value.textContent,
        });
      }
    };

    const startEditing = () => {
      state.isEditable = true;
      setTimeout(() => {
        listTitle.value.focus();
      }, 0);
    };

    const escapeText = () => {
      if (state.isEditable) {
        state.isEditable = false;
        listTitle.value.textContent = props.title;
      }
    };

    /*const openBigCard = () => {
      window.eventBus.emit("open-big-card");
    };*/

    return {
      ...toRefs(state),
      saveTitle,
      startEditing,
      escapeText,
      listTitle,
    };
  },
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;

  a {
    color: gray;
    transition: all 0.2s ease;
  }
  a:hover,
  a:focus {
    color: black;
  }
}

.card-enter-active,
.card-leave-active {
  transition: all 0.2s;
}

.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

.listPopup-enter-active,
.listPopup-leave-active {
  transition: all 0.2s;
}

.listPopup-enter-from,
.listPopup-leave-to {
  opacity: 0;
  transform: translateY(-25%);
}
</style>
