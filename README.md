# 🚗 Importcar

Importcar es un ecommerce full stack desarrollado como proyecto de práctica, enfocado principalmente en la lógica del backend, autenticación, gestión de usuarios, productos y control de acceso mediante roles.

El objetivo del proyecto no fue priorizar el diseño visual, sino desarrollar y conectar las distintas partes de una aplicación full stack.

## 🌐 Demo

La aplicación se encuentra desplegada con:

- Frontend: Netlify
- Backend: Render
- Base de datos: MongoDB Atlas

> El backend utiliza un servicio gratuito de Render, por lo que la primera solicitud puede tardar unos segundos mientras el servidor inicia.

## 🛠️ Tecnologías

### Frontend

- React
- JavaScript
- Vite
- Axios
- React Router

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt

## ⚙️ Funcionalidades

### Productos

- Visualización del catálogo.
- Detalle de productos.
- Paginación.
- Gestión de productos desde el panel administrativo.
- Creación, modificación y eliminación de productos.

### Autenticación

El proyecto cuenta con un sistema de autenticación desarrollado utilizando JWT y bcrypt.

Las contraseñas se almacenan hasheadas y el backend genera un token al iniciar sesión correctamente.

### Roles y permisos

La aplicación diferencia distintos niveles de acceso.

#### No User

Es el estado público de la aplicación.

Los visitantes pueden navegar por las secciones públicas y consultar los productos sin necesidad de iniciar sesión.

#### Client

El proyecto contempla usuarios con rol `client`, con acceso a las funcionalidades correspondientes a un usuario autenticado.

El acceso de prueba público no utiliza credenciales de cliente actualmente.

#### Admin

Los usuarios con rol `admin` tienen acceso a funcionalidades adicionales:

- Panel de administración de productos.
- Panel de administración de usuarios.
- Creación y modificación de productos.
- Eliminación de productos.
- Gestión de usuarios.

Por seguridad, las credenciales de administrador no se encuentran publicadas en este repositorio ni en la demo.

## 🔐 Seguridad

Las rutas administrativas del backend están protegidas mediante autenticación y validación de roles.

El acceso administrativo no se proporciona públicamente debido a que permite realizar modificaciones sobre los datos de la aplicación.

El funcionamiento del panel administrativo puede observarse mediante el código fuente del proyecto o demostrarse de forma privada.

## 🧠 Objetivo del proyecto

Importcar fue desarrollado principalmente para practicar y aplicar conceptos relacionados con desarrollo full stack.

El foco principal se encuentra en:

- Comunicación entre frontend y backend.
- Creación y consumo de una API.
- Persistencia de información en MongoDB.
- Autenticación de usuarios.
- Hash de contraseñas.
- Manejo de JWT.
- Autorización basada en roles.
- Protección de rutas.
- Administración de productos y usuarios.
- Deploy independiente de frontend y backend.

Por este motivo, la interfaz visual tiene un papel secundario frente a la arquitectura y lógica de la aplicación.

## 🏗️ Arquitectura

La aplicación está dividida en dos proyectos independientes:

Frontend (React)
        ↓
      Axios
        ↓
API REST (Node.js + Express)
        ↓
    Mongoose
        ↓
MongoDB Atlas

El frontend consume la API desplegada de forma independiente en Render.

## 📂 Repositorios

El proyecto se encuentra dividido en dos repositorios:

- Frontend
- Backend

Esto permite mantener separadas las responsabilidades de la interfaz y la API.

## 🚀 Deploy

Frontend:
Netlify

Backend:
Render

Base de datos:
MongoDB Atlas

## 👨‍💻 Autor

Joaquín Gonzalez

Desarrollador Web
