DROP DATABASE IF EXISTS buildaband;

CREATE DATABASE buildaband;

\c buildaband;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(2),
  zip VARCHAR(5),
  latitude FLOAT,
  longitude FLOAT,
  abilities TEXT[],
  seeking TEXT[]
);

CREATE TABLE instruments
(
  id SERIAL PRIMARY KEY,
  instrument VARCHAR(255)
);
