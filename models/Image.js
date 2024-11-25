import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

const Image = sequelize.define(
  "Image",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jsonFilePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN, // Updated to BOOLEAN
      allowNull: false,
      defaultValue: false, // Default value is optional
    },
  },
  {
    tableName: "images",
    timestamps: true,
  }
);

export default Image;
