
import { create } from "zustand";
import axios from "axios";

export interface User {
  id_usuario: number;
  nombre: string;
  apellido: string;
  email: string;
  fecha_registro: string;
  // Campos opcionales que pueden no estar en todos los objetos User
  telefono?: string;
  direccion?: string;
  estado?: string;
}

interface UserState {
  users: User[];
  fetchUsers: () => Promise<void>;
  addUser: (user: Omit<User, "id_usuario">) => Promise<void>;
  updateUser: (id: number, user: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
  users: [],
  fetchUsers: async () => {
    try {
      const response = await axios.get<User[]>("/api/users");
      set({ users: response.data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
  addUser: async (user) => {
    try {
      const response = await axios.post<User>("/api/users", user);
      set((state) => ({ users: [...state.users, response.data] }));
    } catch (error) {
      console.error("Error adding user:", error);
    }
  },
  updateUser: async (id, userData) => {
    try {
      const response = await axios.put<User>(`/api/users/${id}`, userData);
      set((state) => ({
        users: state.users.map((user) =>
          user.id_usuario === id ? response.data : user
        ),
      }));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  },
  deleteUser: async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      set((state) => ({
        users: state.users.filter((user) => user.id_usuario !== id),
      }));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  },
}));

export default useUserStore;
