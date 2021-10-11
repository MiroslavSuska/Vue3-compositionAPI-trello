<template>
  <ul
    class="flex list-popup bg-black bg-opacity-80 text-base text-white font-semibold sm:absolute sm:m-0"
  >
    <li class="flex">
      <a
        class="flex items-center px-3 py-2.5 mb-1.5 bg-black bg-opacity-80 hover:bg-opacity-100 rounded transform hover:scale transition duration-75 ease-in"
        href="#"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 mr-1.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>

        some option</a
      >
    </li>
    <li class="flex">
      <a
        @click="deleteList"
        class="flex items-center px-3 py-2.5 mb-1.5 bg-black bg-opacity-80 hover:bg-opacity-100 rounded transform hover:scale transition duration-75 ease-in"
        href="#"
      >
        <svg class="w-4 h-4 mr-1.5" viewBox="0 0 20 20">
          <path
            class="fill-current"
            d="M16.471,5.962c-0.365-0.066-0.709,0.176-0.774,0.538l-1.843,10.217H6.096L4.255,6.5c-0.066-0.362-0.42-0.603-0.775-0.538C3.117,6.027,2.876,6.375,2.942,6.737l1.94,10.765c0.058,0.318,0.334,0.549,0.657,0.549h8.872c0.323,0,0.6-0.23,0.656-0.549l1.941-10.765C17.074,6.375,16.833,6.027,16.471,5.962z"
          ></path>
          <path
            class="fill-current"
            d="M16.594,3.804H3.406c-0.369,0-0.667,0.298-0.667,0.667s0.299,0.667,0.667,0.667h13.188c0.369,0,0.667-0.298,0.667-0.667S16.963,3.804,16.594,3.804z"
          ></path>
          <path
            class="fill-current"
            d="M9.25,3.284h1.501c0.368,0,0.667-0.298,0.667-0.667c0-0.369-0.299-0.667-0.667-0.667H9.25c-0.369,0-0.667,0.298-0.667,0.667C8.583,2.985,8.882,3.284,9.25,3.284z"
          ></path>
        </svg>

        delete list</a
      >
    </li>
    <li class="flex">
      <a
        @click="emit('close-list-popup')"
        class="flex items-center px-3 py-2.5 mb-1.5 bg-black bg-opacity-80 hover:bg-opacity-100 rounded transform hover:scale transition duration-75 ease-in"
        href="#"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 mr-1.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 11l7-7 7 7M5 19l7-7 7 7"
          />
        </svg>

        back
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    listID: {
      type: Number,
    },
    card: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const deleteList = () => {
      window.eventBus.emit("delete-list", props.listID);
      //window.eventBus.emit("toggle-overlay", false);
    };

    return { emit, deleteList };
  },
};
</script>

<style scoped lang="scss">
.list-popup {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: inherit;
  height: inherit;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;

  li {
    margin-bottom: 0.5rem;
  }
}
</style>
