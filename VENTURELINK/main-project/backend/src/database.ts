import { Sequelize } from 'sequelize';

// Create a Sequelize instance with the database configuration
const sequelize = new Sequelize('Venturelink_db', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Set to true if you want to see the SQL queries in the console
});

// Function to test the connection to the database
const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Function to sync the database models (create tables if they don't exist)
const syncDatabase = async (): Promise<void> => {
  try {
    await sequelize.sync({ alter: true }); // Use 'alter: true' to update schema without losing data
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

// Test the connection and synchronize the database
(async () => {
  try {
    await testConnection();
    await syncDatabase();
  } catch (error) {
    console.error('Unexpected error:', error);
  }
})();

// Export the Sequelize instance for use in other parts of the application
export default sequelize;
