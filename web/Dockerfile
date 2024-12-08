FROM node:alpine AS development

WORKDIR /web

# Installing dependencies
COPY ./package.json /web

RUN npm install

# Copying all the files in our project
COPY . /web

CMD ["npm", "run", "dev"]