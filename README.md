# Proyecto Scape Room

Este proyecto es una aplicación para gestionar Scape Rooms, incluyendo la gestión de ubicaciones, eventos y gráficos de datos. Utiliza Node.js, Sequelize, Express para el backend y Angular para el frontend.

## Requisitos

- Node.js (v14 o superior)
- MySQL
- Angular CLI
- Git

## Configuración de la Base de Datos

### Exportar la Base de Datos Existente

1. **Usando MySQL Workbench:**
   - Abre MySQL Workbench y conéctate a tu servidor de base de datos.
   - Ve a **Server** > **Data Export**.
   - Selecciona la base de datos que deseas exportar.
   - Elige **Export to Self-Contained File** y selecciona la ubicación donde deseas guardar el archivo SQL.
   - Haz clic en **Start Export**.

2. **Usando la Línea de Comandos:**
   ```sh
   mysqldump -u [usuario] -p [nombre_base_datos] > [archivo_exportado].sql

## Crear la Nueva Base de Datos

1. Usando MySQL Workbench:

Abre MySQL Workbench y conéctate a tu servidor de base de datos.
Ve a Server > Data Import.
Selecciona Import from Self-Contained File y elige el archivo SQL que exportaste.
Selecciona New... para crear una nueva base de datos.
Dale un nombre a la nueva base de datos y haz clic en OK.
Haz clic en Start Import.

2. Usando la Línea de Comandos:

   ```sh
   mysql -u [usuario] -p
   ```

   ```sql
   CREATE DATABASE nueva_base_datos;
   ```

Sal de MySQL y luego importa el archivo SQL exportado en la nueva base de datos:

   ```sh
   mysql -u [usuario] -p nueva_base_datos < [archivo_exportado].sql
   ```

## Configuración del Backend

### Instalación de Dependencias

1. Clona el repositorio y navega al directorio del backend:
```sh
git clone https://github.com/[tu-usuario]/sprint8.git
cd sprint8/backend
```
2. Instala las dependencias de Node.js:
```sh
npm install
````

## Configuración de Sequelize

1. Crea un archivo config.json en el directorio config con la configuración de la base de datos:

   ``json
   
  "development": {
    "username": "usuario",
    "password": "contraseña",
    "database": "nueva_base_datos",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }

``
2. Inicializa Sequelize:

```sh
npx sequelize-cli init
```

3. Sincroniza los modelos:

   ```sh
   npx sequelize-cli db:migrate
``

## Iniciar el Servidor

Inicia el servidor usando nodemon:

   ```sh
npx nodemon src/index.ts
```

### Configuración del Frontend

## Instalación de Dependencias

1. Navega al directorio del frontend:
   ```sh
   cd ../frontend
   ```
2. Instala las dependencias de Angular:
   ```sh
   npm install
`` 
### Iniciar la Aplicación Angular

Inicia la aplicación Angular:
 ```sh
ng serve
```

### Uso

Abre tu navegador web y navega a http://localhost:4200 para ver la aplicación Angular.
El servidor backend estará corriendo en http://localhost:3001.

### Autor
Silvia Sánchez.
