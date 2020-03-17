CREATE TABLE fruits (
  id serial PRIMARY KEY,
  "type" varchar NOT NULL,
  name varchar NOT NULL
);

CREATE TABLE cars (
  id serial PRIMARY KEY,
  make varchar NOT NULL,
  model varchar NOT NULL
);