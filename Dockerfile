# Stage 1: Build Stage
FROM node:14 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

FROM node:14

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD ["node", "src/app.js"]
