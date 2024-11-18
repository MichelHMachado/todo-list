import { api } from "./api";

export const createTask = async (taskData) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await api.post("/tasks", taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createMockTasks = async (count = 100) => {
  try {
    const response = await api.post("/tasks/generate", {
      count: count,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTasks = async () => {
  try {
    const response = await api.get("/tasks/");

    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const editTask = async (task) => {
  try {
    const response = await api.put(`/tasks/${task.uuid}`, task);

    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

export const deleteTask = async (taskId) => {
  try {
    await api.delete(`/tasks/${taskId}`);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

export const toggleTaskCompleted = async (taskId) => {
  try {
    await api.patch(`/tasks/${taskId}/completed`);
  } catch (error) {
    console.error("Error toggling task completion:", error);
  }
};
