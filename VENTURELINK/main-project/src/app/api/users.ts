const API_URL = process.env.API_URL || 'http://localhost:5000/api';

export const fetchUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Rethrow the error for further handling
    }
};

export const fetchUserById = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/users/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error);
        throw error; // Rethrow the error for further handling
    }
};
