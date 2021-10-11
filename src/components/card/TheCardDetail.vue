<template>
  <div class="big-card mx-auto">
    <div class="flex flex-space-between mb-3">
      <div class="card-header">
        <h1
          class="font-bold leading-none text-gray-900 text-big mr-2 outline-none"
          :class="{ 'shadow-outline': isEditable }"
          :contenteditable="isEditable"
          @dblclick="isEditing"
          @keydown.enter="confirmTitle"
          @blur="escapeText"
          @keydown.esc="escapeText"
          ref="cardTitle"
        >
          {{ card.title }}
        </h1>

        <p class="text-gray-500">
          in list <span class="text-lg font-semibold">{{ listName }}</span>
        </p>
      </div>

      <button @click="closeCard">
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <div class="mt-3 mb-3">
      <card-image
        :image="card.image"
        @click="resizeImage"
        class="pointer"
        :class="{ 'max-h-52': isResizing, 'max-height': !isResizing }"
      />
    </div>

    <card-description-form
      :listID="listID"
      :cardID="card.id"
      :cardDescription="card.description"
    />

    <div class="mb-4">
      <p class="font-semibold mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
        Color labels :
      </p>
      <card-labels
        :labels="card.labels"
        class="mb-2"
        :add="true"
        :cardID="card.id"
        :listID="listID"
      />
    </div>
    <div class="mb-4">
      <p class="font-semibold mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
          />
        </svg>
        Tags :
      </p>
      <card-tags
        :tags="card.tags"
        :add="true"
        :cardID="card.id"
        :listID="listID"
      />
    </div>
  </div>
</template>

<script>
import CardTags from "./CardTags";
import CardImage from "./CardImage";
import CardLabels from "./CardLabels";
import CardDescriptionForm from "./CardDescriptionForm";
import { ref, reactive, toRefs } from "vue";

export default {
  components: { CardTags, CardLabels, CardImage, CardDescriptionForm },
  props: {
    card: {
      type: Object,
    },
    listName: {
      type: String,
    },
    listID: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      isResizing: true,
      isEditable: false,
    });
    const cardTitle = ref(null);

    const closeCard = () => {
      window.eventBus.emit("close-big-card");
      window.eventBus.emit("toggle-overlay");
    };

    const resizeImage = () => {
      state.isResizing = !state.isResizing;
    };

    const isEditing = () => {
      state.isEditable = true;
      setTimeout(() => {
        cardTitle.value.focus();
      }, 0);
    };

    const confirmTitle = () => {
      if (cardTitle.value.textContent) {
        state.isEditable = false;
        emit("save-card-title", {
          listID: props.listID,
          cardID: props.card.id,
          title: cardTitle.value.textContent,
        });
      }
    };

    const escapeText = () => {
      state.isEditable = false;
      //cardTitle.value.textContent = props.card.text;
    };

    return {
      ...toRefs(state),
      closeCard,
      resizeImage,
      isEditing,
      confirmTitle,
      escapeText,
      cardTitle,
    };
  },
};
</script>

<style scoped lang="scss">
.big-card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 70rem;
  width: 100%;
  height: 80vh;
  background-color: white;
  z-index: 100;
  padding: 2rem;
  overflow-y: auto;
}

.card-header {
  h1,
  p {
    display: inline-block;
  }
}

.list-in-card {
  border-bottom-width: 1px;
  border-right-width: 1px;
  border-radius: 0.25rem;
  --border-opacity: 1;
  border-color: rgba(161, 161, 170, var(--border-opacity));
  padding-right: 0.5rem;
  padding-bottom: 0.5rem;
}

.max-height {
  transition: all 0.25s linear;
  max-height: 60rem;
}

@media (max-width: 850px) {
  .big-card {
    padding: 1rem;
  }
}
@media (max-width: 450px) {
  .big-card {
    height: 100vh;
  }
}
</style>
