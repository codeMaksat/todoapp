<template>
  <div>
    <div class="locale-changer">
      <select v-model="$i18n.locale">
        <option :value="lang" v-for="(lang, i) in langs" :key="`lang${i}`">
          {{ lang }}
        </option>
      </select>
    </div>

    <input
      type="text"
      class="todo-input"
      :placeholder="$t('todo.title')"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <transition-group
      name="fade"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div
        v-for="(todo, index) in todosFiltered"
        :key="todo.id"
        class="todo-item"
      >
        <div class="todo-item-left">
          <input type="checkbox" v-model="todo.completed" />
          <div
            v-if="!todo.editing"
            @dblclick="editTodo(todo)"
            class="todo-item-label"
            :class="{ completed: todo.completed }"
          >
            {{ todo.title }}
          </div>
          <input
            v-else
            class="todo-item-edit"
            type="text"
            v-model="todo.title"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
            v-focus
          />
        </div>
        <div class="remove-item" @click="openModal()">&times;</div>
        <transition name="fade">
          <!-- modal -->
          <div class="modal" v-if="show">
            <div class="modal__backdrop" @click="closeModal()" />

            <div id="id01" class="modal">
              <span class="close" title="Close Modal" @click="closeModal()"
                >×</span
              >
              <form class="modal-content">
                <div class="container">
                  <h1>{{ $t("model.head") }}</h1>
                  <p>{{ $t("model.sure") }}?</p>

                  <div class="clearfix">
                    <button
                      type="button"
                      class="cancelbtn"
                      @click="closeModal()"
                    >
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
    </transition-group>

    <div class="extra-container">
      <div>
        <label
          ><input
            type="checkbox"
            :checked="!anyRemaining"
            @change="checkAllTodos"
          />
          <span class="checkallbtn">{{ $t("todo.checkall") }}</span>
        </label>
      </div>
      <div>{{ remaining }} {{ $t("todo.items") }}</div>
    </div>

    <div class="extra-container">
      <div>
        <transition name="fade">
          <button
            :disabled="!showClearCompletedButton"
            @click="clearCompleted"
            class="cleartodo"
          >
            {{ $t("todo.clear") }}
          </button>
        </transition>
      </div>
    </div>
  </div>

</template>



<script>
import {Calculator, AddCommand, SubtractCommand, MultiplyCommand, DivideCommand} from "../assets/before.js";

export default {
  name: "todo-list",
  data() {
    return {
      newTodo: "",
      idForTodo: 3,
      beforeEditCache: "",
      filter: "all",
      show: false,
      todos: [
        {
          id: 1,
          title: "Finish Vue Screencast",
          completed: false,
          editing: false,
        },
        {
          id: 2,
          title: "Take over world",
          completed: false,
          editing: false,
        },
      ],
      langs: ["Eng", "Tkm"],
    };
  },
  computed: {
    remaining() {
      return this.todos.filter((todo) => !todo.completed).length;
    },
    anyRemaining() {
      return this.remaining != 0;
    },
    todosFiltered() {
      if (this.filter == "all") {
        return this.todos;
      } else if (this.filter == "active") {
        return this.todos.filter((todo) => !todo.completed);
      } else if (this.filter == "completed") {
        return this.todos.filter((todo) => todo.completed);
      }
      return this.todos;
    },
    showClearCompletedButton() {
      return this.todos.filter((todo) => todo.completed).length > 0;
    },
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false,
      });
      this.newTodo = "";
      this.idForTodo++;
      const calculator = new Calculator()
      calculator.executeCommand(new AddCommand(10));
      calculator.executeCommand(new SubtractCommand(5));
      console.log(calculator.value);
      calculator.undo()
      console.log(calculator.value);
    },
    editTodo(todo) {
      this.beforeEditCache = todo.title;
      todo.editing = true;
    },
    doneEdit(todo) {
      if (todo.title.trim() == "") {
        todo.title = this.beforeEditCache;
      }
      todo.editing = false;
    },
    cancelEdit(todo) {
      todo.title = this.beforeEditCache;
      todo.editing = false;
    },
    checkAllTodos() {
      this.todos.forEach((todo) => (todo.completed = event.target.checked));
    },
    clearCompleted() {
      this.todos = this.todos.filter((todo) => !todo.completed);
    },
    closeModal() {
      this.show = false;
      document.querySelector("body").classList.remove("overflow-hidden");
    },
    openModal() {
      this.show = true;
      document.querySelector("body").classList.add("overflow-hidden");
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
      this.show = false;
      document.querySelector("body").classList.remove("overflow-hidden");
    },
  },
};
</script>

<style>
.todo-input {
  width: 100%;
  padding: 10px 41px;
  font-size: 22px;
  margin-bottom: 16px;
}
.todo-input:focus {
  outline: 0;
}
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}
.remove-item,
.close-model-inside {
  cursor: pointer;
  margin-left: 14px;
}
.remove-item:hover,
.close-model-inside:hover {
  color: black;
}
.todo-item-left {
  display: flex;
  align-items: center;
}
.todo-item-label {
  font-size: 1.2rem;
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}
.todo-item-edit {
  font-size: 1.2rem;
  color: #757a80;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.todo-item-edit:focus {
  outline: none;
}
.completed {
  text-decoration: line-through;
  color: grey;
}
.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
}
.cleartodo {
  font-size: 14px;
  background-color: white;
  /* color: black; */
  border: 2px solid #e7e7e7;
  padding: 0.5rem;
}
.cleartodo:hover {
  background-color: #e7e7e7;
}
.cleartodo:focus {
  outline: none;
}

/* .cleartodo:active {
  background: lightgreen;
} */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.checkallbtn {
  display: inline-block;
  margin-left: 19px;
}

.locale-changer {
  float: right;
  margin-top: -95px;
}
select {
  background-color: transparent;
  border: none;
  padding: 0 0 0 0;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: 1rem;
  cursor: inherit;
  line-height: inherit;
  z-index: 1;
  outline: none;
  color: #2c3e50;
  text-transform: uppercase;
}
select::-ms-expand {
  display: none;
}

/* Float cancel and delete buttons and add an equal width */
.cancelbtn,
.deletebtn {
  float: left;
  width: 50%;
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  opacity: 0.8;
}

button:hover {
  opacity: 1;
}

/* Add a color to the cancel button */
.cancelbtn {
  background-color: #ccc;
  color: black;
  font-size: 1rem;
}

/* Add a color to the delete button */
.deletebtn {
  background-color: #f44336;
  font-size: 1rem;
}

/* Add padding and center-align text to the container */
.container {
  padding: 16px;
  text-align: center;
}

.container h1 {
  font-size: 22px;
}

.container p {
  font-size: 1.2rem;
}

/* The Modal (background) */
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: #474e5d;
  padding-top: 50px;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  width: 50%; /* Could be more or less, depending on screen size */
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
}

/* Style the horizontal ruler */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* The Modal Close Button (x) */
.close {
  position: absolute;
  right: 35px;
  top: 15px;
  font-size: 40px;
  font-weight: bold;
  color: #f1f1f1;
}

.close:hover,
.close:focus {
  color: #f44336;
  cursor: pointer;
}

/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}
</style>
