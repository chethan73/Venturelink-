import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../app/lib/users';

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };

    getUsers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Users List</h1>
      <ul className="mt-4">
        {users.map((user: any) => (
          <li key={user.id} className="p-2 border-b">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;



// Backend code 
