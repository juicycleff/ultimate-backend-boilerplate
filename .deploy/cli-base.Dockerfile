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
# FROM node:16-alpine as prod-dependencies
######################################################################
# ARG APP_NAME
# WORKDIR /usr/src/app
# ENV NODE_ENV production
# COPY apps/$APP_NAME apps/$APP_NAME
# COPY libs libs
# COPY package*.json nx.json workspace.json ub.json tsconfig.*.json ./
# RUN npm ci --silent --production


######################################################################
FROM node:14-alpine as dev-dependencies
######################################################################
ARG APP_NAME
ARG OPTIONS
WORKDIR /usr/src/app
COPY apps apps
COPY libs libs
COPY prisma prisma
COPY package*.json pnpm-lock.yaml nx.json workspace.json ub.json tsconfig.*.json ./

RUN npm i pnpm -g
RUN pnpm i --frozen-lockfile -s


#######################################################################################
FROM node:14-alpine AS builder
#######################################################################################
ARG APP_NAME
ARG OPTIONS
WORKDIR /usr/src/app
COPY --from=dev-dependencies /usr/src/app /usr/src/app

RUN npm i -g pnpm
RUN pnpm i @nrwl/cli -g

ENV NODE_ENV production
RUN alias pnx="pnpm exec nx --"

RUN nx run persistence:gen
# RUN nx run persistence:migrate

RUN nx build $APP_NAME --configuration=production --generatePackageJson


#######################################################################################
FROM node:14-alpine AS final
#######################################################################################
ARG OPTIONS
ARG APP_NAME
ARG COM_ARG

# Import the user and group files from the first stage.
COPY --from=utils /user/group /user/passwd /etc/
COPY --from=utils /tini /sbin/tini

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist/apps/$APP_NAME .
COPY --from=builder /usr/src/app/libs libs
COPY --from=builder /usr/src/app/prisma prisma

ENV NODE_ENV production

RUN npm i pnpm -g
# install requird deps
RUN pnpm i --prod
RUN pnpm add tslib --prod

# Perform any further action as an unprivileged user.
USER nobody:nobody

# Set tini as entrypoint
ENTRYPOINT ["tini", "--"]

# RUN ECHO $COM_ARG > "node main.js $OPTIONS"
# todo: making  this dynamic
CMD sudo chown -R 65534:65534 "/.npm"
CMD pnpm dlx prisma migrate dev --name init --schema=./libs/persistence/schema.prisma --preview-feature

CMD node main.js start studio
