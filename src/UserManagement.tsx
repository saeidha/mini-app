import React, { useState, useEffect } from 'react';

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

interface UserWithCount extends UserData {
  count: number;
}

interface Props {
  initialUser: UserData;
  initialCount: number;
}

const UserManagement: React.FC<Props> = ({ initialUser, initialCount }) => {
  const [users, setUsers] = useState<UserWithCount[]>([]);

  useEffect(() => {
    // Load users from local storage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const parsedUsers: UserWithCount[] = JSON.parse(storedUsers);
      // Check if the initial user is already in the list
      const existingUser = parsedUsers.find(user => user.id === initialUser.id);
      if (existingUser) {
        // Update the existing user's count
        setUsers(parsedUsers.map(user => 
          user.id === initialUser.id ? { ...user, count: initialCount } : user
        ));
      } else {
        // Add the initial user to the list
        setUsers([...parsedUsers, { ...initialUser, count: initialCount }]);
      }
    } else {
      // If no users in storage, add the initial user
      setUsers([{ ...initialUser, count: initialCount }]);
    }
  }, [initialUser, initialCount]);

  useEffect(() => {
    // Save users to local storage whenever the users state changes
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const updateUserCount = (id: number, newCount: number) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, count: newCount } : user
    ));
  };

  return (
    <div>
      <h2>User Management</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.first_name} (ID: {user.id}) - Count: {user.count}
            <button onClick={() => updateUserCount(user.id, user.count + 1)}>
              Increment Count
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;