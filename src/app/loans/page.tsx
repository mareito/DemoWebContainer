
"use client";
import { useEffect, useState } from "react";
import useLoanStore, { Loan } from "@/store/loanStore";
import useUserStore, { User } from "@/store/userStore";
import useBookStore, { Book } from "@/store/bookStore";

interface LoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLoan: (loan: Omit<Loan, 'id_prestamo'>) => void;
}

const LoanModal = ({ isOpen, onClose, onAddLoan }: LoanModalProps) => {
  const [id_usuario, setIdUsuario] = useState("");
  const [id_libro, setIdLibro] = useState("");
  const { users, fetchUsers } = useUserStore();
  const { books, fetchBooks } = useBookStore();

  useEffect(() => {
    fetchUsers();
    fetchBooks();
  }, [fetchUsers, fetchBooks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLoan({ 
      id_usuario: parseInt(id_usuario), 
      id_libro: parseInt(id_libro), 
      fecha_prestamo: new Date().toISOString().split('T')[0],
      fecha_devolucion_esperada: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0], // 15 days from now
      estado: 'activo',
      fecha_devolucion_real: null,
      observaciones: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Crear Nuevo Préstamo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="id_usuario" className="block text-gray-700 font-semibold mb-2">Usuario</label>
            <select id="id_usuario" value={id_usuario} onChange={(e) => setIdUsuario(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" required>
              <option value="">Seleccione un usuario</option>
              {users.map((user) => (
                <option key={user.id_usuario} value={user.id_usuario}>{user.nombre}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="id_libro" className="block text-gray-700 font-semibold mb-2">Libro</label>
            <select id="id_libro" value={id_libro} onChange={(e) => setIdLibro(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" required>
              <option value="">Seleccione un libro</option>
              {books.map((book) => (
                <option key={book.id_libro} value={book.id_libro}>{book.titulo}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancelar</button>
            <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const LoanList = () => {
  const { loans, fetchLoans, addLoan } = useLoanStore();
  const { users, fetchUsers } = useUserStore();
  const { books, fetchBooks } = useBookStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchLoans();
    fetchUsers();
    fetchBooks();
  }, [fetchLoans, fetchUsers, fetchBooks]);

  const getUserName = (id: number) => {
    const user = users.find((user) => user.id_usuario === id);
    return user ? user.nombre : 'Usuario no encontrado';
  };

  const getBookTitle = (id: number) => {
    const book = books.find((book) => book.id_libro === id);
    return book ? book.titulo : 'Libro no encontrado';
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4">Préstamos</h2>
            <button onClick={() => setIsModalOpen(true)} className="mb-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Crear Préstamo</button>
        </div>
      <LoanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddLoan={addLoan} />
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Usuario</th>
            <th className="p-3 text-left">Libro</th>
            <th className="p-3 text-left">Fecha de Préstamo</th>
            <th className="p-3 text-left">Fecha de Devolución</th>
            <th className="p-3 text-left">Estado</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id_prestamo} className="border-b">
              <td className="p-3">{getUserName(loan.id_usuario)}</td>
              <td className="p-3">{getBookTitle(loan.id_libro)}</td>
              <td className="p-3">{formatDate(loan.fecha_prestamo)}</td>
              <td className="p-3">{formatDate(loan.fecha_devolucion_esperada)}</td>
              <td className="p-3">{loan.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function LoansPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Gestión de Préstamos</h1>
      <LoanList />
    </div>
  );
}
