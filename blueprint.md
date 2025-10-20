
# Blueprint: Sistema de Gestión de Biblioteca

## Visión General

Este documento describe el diseño y las características de un Sistema de Gestión de Biblioteca simple, construido con Next.js, Tailwind CSS, y Zustand para el manejo de estado. La aplicación permite gestionar usuarios, libros y préstamos a través de una interfaz de usuario clara y moderna, conectada a una base de datos PostgreSQL a través de Firebase Data Connect.

## Diseño y Estilo

- **Framework:** Next.js con App Router.
- **Estilos:** Tailwind CSS para un diseño moderno y responsivo.
- **Componentes:** Uso de componentes de React para una interfaz modular y reutilizable.
- **Iconografía:** La biblioteca `lucide-react` se utiliza para agregar iconos claros y consistentes.
- **Paleta de Colores:** Se utiliza una paleta de colores simple y limpia, con fondos grises claros, texto oscuro y colores de acento (azul, verde, amarillo) para elementos interactivos y tarjetas de estadísticas.
- **Layout:** Un diseño de dos columnas con una barra de navegación lateral fija y un área de contenido principal.

## Características Implementadas

### 1. Panel Principal (Dashboard)

- **Ubicación:** `src/app/page.tsx`
- **Descripción:** Muestra una vista general de la biblioteca con tarjetas de estadísticas clave.
- **Componentes:**
  - `StatCard`: Una tarjeta reutilizable para mostrar una estadística con un título, un valor, un icono y un color de fondo degradado.
- **Datos Mostrados:**
  - Número total de usuarios.
  - Número total de libros.
  - Número de préstamos activos.

### 2. Gestión de Estado con Zustand

- **Descripción:** Se utilizan tres stores de Zustand para manejar el estado de los usuarios, libros y préstamos de forma centralizada.
  - `useUserStore`: Gestiona el estado de los usuarios.
  - `useBookStore`: Gestiona el estado de los libros.
  - `useLoanStore`: Gestiona el estado de los préstamos.
- **Funcionalidad:** Cada store se encarga de obtener los datos desde la API y proporciona acciones para crear, actualizar y eliminar registros.

### 3. Secciones de Gestión

- **Usuarios (`/users`):**
  - Muestra una tabla con la lista de usuarios.
  - **Modal de Creación:** Un botón "Crear Usuario" abre un formulario para añadir nuevos usuarios.

- **Libros (`/books`):**
  - Muestra una tabla con la lista de libros.
  - **Modal de Creación:** Un botón "Crear Libro" abre un formulario para añadir nuevos libros.

- **Préstamos (`/loans`):**
  - Muestra una tabla con la lista de préstamos.
  - **Modal de Creación:** Un botón "Crear Préstamo" abre un formulario para registrar nuevos préstamos.

### 4. Traducción al Español

- **Estado:** Completado.
- **Descripción:** Toda la interfaz de usuario ha sido traducida al español.

## Plan para la Solicitud Actual

- **Objetivo:** Añadir funcionalidades de edición/eliminación, mejorar la creación de préstamos y conectar la aplicación a una base de datos PostgreSQL.
- **Fases:**
  1.  **Conexión a la Base de Datos con Firebase Data Connect:**
      - [ ] Inicializar Firebase Data Connect y provisionar una instancia de Cloud SQL.
      - [ ] Generar un esquema GraphQL para los datos de la aplicación.
      - [ ] Refactorizar las API para usar Data Connect en lugar de datos simulados.
  2.  **Implementar Edición y Eliminación:**
      - [ ] Añadir botones de "Editar" y "Eliminar" a las tablas.
      - [ ] Implementar la lógica de eliminación con confirmación.
      - [ ] Implementar la lógica de edición con un modal pre-llenado.
  3.  **Mejorar la Creación de Préstamos:**
      - [ ] Reemplazar los campos de ID en el modal de préstamos con listas desplegables de usuarios y libros.
