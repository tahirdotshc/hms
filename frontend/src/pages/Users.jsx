import React, { useEffect, useState, useContext } from "react";
import api from "../api/api";
import PermissionGuard from "../components/PermissionGuard";
import { AuthContext } from "../contexts/AuthContext";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { hasPermission } = useContext(AuthContext);

  useEffect(() => {
    api.get("/users").then(res => setUsers(res.data)).catch(()=>{});
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <PermissionGuard action="users:create" fallback={<></>}>
        <button onClick={()=>{/* open create modal */}}>Create User</button>
      </PermissionGuard>
      <table>
        <thead><tr><th>Username</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role?.name}</td>
              <td>
                {hasPermission("users:update") && <button>Edit</button>}
                {hasPermission("users:delete") && <button>Delete</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
