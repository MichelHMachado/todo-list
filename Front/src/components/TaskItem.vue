<template>
  <li
    class="list-group-item d-flex justify-content-between align-items-center"
    :class="{ completed: task.completed }"
  >
    <div
      class="task-content d-flex gap-2 align-items-center justify-content-between w-100"
    >
      <div style="gap: 16px" class="d-flex gap-2 align-items-center">
        <div
          class="d-flex flex-column gap-2 justify-content-center align-items-start"
          style="gap: 8px"
        >
          <span
            class="badge rounded-pill px-2 py-1 text-light"
            :class="
              task.priority === 'low'
                ? 'bg-primary'
                : task.priority === 'medium'
                ? 'bg-warning'
                : 'bg-danger'
            "
            >{{ task.priority }}</span
          >
          <div style="gap: 16px" class="d-flex gap-2 align-items-center">
            <h5 class="mb-0">{{ task.title }}</h5>
            <p class="mb-0">{{ task.description }}</p>
          </div>
        </div>
      </div>

      <div style="gap: 16px" class="actions d-flex flex-column flex-md-row">
        <button
          style="min-width: 82px"
          class="btn"
          :class="task.completed ? 'btn-outline-secondary' : 'btn-success'"
          @click="markAsCompleted"
        >
          {{ task.completed ? "Reopen" : "Finish" }}
        </button>
        <button class="btn btn-primary btn-sm" @click="$emit('edit', task)">
          Edit
        </button>
        <button
          class="btn btn-danger btn-sm"
          @click="$emit('delete', task.uuid)"
        >
          Remove
        </button>
      </div>
    </div>
  </li>
</template>
<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    markAsCompleted() {
      this.$emit("toggleComplete", this.task.uuid);
    },
  },
};
</script>

<style>
.completed .task-content {
  opacity: 0.6;
}
</style>
