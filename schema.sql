-- MySQL Script generated by MySQL Workbench
-- Sun Jan  3 19:05:27 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema utopia
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `utopia` ;

-- -----------------------------------------------------
-- Schema utopia
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `utopia` DEFAULT CHARACTER SET utf8 ;
USE `utopia` ;

-- -----------------------------------------------------
-- Table `utopia`.`airport`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `utopia`.`airport` ;

CREATE TABLE IF NOT EXISTS `utopia`.`airport` (
  `iata_id` CHAR(3) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`iata_id`),
  UNIQUE INDEX `iata_id_UNIQUE` (`iata_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `utopia`.`route`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `utopia`.`route` ;

CREATE TABLE IF NOT EXISTS `utopia`.`route` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `origin_id` CHAR(3) NOT NULL,
  `destination_id` CHAR(3) NOT NULL,
  PRIMARY KEY (`id`, `origin_id`, `destination_id`),
  INDEX `fk_route_airport1_idx` (`origin_id` ASC) VISIBLE,
  INDEX `fk_route_airport2_idx` (`destination_id` ASC) VISIBLE,
  UNIQUE INDEX `unique_route` (`origin_id` ASC, `destination_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_route_airport1`
    FOREIGN KEY (`origin_id`)
    REFERENCES `utopia`.`airport` (`iata_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_route_airport2`
    FOREIGN KEY (`destination_id`)
    REFERENCES `utopia`.`airport` (`iata_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `utopia`.`flight`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `utopia`.`flight` ;

CREATE TABLE IF NOT EXISTS `utopia`.`flight` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `route_id` INT UNSIGNED NOT NULL,
  `departure_time` DATETIME NOT NULL,
  `flight_duration` TIME NULL,
  `capacity` INT NOT NULL,
  `seat_price` FLOAT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_flight_tbl_route1_idx` (`route_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_flight_tbl_route1`
    FOREIGN KEY (`route_id`)
    REFERENCES `utopia`.`route` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `utopia`.`user_role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `utopia`.`user_role` ;

CREATE TABLE IF NOT EXISTS `utopia`.`user_role` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `utopia`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `utopia`.`user` ;

CREATE TABLE IF NOT EXISTS `utopia`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_id` INT UNSIGNED NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_user_role1_idx` (`role_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  CONSTRAINT `fk_user_user_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `utopia`.`user_role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `utopia`.`booking`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `utopia`.`booking` ;

CREATE TABLE IF NOT EXISTS `utopia`.`booking` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `booker_id` INT UNSIGNED NOT NULL,
  `is_active` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_booking_tbl_users1_idx` (`booker_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_booking_tbl_users1`
    FOREIGN KEY (`booker_id`)
    REFERENCES `utopia`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `utopia`.`passenger`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `utopia`.`passenger` ;

CREATE TABLE IF NOT EXISTS `utopia`.`passenger` (
  `id` INT UNSIGNED NOT NULL,
  `booking_id` INT UNSIGNED NOT NULL,
  `given_name` VARCHAR(255) NOT NULL,
  `family_name` VARCHAR(255) NOT NULL,
  `dob` DATE NOT NULL,
  `gender` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `booking_id`),
  INDEX `fk_traveler_booking1_idx` (`booking_id` ASC) VISIBLE,
  CONSTRAINT `fk_traveler_booking1`
    FOREIGN KEY (`booking_id`)
    REFERENCES `utopia`.`booking` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `utopia`.`flight_bookings`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `utopia`.`flight_bookings` ;

CREATE TABLE IF NOT EXISTS `utopia`.`flight_bookings` (
  `flight_id` INT UNSIGNED NOT NULL,
  `booking_id` INT UNSIGNED NOT NULL,
  INDEX `fk_tbl_flights_has_tbl_bookings_tbl_bookings1_idx` (`booking_id` ASC) VISIBLE,
  INDEX `fk_tbl_flights_has_tbl_bookings_tbl_flights1_idx` (`flight_id` ASC) VISIBLE,
  PRIMARY KEY (`booking_id`, `flight_id`),
  CONSTRAINT `fk_tbl_flights_has_tbl_bookings_tbl_flights1`
    FOREIGN KEY (`flight_id`)
    REFERENCES `utopia`.`flight` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_tbl_flights_has_tbl_bookings_tbl_bookings1`
    FOREIGN KEY (`booking_id`)
    REFERENCES `utopia`.`booking` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `utopia`.`user_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `utopia`.`user_info` ;

CREATE TABLE IF NOT EXISTS `utopia`.`user_info` (
  `user_id` INT UNSIGNED NOT NULL,
  `given_name` VARCHAR(255) NOT NULL,
  `family_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  INDEX `fk_customer_info_user1_idx` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC) VISIBLE,
  CONSTRAINT `fk_customer_info_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `utopia`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `utopia`.`booking_payment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `utopia`.`booking_payment` ;

CREATE TABLE IF NOT EXISTS `utopia`.`booking_payment` (
  `booking_id` INT UNSIGNED NOT NULL,
  `stripe_id` VARCHAR(255) NOT NULL,
  `refunded` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`booking_id`),
  INDEX `fk_booking_payment_booking1_idx` (`booking_id` ASC) VISIBLE,
  CONSTRAINT `fk_booking_payment_booking1`
    FOREIGN KEY (`booking_id`)
    REFERENCES `utopia`.`booking` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `utopia` ;

-- -----------------------------------------------------
-- Placeholder table for view `utopia`.`flight_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `utopia`.`flight_status` (`id` INT, `route_id` INT, `departure_time` INT, `flight_duration` INT, `capacity` INT, `seat_price` INT, `passenger_count` INT);

-- -----------------------------------------------------
-- Placeholder table for view `utopia`.`flight_passengers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `utopia`.`flight_passengers` (`flight_id` INT, `booking_id` INT, `passenger_id` INT, `given_name` INT, `family_name` INT, `dob` INT, `gender` INT, `address` INT);

-- -----------------------------------------------------
-- View `utopia`.`flight_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `utopia`.`flight_status`;
DROP VIEW IF EXISTS `utopia`.`flight_status` ;
USE `utopia`;
CREATE  OR REPLACE VIEW `flight_status` AS SELECT
	flight.*,
    flight_passenger_count.passenger_count
    FROM
	flight
    INNER JOIN
    (SELECT
		flight_id,
        COUNT(*) AS passenger_count
        FROM
        flight_passengers
        GROUP BY flight_id
	) AS flight_passenger_count;

-- -----------------------------------------------------
-- View `utopia`.`flight_passengers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `utopia`.`flight_passengers`;
DROP VIEW IF EXISTS `utopia`.`flight_passengers` ;
USE `utopia`;
CREATE  OR REPLACE VIEW `flight_passengers` AS SELECT
	flight_bookings.flight_id,
    flight_bookings.booking_id,
    passenger.id as passenger_id,
    passenger.given_name,
    passenger.family_name,
    passenger.dob,
    passenger.gender,
    passenger.address
    FROM flight_bookings INNER JOIN passenger ON flight_bookings.booking_id = passenger.booking_id;
USE `utopia`;

DELIMITER $$

USE `utopia`$$
DROP TRIGGER IF EXISTS `utopia`.`route_BEFORE_INSERT` $$
USE `utopia`$$
CREATE DEFINER = CURRENT_USER TRIGGER `utopia`.`route_BEFORE_INSERT` BEFORE INSERT ON `route` FOR EACH ROW
BEGIN
	IF (NEW.origin_id = NEW.destination_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'origin cannot be same as destination';
	END IF;
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `utopia`.`airport`
-- -----------------------------------------------------
START TRANSACTION;
USE `utopia`;
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('JFK', 'New York');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('PDX', 'Portland');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('AAA', 'Anaa');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('AAB', 'Arrabury');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('AAC', 'El Arish');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('AAD', 'Adado');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('AAE', 'Annaba');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('AAF', 'Apalachicola');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('AAG', 'Arapoti');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('AAH', 'Aachen');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('AAI', 'Arraias');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('BAA', 'Bialla');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('BAB', 'Marysville');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('CAA', 'Catacamas');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('CAB', 'Cabinda');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('DAA', 'Fort Belvoir');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('DAB', 'Daytona Beach');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('EAA', 'Eagle');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('EAB', 'Abbs');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('FAA', 'Faranah');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('FAB', 'Farnborough');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('GAA', 'Guamal');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('GAB', 'Gabbs');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('HAA', 'Hasvik');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('HAB', 'Hamilton');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('IAA', 'Igarka');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('IAB', 'Wichita');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('JAA', 'Jalalabad');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('JAB', 'Jabiru');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('KAA', 'Kasama');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('KAB', 'Kariba');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('LAA', 'Lamar');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('LAB', 'Lab Lab');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('MAA', 'Chennai');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('MAB', 'Marabá');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('NAA', 'Narrabri');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('NAC', 'Narcoorte');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('OAA', 'Gardez');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('OAG', 'Orange');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('PAA', 'Hpa-An');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('PAB', 'Bilaspur');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('QAQ', 'L\'Aquila');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('QBC', 'Bella Coola');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('RAA', 'Rakanda');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('RAB', 'Rabaul');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('SAA', 'Saratoga');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('SAB', 'Saba');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('TAA', 'Tarapaina');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('TAB', 'Tobago');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('UAB', 'Adana');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('UAC', 'San Luis Río Colorado');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('VAA', 'Vaasa');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('VAB', 'Yavarate');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('WAA', 'Wales');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('WAC', 'Wacca');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('XAI', 'Xinyang');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('XAL', 'Álamos');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('YAA', 'Anahim Lake');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('YAB', 'Arctic Bay');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('ZAA', 'Alice Arm');
INSERT INTO `utopia`.`airport` (`iata_id`, `city`) VALUES ('ZAC', 'York Landing');

COMMIT;


-- -----------------------------------------------------
-- Data for table `utopia`.`user_role`
-- -----------------------------------------------------
START TRANSACTION;
USE `utopia`;
INSERT INTO `utopia`.`user_role` (`id`, `name`) VALUES (1, 'ADMIN');
INSERT INTO `utopia`.`user_role` (`id`, `name`) VALUES (2, 'CUSTOMER');
INSERT INTO `utopia`.`user_role` (`id`, `name`) VALUES (3, 'AGENT');

COMMIT;


-- -----------------------------------------------------
-- Data for table `utopia`.`user`
-- -----------------------------------------------------
START TRANSACTION;
USE `utopia`;
INSERT INTO `utopia`.`user` (`id`, `role_id`, `username`, `password`) VALUES (1, 3, 'user1', '$2b$10$canjw1GZw63fBLUCpgDh2eFLxlseC6Rk9tBgbFPpla4SCS7IcaMu6');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `username`, `password`) VALUES (2, 3, 'user2', '$2b$10$ZjRvQ7GnNHEaBRpNZxAnRuHhUqcJ4Rphq2wltOD9N2hXKddYJBoIK');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `username`, `password`) VALUES (3, 3, 'user3', '$2b$10$pwEp.EGA9NdOb1Q7pjq2qe3C55uFGondZmmSEEU9G3CaLILZRNDOC');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `username`, `password`) VALUES (4, 3, 'user4', '$2b$10$pKOhkeAlum7VaB9/4kesbONjiYMdM/8igLTLlRgTJ/joFGN0imptC');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `username`, `password`) VALUES (5, 3, 'user5', '$2b$10$hmZBExxU3.H2m.kVyf21WOm7YvA6W8XemHa7/MdEtoR09ZtqdqitK');

COMMIT;


-- -----------------------------------------------------
-- Data for table `utopia`.`booking`
-- -----------------------------------------------------
# START TRANSACTION;
# USE `utopia`;
# INSERT INTO `utopia`.`booking` (`id`, `booker_id`, `is_active`) VALUES (1, 1, 1);
# INSERT INTO `utopia`.`booking` (`id`, `booker_id`, `is_active`) VALUES (2, 1, 1);
# INSERT INTO `utopia`.`booking` (`id`, `booker_id`, `is_active`) VALUES (3, 5, 1);
# INSERT INTO `utopia`.`booking` (`id`, `booker_id`, `is_active`) VALUES (4, 3, 0);
# INSERT INTO `utopia`.`booking` (`id`, `booker_id`, `is_active`) VALUES (5, 2, 1);
#
# COMMIT;

