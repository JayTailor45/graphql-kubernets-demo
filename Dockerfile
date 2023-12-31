FROM node:alpine AS development
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install as --only=prod

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3001

CMD ["node", "dist/main"]