import { create } from "zustand";
import axios from "axios";

interface Loan {
  id_prestamo: number;
  id_usuario: number;
  id_libro: number;
  fecha_prestamo: string;
  fecha_devolucion_esperada: string;
  fecha_devolucion_real: string | null;
  estado: string;
  observaciones: string;
}

interface LoanState {
  loans: Loan[];
  fetchLoans: () => Promise<void>;
  addLoan: (loan: Omit<Loan, "id_prestamo">) => Promise<void>;
}

const useLoanStore = create<LoanState>((set) => ({
  loans: [],
  fetchLoans: async () => {
    const response = await axios.get<Loan[]>("/api/loans");
    set({ loans: response.data });
  },
  addLoan: async (loan) => {
    const response = await axios.post<Loan>("/api/loans", loan);
    set((state) => ({ loans: [...state.loans, response.data] }));
  },
}));

export default useLoanStore;
