import { DataTypes, Model } from "sequelize";
// import sequelize from "../database"; // Ensure you have a Sequelize instance

class Message extends Model {
  public id!: number;
  public sender_id!: number;
  public receiver_id!: number;
  public message!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Message.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     sender_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     receiver_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     message: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//   },
//   // {
//   //   // sequelize,
//   //   // tableName: "message2",
//   //   // timestamps: true, // Automatically adds `createdAt` and `updatedAt`
//   // }
// );

export default Message;
