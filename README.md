# Prueba Técnica - Fullstack Angular + Node.js + MySQL


Este proyecto es una prueba técnica para la vacante de desarrollador fullstack. La aplicación permite el registro y autenticación de usuarios, así como la gestión de tareas personales protegidas con JWT.


## Tecnologías utilizadas


- **Frontend**: Angular (v14)  
- **Backend**: Node.js 14 con Express  
- **Base de datos**: MySQL  
- **Autenticación**: JWT  
- **ORM**: Sequelize  
- **Postman**: Para pruebas de endpoints


---
## Cómo levantar el proyecto


### 1. Backend

Para backend:  
1. Entrar a la carpeta backend: `cd backend`  
2. Instalar dependencias: `npm install`
4. Para desarrollo con recarga automática: `npm run dev`  
5. El servidor corre en http://localhost:3001  
6. Alternativamente, compila con `tsc` y ejecuta con `node dist/index.js`


### 2. Frontend

Para frontend:  
1. Entrar a la carpeta frontend: `cd frontend`
2. Instalar dependencias: `npm install`
4. Para desarrollo y levantar el servidor: ng serve (o npx ng serve si no tienes Angular CLI instalado globalmente)
5. Abrir en el navegador: http://localhost:4200 

### 3. SCRIPT MYSQL

1. Debe existir una base de datos vacía llamada dbtest.

2. Para crearla, ejecutar el siguiente script SQL en MySQL:

CREATE DATABASE IF NOT EXISTS dbtest;

3. La conexión a la base de datos está configurada así en el backend (archivo de conexión):

import { Sequelize } from "sequelize";

const sequelize = new Sequelize('dbtest', 'root', 'carlos12', {
host: 'localhost',
dialect: 'mysql'
});

export default sequelize;

4. Si tu usuario, contraseña o host son diferentes, modifica estos datos en el archivo de conexión antes de levantar el proyecto.

5. Las tablas se crean automáticamente al iniciar la aplicación, por lo que no es necesario crearlas manualmente.


