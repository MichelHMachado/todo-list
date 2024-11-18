import Task from "./Task.js";
import User from "./User.js";

const initModels = () => {
  User.hasMany(Task, {
    foreignKey: "userUuid",
    as: "tasks",
  });

  Task.belongsTo(User, {
    foreignKey: "userUuid",
    as: "user",
  });
};

export { User, Task, initModels };
