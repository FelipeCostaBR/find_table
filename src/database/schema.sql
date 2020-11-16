CREATE DATABASE project3;

CREATE TABLE restaurantinfo (id INTEGER NOT NULL, name TEXT, geometry NUMERIC[],opening_hours TEXT, place_id TEXT, rating TEXT, types TEXT[], photosurl TEXT, tablereserve REAL, bookingtime INTEGER[]);

INSERT into restaurantinfo(name, geometry, opening_hours, place_id, rating, types, tablereserve, bookingtime) VALUES ('CRUISE BAR', '{-33.86,151.2}', 'true', 'ChIJi6C1MxquEmsR9-c-3O48ykI', '4','{bar,restaurant,food,point_of_interest,establishment}', '1', '{8,9}');

