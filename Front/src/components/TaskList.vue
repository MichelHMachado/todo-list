<template>
  <div class="task-list">
    <div class="btn-group mb-3" role="group">
      <button
        @click="filterTasks('all')"
        class="btn btn-outline-secondary"
        :class="{ active: filter === 'all' }"
      >
        All
      </button>
      <button
        @click="filterTasks('pending')"
        class="btn btn-outline-secondary"
        :class="{ active: filter === 'pending' }"
      >
        Pending
      </button>
      <button
        @click="filterTasks('completed')"
        class="btn btn-outline-secondary"
        :class="{ active: filter === 'completed' }"
      >
        Completed
      </button>
    </div>
    <ul class="list-group">
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @edit="editTask"
        @delete="deleteTask"
        @toggleComplete="toggleComplete"
      />
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TaskItem from "./TaskItem.vue";

export default {
  components: { TaskItem },
  data() {
    return {
      filter: "all",
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasks"]),
    filteredTasks() {
      if (this.filter === "completed") {
        return this.tasks.filter((task) => task.completed);
      } else if (this.filter === "pending") {
        return this.tasks.filter((task) => !task.completed);
      }
      return this.tasks;
    },
  },
  methods: {
    ...mapActions("tasks", ["deleteTask", "toggleTaskCompleted"]),
    filterTasks(filter) {
      this.filter = filter;
    },
    editTask(task) {
      this.$emit("edit", task);
    },
    toggleComplete(taskId) {
      this.toggleTaskCompleted(taskId);
    },
  },
};
</script>

<style>
.btn-group .btn.active {
  background-color: #007bff;
  color: white;
}

.btn-group .btn:focus {
  box-shadow: none !important;
}
</style>
