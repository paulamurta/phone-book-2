# Use an official Node.js runtime as the base image
FROM node:22-alpine AS builder

WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .
RUN npm run build
RUN npm run seed:build

FROM node:22-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /usr/src/app/dist ./build
COPY --from=builder /usr/src/app/seed-dist ./seed-dist
COPY docs ./docs
COPY prisma ./prisma
COPY static ./static

RUN npx prisma generate

EXPOSE 3009

COPY scripts/entrypoint.sh /usr/src/app/
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

CMD [ "node", "build/app.js" ]
