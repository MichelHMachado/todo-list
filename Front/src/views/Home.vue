<template>
  <div class="container position-relative">
    <div class="position-absolute"><LogoutButton /></div>
    <header class="mb-4">
      <h1 class="text-center">ToDo List</h1>
    </header>
    <div
      style="gap: 16px"
      class="d-flex justify-content-center align-items-center mb-4"
    >
      <button class="btn btn-primary" @click="openTaskForm()">
        Add new task
      </button>
      <button class="btn btn-secondary" @click="addMockTasks(200)">
        Add mock tasks
      </button>
    </div>

    <TaskList
      :tasks="tasks"
      @edit="openTaskForm"
      @delete="deleteTask"
      @toggleComplete="toggleTaskCompletion"
    />

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
import LogoutButton from "@/components/LogoutButton.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HomePage",
  components: {
    TaskList,
    TaskForm,
    LogoutButton,
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
      "addMockTasks",
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
  z-index: 500;
}
.modal-content {
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  z-index: 510;
}
</style>
