
"use client";
import { useEffect, ElementType } from "react";
import { Users, Book, Library } from "lucide-react";
import useUserStore from "@/store/userStore";
import useBookStore from "@/store/bookStore";
import useLoanStore from "@/store/loanStore";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: number;
  icon: ElementType;
  color: string;
}) => (
  <div
    className={`bg-gradient-to-br ${color} text-white p-6 rounded-lg shadow-lg flex items-center`}
  >
    <Icon className="h-12 w-12 mr-4" />
    <div>
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </div>
);

export default function DashboardPage() {
  const { users, fetchUsers } = useUserStore();
  const { books, fetchBooks } = useBookStore();
  const { loans, fetchLoans } = useLoanStore();

  useEffect(() => {
    fetchUsers();
    fetchBooks();
    fetchLoans();
  }, [fetchUsers, fetchBooks, fetchLoans]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Panel de la Biblioteca</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <StatCard
          title="Usuarios Totales"
          value={users.length}
          icon={Users}
          color="from-blue-400 to-blue-600"
        />
        <StatCard
          title="Libros Totales"
          value={books.length}
          icon={Book}
          color="from-green-400 to-green-600"
        />
        <StatCard
          title="Préstamos Activos"
          value={loans.filter((loan) => loan.estado === "activo").length}
          icon={Library}
          color="from-yellow-400 to-yellow-600"
        />
      </div>
    </div>
  );
}
