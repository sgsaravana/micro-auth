FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /usr/src/app/
RUN pwd
RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . /usr/src/app/

EXPOSE 11456

CMD [ "npm", "start" ]

# docker build -t <your username>/micro-auth .
# docker run -p 11456:11456 <your username>/micro-auth
