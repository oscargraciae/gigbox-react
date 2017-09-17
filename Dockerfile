FROM node:6-onbuild

ADD . /gigbox-react
WORKDIR /gigbox-react

COPY package.json /gigbox-react
RUN npm install

# COPY . /gigbox-react

#EXPOSE 3001
#CMD ["node", "server.js"]