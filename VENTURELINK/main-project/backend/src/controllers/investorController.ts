import { Sequelize, QueryTypes } from 'sequelize'; // Import QueryTypes separately
import sequelize from '../database'; // Assuming your database connection is set up in this file

// Function to get investors by role
export const getInvestorsByRole = async (role: string) => {
  try {
    // Run a raw SQL query to get investors based on the role
    const result = await sequelize.query('SELECT * FROM users2 WHERE role = $1', {
      bind: [role], // Ensure `role` is bound to the query
      type: QueryTypes.SELECT // Use QueryTypes imported directly
    });

    // Return the result (investors matching the role)
    return result; // This will be an array of investors
  } catch (error) {
    // Improved error handling with detailed message
    if (error instanceof Error) {
      console.error('Error fetching investors:', error.message);
      throw new Error(`Error fetching investors: ${error.message}`);
    }
    // Handle unexpected errors
    console.error('Unexpected error:', error);
    throw new Error('Unexpected error occurred while fetching investors');
  }
};
