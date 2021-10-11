<template>
  <aside class="flex items-center mb-1.5 flex-wrap" v-if="labels">
    <span
      v-for="(color, index) in labels"
      :key="index"
      :class="`bg-${color}-400`"
      class="w-8 h-2 mr-2 rounded-full mb-1.5"
    ></span>

    <form action="#" class="relative mb-1.5" v-if="add">
      <a
        href="#"
        class="px-1 py-0.5 mr-1.5 bg-gray-500 opacity-50 rounded plus-button text-white"
        :class="{ 'opacity-100': hover }"
        @click="addLabel"
      >
        <svg
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
      </a>
      <select
        name="labels"
        id="labels"
        class="select relative outline-none pointer"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        @change="addLabel"
        v-model="selectForm"
      >
        <option value="yellow" class="bg-yellow-400">Yellow</option>
        <option value="blue" class="bg-blue-400">Blue</option>
        <option value="red" class="bg-red-400">Red</option>
        <option value="green" class="bg-green-400">Green</option>
        <option value="purple" class="bg-purple-400">Purple</option>
      </select>
    </form>
  </aside>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  props: {
    labels: {
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
      isEditing: false,
      selectForm: "",
      hover: false,
    });

    const addLabel = () => {
      window.eventBus.emit("save-new-label", {
        listID: props.listID,
        cardID: props.cardID,
        label: state.selectForm,
      });
      console.log({
        listID: props.listID,
        cardID: props.cardID,
        label: state.selectForm,
      });
    };

    const submit = () => {
      console.log(state.selectForm);
    };

    return { ...toRefs(state), addLabel, submit };
  },
};
</script>

<style scoped lang="scss">
.select {
  background-color: transparent;
  z-index: 20;
  color: transparent;
  max-width: 3rem;

  option {
    color: black;
  }
}

.plus-button {
  position: absolute;
  top: 0;
  z-index: 10;
}

.opacity-100 {
  opacity: 1;
}
</style>
