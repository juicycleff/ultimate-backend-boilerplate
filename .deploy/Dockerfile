#######################################################################################
FROM alpine AS utils
#######################################################################################
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini-static /tini
RUN chmod +x /tini
# Create the user and group files that will be used in the running container to
# run the process as an unprivileged user.
RUN mkdir /user && \
  echo 'nobody:x:65534:65534:nobody:/:' > /user/passwd && \
  echo 'nobody:x:65534:' > /user/group


######################################################################
FROM node:16-alpine as prod-dependencies
######################################################################
ARG APP_NAME
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY apps/$APP_NAME apps/$APP_NAME
COPY libs libs
COPY package*.json nx.json workspace.json ub.json tsconfig.*.json ./
RUN npm ci --silent --production


######################################################################
FROM node:14-alpine as dev-dependencies
######################################################################
ARG APP_NAME
WORKDIR /usr/src/app
COPY apps/$APP_NAME apps/$APP_NAME
COPY libs libs
COPY package*.json nx.json workspace.json ub.json tsconfig.*.json ./
RUN npm ci --silent


#######################################################################################
FROM node:14-alpine AS builder
#######################################################################################
ARG APP_NAME
WORKDIR /usr/src/app
COPY --from=dev-dependencies /usr/src/app /usr/src/app

RUN npm i -g npm@latest
RUN npm i @nrwl/cli -g

ENV NODE_ENV production
RUN nx build $APP_NAME --configuration=production


#######################################################################################
FROM node:14-alpine AS final
#######################################################################################
ARG PORT
ARG APP_NAME

# Import the user and group files from the first stage.
COPY --from=utils /user/group /user/passwd /etc/
COPY --from=utils /tini /sbin/tini

WORKDIR /usr/src/app
COPY --from=prod-dependencies /usr/src/app/package*.json  .
COPY --from=prod-dependencies /usr/src/app/node_modules  ./node_modules
COPY --from=builder /usr/src/app/dist/apps/$APP_NAME .

EXPOSE $PORT
# Perform any further action as an unprivileged user.
USER nobody:nobody

# Set tini as entrypoint
ENTRYPOINT ["tini", "--"]

CMD ["node", "main.js"]
