# Use an official Node.js runtime as the base image
FROM node:22-alpine AS builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:22-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /usr/src/app/dist ./build
COPY docs ./docs
COPY prisma ./prisma
RUN npx prisma generate

EXPOSE 3009

CMD [ "node", "build/app.js" ]
