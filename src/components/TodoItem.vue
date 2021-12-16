<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="completed" />
      <div
        v-if="!editing"
        @dblclick="editTodo"
        class="todo-item-label"
        :class="{ completed: completed }"
      >
        {{ title }}
      </div>
      <input
        v-else
        class="todo-item-edit"
        type="text"
        v-model="title"
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
        v-focus
      />
    </div>
    <div class="remove-item" @click="openModal()">&times;</div>
    <transition name="fade">
      <!-- modal -->
      <div class="modal" v-if="show">
        <div class="modal">
          <span class="close" title="Close Modal" @click="closeModal()">×</span>
          <form class="modal-content">
            <div class="container">
              <h1>{{ $t("model.head") }}</h1>
              <p>{{ $t("model.sure") }}?</p>

              <div class="clearfix">
                <button type="button" class="cancelbtn" @click="closeModal()">
                  {{ $t("model.cancel") }}
                </button>
                <button
                  type="button"
                  class="deletebtn"
                  @click="removeTodo(index)"
                >
                  {{ $t("model.delete") }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: "",
    };
  },
  methods: {
    removeTodo(index) {
      this.$emit("removedTodo", index);
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    doneEdit() {
      if (this.title.trim() == "") {
        this.title = this.beforeEditCache;
      }
      this.editing = false;
      this.$emit("finishedEdit", {
        index: this.index,
        todo: {
          id: this.id,
          title: this.title,
          completed: this.completed,
          editing: this.editing,
        },
      });
    },
    cancelEdit() {
      this.title = this.beforeEditCache;
      this.editing = false;
    },
  },
};
</script>