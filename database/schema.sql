DROP DATABASE IF EXISTS buildaband;

CREATE DATABASE buildaband;

\c buildaband;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  fist_name VARCHAR(255),
  last_name VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(2),
  zip VARCHAR(5),
  abilities TEXT[][],
  seeking TEXT[][]
);

CREATE TABLE instruments
(
  id SERIAL PRIMARY KEY,
  profile_picture VARCHAR(255),
  fist_name VARCHAR(255),
  last_name VARCHAR(255),
  user_name VARCHAR(255),
  abilities TEXT[][],
  seeking TEXT[][],
  city VARCHAR(255),
  state VARCHAR(2),
  zip VARCHAR(5)
);


