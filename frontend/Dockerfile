FROM node:20.14.0-alpine
WORKDIR /frontend
COPY . .
RUN npm install
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
