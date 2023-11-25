FROM node:alpine
LABEL maintainer="who <wilsonhernandezortiz@gmail.com>"

EXPOSE 3000

WORKDIR /root
#RUN npm install 

WORKDIR /root/logic 

CMD node index.js
