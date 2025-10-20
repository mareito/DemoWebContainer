
"use client";
import { useEffect, useState } from "react";
import useBookStore, { Book } from "@/store/bookStore";
import { Trash2, Pencil } from "lucide-react";

const BookModal = ({
  isOpen,
  onClose,
  onSave,
  bookToEdit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: Omit<Book, "id_libro">, id?: number) => void;
  bookToEdit: Book | null;
}) => {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [anio_publicacion, setAnioPublicacion] = useState("");

  useEffect(() => {
    if (bookToEdit) {
      setTitulo(bookToEdit.titulo);
      setAutor(bookToEdit.autor);
      setGenero(bookToEdit.genero);
      setAnioPublicacion(bookToEdit.anio_publicacion.toString());
    } else {
      setTitulo("");
      setAutor("");
      setGenero("");
      setAnioPublicacion("");
    }
  }, [bookToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ titulo, autor, genero, anio_publicacion: parseInt(anio_publicacion) }, bookToEdit?.id_libro);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          {bookToEdit ? "Editar Libro" : "Crear Nuevo Libro"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="titulo" className="block text-gray-700 font-semibold mb-2">Título</label>
            <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" required />
          </div>
          <div className="mb-4">
            <label htmlFor="autor" className="block text-gray-700 font-semibold mb-2">Autor</label>
            <input type="text" id="autor" value={autor} onChange={(e) => setAutor(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" required />
          </div>
          <div className="mb-4">
            <label htmlFor="genero" className="block text-gray-700 font-semibold mb-2">Género</label>
            <input type="text" id="genero" value={genero} onChange={(e) => setGenero(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" required />
          </div>
          <div className="mb-6">
            <label htmlFor="anio_publicacion" className="block text-gray-700 font-semibold mb-2">Año de Publicación</label>
            <input type="number" id="anio_publicacion" value={anio_publicacion} onChange={(e) => setAnioPublicacion(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" required />
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

const BookList = () => {
  const { books, fetchBooks, addBook, updateBook, deleteBook } = useBookStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleCreate = () => {
    setBookToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (book: Book) => {
    setBookToEdit(book);
    setIsModalOpen(true);
  };

  const handleSave = (bookData, id) => {
    if (id) {
      updateBook(id, bookData);
    } else {
      addBook(bookData);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este libro?")) {
      deleteBook(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Libros</h2>
        <button onClick={handleCreate} className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Crear Libro</button>
      </div>
      <BookModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
        bookToEdit={bookToEdit} 
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left font-semibold">Título</th>
              <th className="p-3 text-left font-semibold">Autor</th>
              <th className="p-3 text-left font-semibold">Género</th>
              <th className="p-3 text-left font-semibold">Año de Publicación</th>
              <th className="p-3 text-left font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id_libro} className="border-b hover:bg-gray-50">
                <td className="p-3">{book.titulo}</td>
                <td className="p-3">{book.autor}</td>
                <td className="p-3">{book.genero}</td>
                <td className="p-3">{book.anio_publicacion}</td>
                <td className="p-3 flex items-center gap-2">
                  <button onClick={() => handleEdit(book)} className="text-blue-500 hover:text-blue-700 transition-colors">
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(book.id_libro)} className="text-red-500 hover:text-red-700 transition-colors">
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

export default function BooksPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Gestión de Libros</h1>
      <BookList />
    </div>
  );
}
