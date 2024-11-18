<template>
  <div class="container mt-5">
    <header class="mb-4">
      <h1 class="text-center">ToDo List</h1>
    </header>

    <TaskList
      :tasks="tasks"
      @edit="openTaskForm"
      @delete="deleteTask"
      @toggleComplete="toggleTaskCompletion"
    />
    <button class="btn btn-primary" @click="openTaskForm()">
      Add new task
    </button>

    <div v-if="isTaskFormOpen" class="modal-overlay">
      <div class="modal-content">
        <TaskForm :initialData="selectedTask" @close="closeTaskForm" />
      </div>
    </div>
  </div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";
import TaskForm from "@/components/TaskForm.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HomePage",
  components: {
    TaskList,
    TaskForm,
  },
  data() {
    return {
      isTaskFormOpen: false,
      selectedTask: null,
    };
  },
  computed: { ...mapGetters("tasks", ["tasks"]) },
  methods: {
    ...mapActions("tasks", [
      "deleteTask",
      "toggleTaskCompleted",
      "fetchTasks",
      "createTask",
      "editTask",
    ]),

    openTaskForm(task = null) {
      this.selectedTask = task || {
        title: "",
        description: "",
        priority: "low",
      };
      this.isTaskFormOpen = true;
    },

    closeTaskForm() {
      this.isTaskFormOpen = false;
      this.selectedTask = null;
    },

    toggleTaskCompletion(taskId) {
      this.toggleTaskCompleted(taskId);
    },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}
</style>
