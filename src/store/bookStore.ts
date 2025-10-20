
import { create } from "zustand";
import axios from "axios";

export interface Book {
  id_libro: number;
  titulo: string;
  autor: string;
  genero: string;
  anio_publicacion: number;
  // Campos opcionales que pueden no estar en todos los objetos Book
  isbn?: string;
  editorial?: string;
  cantidad_disponible?: number;
  ubicacion?: string;
}

interface BookState {
  books: Book[];
  fetchBooks: () => Promise<void>;
  addBook: (book: Omit<Book, "id_libro">) => Promise<void>;
  updateBook: (id: number, book: Partial<Book>) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
}

const useBookStore = create<BookState>((set) => ({
  books: [],
  fetchBooks: async () => {
    try {
      const response = await axios.get<Book[]>("/api/books");
      set({ books: response.data });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  },
  addBook: async (book) => {
    try {
      const response = await axios.post<Book>("/api/books", book);
      set((state) => ({ books: [...state.books, response.data] }));
    } catch (error) {
      console.error("Error adding book:", error);
    }
  },
  updateBook: async (id, bookData) => {
    try {
      const response = await axios.put<Book>(`/api/books/${id}`, bookData);
      set((state) => ({
        books: state.books.map((book) =>
          book.id_libro === id ? response.data : book
        ),
      }));
    } catch (error) {
      console.error("Error updating book:", error);
    }
  },
  deleteBook: async (id) => {
    try {
      await axios.delete(`/api/books/${id}`);
      set((state) => ({
        books: state.books.filter((book) => book.id_libro !== id),
      }));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  },
}));

export default useBookStore;
