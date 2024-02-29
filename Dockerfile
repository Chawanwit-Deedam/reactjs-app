FROM node:alpine3.18 as build

#Declare build time enviroment variable
ARG VITE_API_BASE_URL

#Set default values fir environment valiable
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

#Bild App
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

#Server with Nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/dist .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]