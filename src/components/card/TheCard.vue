<template>
  <li
    class="card relative"
    :class="{ 'z-20': isPopped }"
    @contextmenu.prevent="showPopup"
    @click="openBigCard"
  >
    <card-image :image="card.image" class="max-h-52 sm:max-h-36" />

    <div class="p-3">
      <card-labels :labels="card.labels" />

      <p
        class="outline-none"
        :class="{ 'shadow-outline': isEditable }"
        :contenteditable="isEditable"
        @blur="saveTitle"
        @keydown.enter="saveText"
        @keydown.esc="escapeText"
        ref="cardText"
      >
        {{ card.title }}
      </p>

      <card-tags :tags="card.tags" />
    </div>

    <transition name="popup">
      <card-popup
        v-if="isPopped"
        @close-popup="closePopup"
        :card="card"
        :listID="listID"
        @edit-title="startEditing"
      />
    </transition>
  </li>
</template>

<script>
import CardTags from "./CardTags";
import CardImage from "./CardImage";
import CardLabels from "./CardLabels";
import CardPopup from "./CardPopup";
import { ref, reactive, toRefs, onMounted } from "vue";

export default {
  components: { CardTags, CardImage, CardLabels, CardPopup },
  props: {
    card: {
      type: Object,
    },
    listID: {
      type: Number,
    },
  },
  setup(props) {
    const state = reactive({
      isPopped: false,
      isEditable: false,
      bigCardReady: true,
    });
    const cardText = ref(null);

    const saveText = () => {
      if (cardText.value.textContent) {
        state.isEditable = false;
        window.eventBus.emit("edit-card-text", {
          cardID: props.card.id,
          listID: props.listID,
          title: cardText.value.textContent,
        });
        closePopup();
      }
    };

    const startEditing = () => {
      state.isEditable = true;
      setTimeout(() => {
        cardText.value.focus();
      }, 0);
    };

    const escapeText = () => {
      state.isEditable = false;
      cardText.value.textContent = props.card.title;
    };

    const showPopup = () => {
      state.isPopped = true;
      window.eventBus.emit("toggle-overlay", true);
      state.bigCardReady = false;
    };

    const closePopup = () => {
      state.isPopped = false;
      state.isEditable = false;
      window.eventBus.emit("toggle-overlay", false);
      setTimeout(() => {
        state.bigCardReady = true;
      }, 0);
    };

    const openBigCard = () => {
      if (state.bigCardReady === true) {
        window.eventBus.emit("open-big-card", {
          card: props.card,
          listID: props.listID,
        });
      }
    };

    onMounted(() => {
      window.eventBus.on("hide-esc-overlay", () => {
        state.isPopped = false;
      });
    });

    return {
      ...toRefs(state),
      showPopup,
      closePopup,
      saveText,
      startEditing,
      cardText,
      openBigCard,
      escapeText,
    };
  },
};
</script>

<style scoped lang="scss">
.popup-enter-active,
.popup-leave-active {
  transition: all 0.2s;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateX(-25%);
}
</style>
