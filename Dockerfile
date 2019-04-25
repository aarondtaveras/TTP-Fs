FROM node:8
RUN mkdir /ttp-fs
ADD . /ttp-fs
WORKDIR /ttp-fs
RUN npm i
EXPOSE 3000