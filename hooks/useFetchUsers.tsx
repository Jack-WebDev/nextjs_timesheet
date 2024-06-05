import { useEffect, useState } from "react";
import axios from "axios";
import { UserProps } from "../types/userProps";

export default function useFetchUsers() {
  const [users, setUsers] = useState<UserProps[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get<UserProps[]>("/api/users/");
      const users = res.data;
      setUsers(users);
    };

    fetchUsers();
  }, []);

  return users;
}
