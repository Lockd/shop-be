<!-- SQL Script to create set of products for task 4.1 -->
create table product(
	id uuid not null default uuid_generate_v4() primary key,
	title text not null,
	description text,
	price integer
);

create table stock(
	product_id uuid not null default uuid_generate_v4() primary key,
	foreign key (product_id) references product(id),
	count integer
);

insert into product (title, description, price) values ('Clay pot', 'Handmade clay pot covered in blue glossy glaze', 17);
insert into product (title, description, price) values ('Bear statuette', 'Handmade bear statuette, a bit sloppy', 28);
insert into product (title, description, price) values ('Clay bowl ha-ha u fat', 'Huge bowl made of clay with volume of 1.5 liters. Eating out of this vessel will definately help you gain weight', 32);	

insert into stock (product_id, count) values ('129be5f4-c5db-4166-a93a-54e0d676a2db', 3);
insert into stock (product_id, count) values ('1b80b2d3-f9d9-4233-a42b-db7d5784df89', 2);
insert into stock (product_id, count) values ('9f95af9e-7087-41ec-ba49-6815d4834780', 1);

create extension if not exists "uuid-ossp";