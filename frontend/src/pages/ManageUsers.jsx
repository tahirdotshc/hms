import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Select, MenuItem, Button
} from "@mui/material";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      const resUsers = await axios.get("http://localhost:4000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(resUsers.data);

      const resRoles = await axios.get("http://localhost:4000/api/roles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoles(resRoles.data);
    };
    fetchData();
  }, []);

  const handleRoleChange = async (userId, roleId) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    await axios.put(
      `http://localhost:4000/api/users/${userId}/assign-role`,
      { roleId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, role: roleId } : u))
    );
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>
                <Select
                  value={user.role?._id || ""}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  {roles.map((role) => (
                    <MenuItem key={role._id} value={role._id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => alert("Role updated!")}
                >
                  Save
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
