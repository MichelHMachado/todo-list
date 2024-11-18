<template>
  <div class="task-form">
    <h3>{{ form.uuid ? "Edit task" : "Add task" }}</h3>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          class="form-control"
          required
          placeholder="Type task's title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          class="form-control"
          placeholder="Type the description"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="priority">Priority</label>
        <select
          id="priority"
          v-model="form.priority"
          class="form-control"
          required
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">
        {{ form.uuid ? "Save" : "Add" }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    initialData: {
      type: Object,
      default: () => ({
        title: "",
        description: "",
        priority: "",
        completed: false,
      }),
    },
  },
  data() {
    return {
      form: { ...this.initialData },
    };
  },
  methods: {
    ...mapActions("tasks", ["addTask", "editTask"]),
    submitForm() {
      if (this.form.uuid) {
        this.editTask(this.form);
      } else {
        this.addTask(this.form);
      }
      this.$emit("close");
    },
  },
};
</script>
