<template>
  <div class="form-wrap">
    <transition name="desc-link">
      <a
        href="#"
        class="block p-1 text-gray-800 hover:text-gray-700 font-semibold text-base"
        @click="showForm"
        v-if="linkVisible"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 inline-block pb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        Edit the description ...
      </a>
    </transition>

    <p v-if="descVisible" class="text-base desc-text">
      {{ cardDescriptionFunc() }}
    </p>

    <transition name="form">
      <form @submit.prevent="submitForm" action="/" v-if="formVisible">
        <textarea
          class="description-textarea w-full p-3 outline-none rounded shadow-inner"
          rows="3"
          ref="textarea"
          v-model="inputText"
          placeholder="Your description ... "
          @keydown.enter.prevent=""
        ></textarea>

        <div class="flex mt-1.5 items-center">
          <button class="btn btn-green">Save</button>

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
    </transition>
  </div>
</template>

<script>
import { reactive, toRefs, nextTick, ref } from "vue";

export default {
  props: {
    listID: {
      type: Number,
    },
    cardID: {
      type: Number,
    },
    cardDescription: {
      type: String,
    },
  },
  setup(props) {
    const textarea = ref(null);

    const state = reactive({
      formVisible: false,
      linkVisible: true,
      descVisible: true,
      inputText: "",
    });

    // show form
    const showForm = () => {
      state.formVisible = true;
      state.linkVisible = false;
      state.descVisible = false;
      state.inputText = props.cardDescription;
      nextTick(function () {
        textarea.value.focus();
      });
    };

    //hide form
    const hideForm = () => {
      state.formVisible = false;
      state.linkVisible = true;
      state.descVisible = true;
      state.inputText = props.cardDescription;
    };

    const cardDescriptionFunc = () => {
      if (!props.cardDescription) {
        return "Your card description";
      }
      return props.cardDescription;
    };

    // submit form
    const submitForm = () => {
      if (state.inputText) {
        window.eventBus.emit("add-new-description", {
          listID: props.listID,
          cardID: props.cardID,
          text: state.inputText,
        });
        hideForm();
      }
    };

    return {
      ...toRefs(state),
      showForm,
      hideForm,
      textarea,
      submitForm,
      cardDescriptionFunc,
    };
  },
};
</script>

<style scoped lang="scss">
.form-wrap {
  min-height: 11rem;
  display: block;
}

.description-textarea {
  border: 1px solid #646465ff;
  background-color: #dcdbdb;
}

.desc-text {
  --border-opacity: 1;
  border: 1px solid rgba(161, 161, 170, var(--border-opacity));
  border-radius: 1rem;
  padding: 1rem;
}

.desc-link-enter-active,
.form-enter-active {
  transition: all 0.2s;
}

.desc-link-enter-from {
  opacity: 0;
  transform: translateY(1.5rem);
}

.form-enter-from {
  opacity: 0;
  transform: translateY(1.5rem);
}
</style>
