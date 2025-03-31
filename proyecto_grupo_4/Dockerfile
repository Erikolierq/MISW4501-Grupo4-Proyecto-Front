FROM node:22 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:22-slim
WORKDIR /app

COPY --from=build /app/dist/proyecto_grupo_4/browser /app/dist


COPY server.js ./
COPY package*.json ./

RUN npm install --omit=dev

ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]
