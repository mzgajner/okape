FROM oven/bun:1-alpine AS frontend-build

RUN mkdir -p /usr/src/okape-client
WORKDIR /usr/src/okape-client

COPY ./frontend /usr/src/okape-client
RUN bun install --frozen-lockfile
RUN bun run build

FROM alpine:latest

COPY --from=frontend-build /usr/src/okape-client/dist /pb/pb_public

ARG PB_VERSION=0.28.3

RUN apk add --no-cache \
    unzip \
    ca-certificates

ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_arm64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

COPY ./pb_hooks /pb/pb_hooks

EXPOSE 80

CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:80"]
