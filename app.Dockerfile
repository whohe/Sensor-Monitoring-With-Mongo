FROM node:alpine
LABEL maintainer="who <wilsonhernandezortiz@gmail.com>"

WORKDIR /root
#RUN npm install 

COPY app.entrypoint.sh /entrypoint.sh
RUN chmod 775 /entrypoint.sh
ENTRYPOINT /entrypoint.sh

