
# 📚 Gestor de Tareas - IHC

Aplicación web desarrollada con **React**, **TypeScript** y **Vite** para la gestión y el control de tareas académicas, implementando buenas prácticas de Interacción Humano-Computador (IHC), validaciones estrictas de formularios y manejo de estados globales.

## ✨ Características principales

- **Formulario dinámico con estado unificado:** Control de múltiples campos mediante un objeto de estado centralizado y manejadores de eventos optimizados.
- **Validaciones académicas:**
  - Validación de campos obligatorios (materia y docente).
  - Validación de longitud en la descripción de la tarea (mínimo 10 caracteres reales, excluyendo espacios en blanco).
  - Restricción de fechas de entrega mediante un calendario dinámico que bloquea fechas pasadas.
- **Gestión de estados globales:** Actualización de la lista de tareas en tiempo real utilizando el operador *spread* y comunicación entre componentes mediante *props*.
- **Tipado estricto:** Desarrollado íntegramente en TypeScript para mejorar la robustez del código y reducir errores durante el desarrollo.

## 🛠️ Tecnologías utilizadas

- [React](https://react.dev/) (Componentes funcionales y Hooks como `useState`).
- [TypeScript](https://www.typescriptlang.org/).
- [Vite](https://vite.dev/).
- [Tailwind CSS](https://tailwindcss.com/) (Estilos e interfaz de usuario).

## 🚀 Instalación y ejecución local

Sigue estos pasos para clonar y ejecutar el proyecto en tu máquina local.

### 1. Clonar el repositorio

```bash
git clone https://github.com/JusselAvila/gestor-tareas-ihc.git
```

### 2. Entrar al directorio del proyecto

```bash
cd gestor-tareas-ihc
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

Una vez iniciado el servidor, abre en tu navegador la URL que aparece en la terminal.

## 📂 Estructura del proyecto

La estructura puede variar según la organización actual del repositorio.

```text
gestor-tareas-ihc/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 📖 Contexto académico

Este proyecto forma parte del área de **Interacción Humano-Computador (IHC)** y tiene como objetivo aplicar principios de diseño de interfaces, validación de datos y gestión de estados en una aplicación web orientada a la organización de tareas académicas.

## 👨‍💻 Autor

**Jussel Ávila**

Repositorio: [gestor-tareas-ihc](https://github.com/JusselAvila/gestor-tareas-ihc)

