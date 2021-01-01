START TRANSACTION;
USE `utopia`;
INSERT IGNORE INTO utopia.user (id, role_id, username, password) VALUES (1, 3,'user1','pass1');
INSERT IGNORE INTO utopia.user (id, role_id, username, password) VALUES (2, 3,'user2','pass2');
INSERT IGNORE INTO utopia.user (id, role_id, username, password) VALUES (3, 3,'user3','pass3');
INSERT IGNORE INTO utopia.user (id, role_id, username, password) VALUES (4, 3,'user4','pass4');
INSERT IGNORE INTO utopia.user (id, role_id, username, password) VALUES (5, 3,'user5','pass5');
INSERT IGNORE INTO utopia.booking (id, booker_id, is_active) VALUES (1, 1, 1);
INSERT IGNORE INTO utopia.booking (id, booker_id, is_active) VALUES (2, 1, 1);
INSERT IGNORE INTO utopia.booking (id, booker_id, is_active) VALUES (3, 5, 1);
INSERT IGNORE INTO utopia.booking (id, booker_id, is_active) VALUES (4, 3, 0);
INSERT IGNORE INTO utopia.booking (id, booker_id, is_active) VALUES (5, 2, 1);
COMMIT;

select * from booking;
select * from passenger;
select * from user;
select * from user_info;