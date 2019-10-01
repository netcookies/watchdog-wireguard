FROM node:alpine

RUN mkdir /app
ADD gulpfile.js /app/gulpfile.js
ADD package.json /app/package.json
RUN cd /app \
    && npm install gulp-cli -g \
    && npm install gulp -D \
    && npm install gulp-exec

WORKDIR /app/

ENTRYPOINT ["gulp"]
