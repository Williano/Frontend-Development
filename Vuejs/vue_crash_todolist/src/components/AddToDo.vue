<template>
  <div>
    <form @submit="addTodo">
      <input type="text" v-model="title" name="title" placeholder="Add Todo...">
      <input type="submit" value="Submit" class="btn">
    </form>
  </div>
</template>

<script>
export default {
  name: "AddToDo",
  data: function() {
    return {
      title: ""
    };
  },
  methods: {
    addTodo(e) {
      e.preventDefault();

      const newTodo = {
        title: this.title,
        completed: false
      };
      // Send up to parent
      this.$emit("add-todo", newTodo);
      this.title = "";
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
}

input[type="text"] {
  flex: 10px;
  padding: 5px;
}

input[type="submit"] {
  flex: 2;
}
</style>
