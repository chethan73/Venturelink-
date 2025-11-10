import { DataTypes, Model } from 'sequelize';
import sequelize from '../database'; // your Sequelize instance

class Message2 extends Model {
  public id!: number;
  public sender_id!: number;
  public receiver_id!: number;
  public message!: string;
  public timestamp!: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Message2.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sender_id: { type: DataTypes.INTEGER, allowNull: false },
    receiver_id: { type: DataTypes.INTEGER, allowNull: false },
    message: { type: DataTypes.STRING, allowNull: false },
    timestamp: { type: DataTypes.DATE, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize, // Sequelize instance
    tableName: 'message2', // Your table name in PostgreSQL
  }
);

export { Message2 };
