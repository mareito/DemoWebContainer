
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Book, Home, Users, Library } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/users", label: "Users", icon: Users },
    { href: "/books", label: "Books", icon: Book },
    { href: "/loans", label: "Loans", icon: Library },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800 p-4">
      <div className="flex items-center mb-8">
        <Library className="h-8 w-8 mr-2 text-blue-500" />
        <h1 className="text-2xl font-bold">Library</h1>
      </div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.label} className="mb-2">
              <Link
                href={item.href}
                className={`flex items-center p-2 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-blue-500 text-white shadow-lg"
                    : "hover:bg-gray-200"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
