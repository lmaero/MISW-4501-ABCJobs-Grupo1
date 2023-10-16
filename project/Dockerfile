# Usar una imagen base de Node.js
FROM node:latest

# Establecer un directorio de trabajo
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json
COPY package*.json ./
COPY ./prisma ./prisma

# Establecer la variable de entorno para la conexión a la base de datos
ENV DATABASE_URL="postgresql://postgres:postgres@postgres:5433/postgres"


# Instalar dependencias
RUN npm install
RUN npm install express
RUN npm install nodemon --save-dev
RUN npm install dotenv


 
# Copiar el resto del código fuente de la aplicación
COPY . .

# Exponer el puerto que tu aplicación utiliza
EXPOSE ${PROJECT_PORT}


# Comando para ejecutar tu aplicación
CMD [ "npm", "start" ]