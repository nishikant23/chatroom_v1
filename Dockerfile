FROM node:20-alpine

WORKDIR /app/server

COPY ./package*.json ./

RUN npm install

COPY . .

ENV DATABASE_URL=postgresql://postgres:Pass%40nd01@localhost:5433/chatroom?schema=public

RUN npx prisma migrate dev &&\
    npx prisma generate 

EXPOSE 3000

CMD [ "npm", "run", "dev" ]