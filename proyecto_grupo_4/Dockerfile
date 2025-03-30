# Etapa 1: construir Angular
FROM node:22 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: imagen final para Cloud Run
FROM node:22-slim
WORKDIR /app

# Copiamos el build de Angular y el servidor Express
COPY --from=build /app/dist/proyecto_grupo_4/browser /app/dist


COPY server.js ./
COPY package*.json ./

# Instalamos solo dependencias de producción
RUN npm install --omit=dev

# Cloud Run espera que escuchemos en este puerto
ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]
