import React, { useState, useEffect } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:5000/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        alert("Error fetching users.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Registered Users</h2>
      {users.length === 0 ? (
        <p>No users registered yet.</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersPage;
