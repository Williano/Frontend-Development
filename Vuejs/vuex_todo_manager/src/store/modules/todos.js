import axios from "axios";

const state = {
  todos: [
    {
      id: 1,
      title: "Todo One"
    },
    {
      id: 2,
      title: "Todo Two"
    }
  ]
};

const actions = {
  async fetchTodos(context) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    context.commit("setTodos", response.data);
  },

  async addTodo(context, title) {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      { title: title, completed: false }
    );

    context.commit("newTodo", response.data);
  },

  async deleteTodo(context, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    context.commit("removeTodo", id);
  },

  async filterTodos(context, e) {
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );

    context.commit("setTodos", response.data);
  },

  async updateTodo({ commit }, updTodo) {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
      updTodo
    );

    commit("updateTodo", response.data);
  }
};

const getters = {
  allTodos: state => {
    return state.todos;
  }
};

const mutations = {
  setTodos: (state, todos) => {
    state.todos = todos;
  },

  newTodo: (state, todo) => {
    state.todos.unshift(todo);
  },

  removeTodo: (state, id) => {
    state.todos = state.todos.filter(todo => todo.id !== id);
  },

  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  }
};

export default {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
