<template>
  <div class="task-list">
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Search tasks..."
        v-model="searchTerm"
      />
    </div>
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

    <div class="mb-3">
      <label for="prioritySort" class="form-label mr-2">Sort by Priority</label>
      <select
        id="prioritySort"
        class="form-select"
        v-model="selectedPriorityOrder"
      >
        <option value="low">Low to High</option>
        <option value="high">High to Low</option>
      </select>
    </div>

    <RecycleScroller
      class="scroller"
      :items="filteredTasks || []"
      :item-size="computedItemSize"
      key-field="uuid"
      v-slot="{ item }"
      ><TaskItem
        :key="item.uuid"
        :task="item"
        @edit="editTask"
        @delete="deleteTask"
        @toggleComplete="toggleComplete"
      />
    </RecycleScroller>
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
      searchTerm: "",
      selectedPriorityOrder: "low",
      defaultItemSize: 88,
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasks"]),
    filteredTasks() {
      let tasksToFilter = this.tasks;

      if (this.filter === "completed") {
        tasksToFilter = tasksToFilter.filter((task) => task.completed);
      } else if (this.filter === "pending") {
        tasksToFilter = tasksToFilter.filter((task) => !task.completed);
      }

      if (this.searchTerm) {
        tasksToFilter = tasksToFilter.filter(
          (task) =>
            task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            task.description
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())
        );
      }

      tasksToFilter.sort((a, b) => {
        const priorityOrder = { low: 1, medium: 2, high: 3 };
        if (this.selectedPriorityOrder === "low") {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        } else if (this.selectedPriorityOrder === "high") {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return 0;
      });

      return tasksToFilter;
    },
    computedItemSize() {
      return window.innerWidth < 768 ? 164 : this.defaultItemSize;
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
