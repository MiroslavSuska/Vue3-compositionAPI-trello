<template>
  <main
    class="flex min-h-screen bg-purple-500 lg:bg-gradient-to-r from-teal-400 to-blue-400"
  >
    <transition name="overlay">
      <div
        v-if="overlay"
        class="bg-black bg-opacity-70 fixed top-0 left-0 w-full h-screen z-10"
        @keydown.esc="hidePopup"
      ></div>
    </transition>

    <transition-group
      name="list"
      tag="div"
      class="sm:flex items-start w-screen px-4 py-10 overflow-x-auto"
    >
      <the-list
        v-for="list in lists"
        :key="list.id"
        :title="list.title"
        :cards="list.cards"
        :id="list.id"
        @edit-list-title="updateListTitle($event, lists)"
      />

      <list-create-form @add-new-list="addNewList($event, lists)" :key="0" />
    </transition-group>

    <transition name="card-detail">
      <the-card-detail
        v-if="bigCardDisplayed"
        :card="card"
        :listName="listName"
        :listID="listID"
        @save-card-title="editCardTitle($event, lists)"
      />
    </transition>
  </main>
</template>

<script>
import TheList from "../components/list/TheList";
import ListCreateForm from "../components/list/ListCreateForm";
import TheCardDetail from "../components/card/TheCardDetail";
import { data } from "@/data";
import { ref, onMounted, toRefs, reactive } from "vue";

//functions
import {
  addNewCard,
  deleteCard,
  editCardTitle,
  updateCardDescription,
  addNewTag,
  addNewLabel,
} from "@/cards";
import { addNewList, updateListTitle, deleteList } from "@/lists";

export default {
  components: { TheList, ListCreateForm, TheCardDetail },
  setup() {
    let lists = ref(data);

    const state = reactive({
      overlay: false,
      bigCardDisplayed: false,
      card: {},
      listName: "",
      listID: 0,
    });

    //events
    onMounted(() => {
      window.eventBus.on("add-new-card", (data) => {
        addNewCard(data, lists.value);
      });
      window.eventBus.on("toggle-overlay", (event) => {
        state.overlay = event;
      });
      window.eventBus.on("delete-card", (data) => {
        deleteCard(data, lists.value);
      });
      window.eventBus.on("edit-card-text", (data) => {
        editCardTitle(data, lists.value);
      });
      window.eventBus.on("delete-list", (listID) => {
        lists.value = deleteList(listID, lists.value);
      });
      window.eventBus.on("open-big-card", (data) => {
        state.overlay = true;
        state.bigCardDisplayed = true;
        state.card = data.card;
        state.listID = data.listID;
        state.listName = getListName(data.listID);
      });
      window.eventBus.on("close-big-card", () => {
        state.bigCardDisplayed = false;
      });
      window.eventBus.on("add-new-description", (data) => {
        updateCardDescription(data, lists.value);
      });
      window.eventBus.on("save-new-tag", (data) => {
        addNewTag(data, lists.value);
      });
      window.eventBus.on("save-new-label", (data) => {
        addNewLabel(data, lists.value);
      });
    });

    const hidePopup = () => {
      state.overlay = false;
      window.eventBus.emit("hide-esc-overlay");
    };

    const getListName = (listID) => {
      let list = lists.value.find((list) => list.id === listID);
      return list.title;
    };

    return {
      ...toRefs(state),
      lists,
      addNewList,
      updateListTitle,
      editCardTitle,
      hidePopup,
    };
  },
};
</script>

<style scoped lang="scss">
.list-enter-active,
.list-leave-active,
.overlay-enter-active,
.overlay-leave-active,
.card-detail-enter-active,
.card-detail-leave-active {
  transition: all 0.2s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

.card-detail-enter-from,
.card-detail-leave-to {
  opacity: 0;
  /*transform: scale(0.5);*/
  transform: rotate3d(1, 1, 1, 30deg)
    matrix3d(1, 0, 0, 0, 0, 1, 6, 0, 0, 0, 1, 0, 50, 100, 0, 1.1);
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
