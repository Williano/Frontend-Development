<template>
  <div id="app">
    <Header/>
    <AddToDo v-on:add-todo="addTodo"/>
    <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo"/>
  </div>
</template>

<script>
import Todos from "@/components/Todos.vue";
import AddToDo from "@/components/AddToDo.vue";

import axios from "axios";

export default {
  name: "Home",
  components: {
    Todos,
    AddToDo
  },
  data: function() {
    return {
      todos: []
    };
  },

  created: function() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(res => (this.todos = res.data));
  },

  methods: {
    deleteTodo(id) {
      axios
        .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(
          response => (this.todos = this.todos.filter(todo => todo.id !== id))
        );
    },

    addTodo(newTodo) {
      const { title, completed } = newTodo;

      axios
        .post("https://jsonplaceholder.typicode.com/todos", {
          title,
          completed
        })
        .then(response => (this.todos = [...this.todos, response.data]));
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}

.btn {
  display: inline-block;
  border: none;
  background: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;
}

.btn:hover {
  background: #666;
}
</style>
