import sequelize from "../database.js";
import { DataTypes } from "sequelize";
import User from "./User.js";

const Task = sequelize.define(
  "Task",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    priority: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "uuid",
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

Task.belongsTo(User, {
  foreignKey: "userUuid",
  as: "user",
});

export default Task;
