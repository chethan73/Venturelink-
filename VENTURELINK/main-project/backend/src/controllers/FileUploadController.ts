// // Assuming you are using Sequelize ORM
// import { Sequelize } from 'sequelize';

// // Sequelize model for 'uploads' table
// import { Upload } from './models';  // Adjust the import path

// app.get('/getallFiles', async (req, res) => {
//   try {
//     const files = await Upload.findAll(); // Fetch all files from the 'uploads' table
//     res.status(200).json(files);
//   } catch (error) {
//     console.error('Error fetching files:', error);
//     res.status(500).json({ message: 'Error fetching files', error: error.message });
//   }
// });
