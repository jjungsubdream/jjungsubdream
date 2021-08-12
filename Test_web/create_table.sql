CREATE DATABASE IF NOT EXISTS ie_admin_db;
USE ie_admin_db;

DROP TABLE if exists admin_data;
CREATE TABLE IF NOT EXISTS admin_data (
    id varchar(320) NOT NULL,
    `password` varchar(100) NOT NULL,
    primary key(id)
);

insert into admin_data (id, `password`) values ("admin", "subdream");

select * 
from admin_data;


