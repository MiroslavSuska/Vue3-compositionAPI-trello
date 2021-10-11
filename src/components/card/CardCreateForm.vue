<template>
  <footer>
    <a
      href="#"
      class="p-1 text-gray-500 hover:text-gray-700"
      @click="showForm"
      v-if="linkVisible"
    >
      Add a card ...</a
    >

    <form @submit.prevent="submitForm" action="/" v-if="formVisible">
      <textarea
        class="w-full p-3 border-t border-l border-gray-300 outline-none rounded shadow-inner"
        rows="3"
        ref="textarea"
        v-model="inputText"
        @keydown.enter.prevent=""
      ></textarea>

      <div class="flex mt-1.5 items-center">
        <button class="btn btn-green">Add card</button>

        <a
          class="ml-0.5 p-1 text-gray-500 hover:text-gray-700"
          href="#"
          @click="hideForm"
        >
          <svg class="w-6 h-6 fill-current" viewBox="0 0 20 20">
            <path
              d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"
            ></path>
          </svg>
        </a>
      </div>
    </form>
  </footer>
</template>

<script>
import { reactive, toRefs, nextTick, ref } from "vue";

export default {
  props: {
    id: {
      type: Number,
    },
  },
  setup(props) {
    const textarea = ref(null);

    const state = reactive({
      formVisible: false,
      linkVisible: true,
      inputText: "",
    });

    // show form
    const showForm = () => {
      state.formVisible = true;
      state.linkVisible = false;
      nextTick(function () {
        textarea.value.focus();
      });
    };

    //hide form
    const hideForm = () => {
      state.formVisible = false;
      state.linkVisible = true;
    };

    // submit form
    const submitForm = () => {
      if (state.inputText) {
        window.eventBus.emit("add-new-card", {
          id: props.id,
          title: state.inputText,
        });
        state.inputText = "";
        hideForm();
      }
    };

    return {
      ...toRefs(state),
      showForm,
      hideForm,
      textarea,
      submitForm,
    };
  },
};
</script>

<style scoped lang="scss"></style>
