
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Library Management System",
  description: "A simple library management system built with Next.js and Firebase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-800`}>
        <div className="flex h-screen">
          <aside className="w-64 bg-gray-800 text-white p-6">
            <h1 className="text-2xl font-bold mb-8">Biblioteca</h1>
            <nav>
              <ul>
                <li>
                  <Link href="/" className="block p-4 hover:bg-gray-700 rounded-lg">Panel</Link>
                </li>
                <li>
                  <Link href="/users" className="block p-4 hover:bg-gray-700 rounded-lg">Usuarios</Link>
                </li>
                <li>
                  <Link href="/books" className="block p-4 hover:bg-gray-700 rounded-lg">Libros</Link>
                </li>
                <li>
                  <Link href="/loans" className="block p-4 hover:bg-gray-700 rounded-lg">Préstamos</Link>
                </li>
              </ul>
            </nav>
          </aside>
          <main className="flex-1 p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
