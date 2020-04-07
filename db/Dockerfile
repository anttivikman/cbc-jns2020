FROM postgres:alpine

COPY ./init /docker-entrypoint-initdb.d
RUN chown -R postgres:postgres /docker-entrypoint-initdb.d