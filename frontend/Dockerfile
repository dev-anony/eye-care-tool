FROM node:20.14.0-alpine
WORKDIR /navv
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
