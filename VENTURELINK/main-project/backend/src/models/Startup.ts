import sequelize from '../database'; // Correct import
import { Model, DataTypes } from 'sequelize';

class Investor extends Model {
  public id!: number;
  public fullname!: string;
  public email!: string;
  public password!: string;
  public number!: string;
  public sector!: string;
}

Investor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensuring email is unique
      validate: {
        isEmail: true, // Validate that it's a valid email
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the sequelize instance here
    modelName: 'Investor',
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

export default Investor;
