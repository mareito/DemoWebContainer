
"use client";
import { useEffect, useState } from "react";
import useUserStore, { User } from "@/store/userStore";
import { Trash2, Pencil } from "lucide-react";

// 1. Modal modificado para creación y edición
const UserModal = ({
  isOpen,
  onClose,
  onSave,
  userToEdit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: Omit<User, "id_usuario" | "fecha_registro">, id?: number) => void;
  userToEdit: User | null;
}) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");

  // Rellenar el formulario si estamos editando
  useEffect(() => {
    if (userToEdit) {
      setNombre(userToEdit.nombre);
      setApellido(userToEdit.apellido);
      setEmail(userToEdit.email);
    } else {
      // Limpiar si es para crear uno nuevo
      setNombre("");
      setApellido("");
      setEmail("");
    }
  }, [userToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ nombre, apellido, email }, userToEdit?.id_usuario);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          {userToEdit ? "Editar Usuario" : "Crear Nuevo Usuario"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700 font-semibold mb-2">Nombre</label>
            <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" required />
          </div>
          <div className="mb-4">
            <label htmlFor="apellido" className="block text-gray-700 font-semibold mb-2">Apellido</label>
            <input type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" required />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" required />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">Cancelar</button>
            <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};


const UserList = () => {
  // 2. Traer todas las funciones del store
  const { users, fetchUsers, addUser, updateUser, deleteUser } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null); // Estado para el usuario a editar

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Abrir modal para crear
  const handleCreate = () => {
    setUserToEdit(null);
    setIsModalOpen(true);
  };

  // Abrir modal para editar
  const handleEdit = (user: User) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  // Guardar (crear o actualizar)
  const handleSave = (userData, id) => {
    if (id) {
      updateUser(id, userData);
    } else {
      addUser({ ...userData, fecha_registro: new Date().toISOString() });
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      deleteUser(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Usuarios</h2>
        <button onClick={handleCreate} className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Crear Usuario</button>
      </div>
      <UserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
        userToEdit={userToEdit} 
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left font-semibold">Nombre</th>
              <th className="p-3 text-left font-semibold">Apellido</th>
              <th className="p-3 text-left font-semibold">Email</th>
              <th className="p-3 text-left font-semibold">Fecha de Registro</th>
              <th className="p-3 text-left font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id_usuario} className="border-b hover:bg-gray-50">
                <td className="p-3">{user.nombre}</td>
                <td className="p-3">{user.apellido}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{new Date(user.fecha_registro).toLocaleDateString()}</td>
                <td className="p-3 flex items-center gap-2">
                  {/* 3. Botón de Editar */}
                  <button onClick={() => handleEdit(user)} className="text-blue-500 hover:text-blue-700 transition-colors">
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(user.id_usuario)} className="text-red-500 hover:text-red-700 transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function UsersPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Gestión de Usuarios</h1>
      <UserList />
    </div>
  );
}
