DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id serial primary key,
    name text not null,
    email varchar(100) unique not null,
    password text not null,
    cpf varchar(11) unique,
    telephone varchar(11)
);

DROP TABLE IF EXISTS clients;
CREATE TABLE clients (
    id serial primary key,
    user_id int not null,
    name text not null,
    email varchar(100) unique not null,
    cpf varchar(11) unique not null,
    telephone varchar(11) not null,
    zip_code varchar(8),
    address text,
    address_2 text,
    district text,
    city text,
    uf varchar(2),
    foreign key (user_id) references users (id)
);
    
DROP TABLE IF EXISTS charges;
CREATE TABLE charges(
    id serial primary key,
    client_id int not null,
    description text not null,
    maturity_date date not null,
    amount int not null,
    paid boolean not null,
    foreign key (client_id ) references clients (id)
);