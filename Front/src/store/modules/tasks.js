import {
  createTask,
  deleteTask,
  editTask,
  fetchTasks,
  toggleTaskCompleted,
} from "@/services/tasks";

export default {
  namespaced: true,
  state: {
    tasks: [],
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    EDIT_TASK(state, updatedTask) {
      const index = state.tasks.findIndex((task) => task.uuid === updatedTask.uuid);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
    DELETE_TASK(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.uuid !== taskId);
    },
    TOGGLE_TASK_COMPLETED(state, taskId) {
      const task = state.tasks.find((task) => task.uuid === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      try {
        const data = await fetchTasks();
        commit("SET_TASKS", data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    async addTask({ commit }, task) {
      try {
        const data = await createTask(task);
        commit("ADD_TASK", data);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },
    async editTask({ commit }, task) {
      try {
        const data = await editTask(task);
        commit("EDIT_TASK", data);
      } catch (error) {
        console.error("Error editing task:", error);
      }
      commit("EDIT_TASK", task);
    },
    async deleteTask({ commit }, taskId) {
      try {
        await deleteTask(taskId);
        commit("DELETE_TASK", taskId);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },
    async toggleTaskCompleted({ commit }, taskId) {
      try {
        await toggleTaskCompleted(taskId);
        commit("TOGGLE_TASK_COMPLETED", taskId);
      } catch (error) {
        console.error("Error changing task status:", error);
      }
    },
  },
  getters: {
    tasks: (state) => state.tasks,
    completedTasks: (state) => state.tasks.filter((task) => task.completed),
    pendingTasks: (state) => state.tasks.filter((task) => !task.completed),
  },
};
