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
-- Table `utopia`.`user_role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `utopia`.`user_role` ;

CREATE TABLE IF NOT EXISTS `utopia`.`user_role` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `utopia`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `utopia`.`user` ;

CREATE TABLE IF NOT EXISTS `utopia`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_id` INT UNSIGNED NOT NULL,
  `given_name` VARCHAR(255) NOT NULL,
  `family_name` VARCHAR(255) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_user_role1_idx` (`role_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC) VISIBLE,
  CONSTRAINT `fk_user_user_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `utopia`.`user_role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


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
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (1001, 1, 'Admin', 'Admin', 'admin', '$2b$11$hOMJUkFQ.Qlab0gwUW4sG.cReLvirZcFQmFFyxmAtGDSq253f.YW2', 'admin@utopia.com', '56760989888');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (1, 2, 'Erma', 'Gheorghescu', 'egheorghescu0', '$2b$11$BBs6TzH1xmeE9p9j.cwRc.M2GLrhCWtoqYP.j2xKCi47rminRB1qm', 'egheorghescu0@washington.edu', '4737493544');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (2, 2, 'Trever', 'McKernan', 'tmckernan1', '$2b$11$Fmeg7pJ3Crt7.3BX7oi8PebfX6wEAUWcLcqsF3C7f6fuxBqol1lxe', 'tmckernan1@hibu.com', '1138845977');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (3, 2, 'Isadora', 'Scapelhorn', 'iscapelhorn2', '$2b$11$9IFei6rmXfqhPgBjiqLof.SihePjBdv/zqPC.ffWtu0CR8uYeFhwO', 'iscapelhorn2@cbc.ca', '2273873648');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (4, 2, 'Johannes', 'Wille', 'jwille3', '$2b$11$akj5xWz6V6PTO5R.IrB1Ze0dM/TEYqWYewT8.FwVZqgjzceILqQGG', 'jwille3@berkeley.edu', '7656343944');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (5, 2, 'Leonore', 'Hodcroft', 'lhodcroft4', '$2b$11$mkC.Sy2il.A7iksxEeBcJ.wCamuvjG8SPV12o14hsxE8Vhxdjc6Hi', 'lhodcroft4@paypal.com', '7091094249');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (6, 2, 'Piper', 'Dahlborg', 'pdahlborg5', '$2b$11$1FDRUNraQZi6AS5Ll5wGl.TKQCrnwu08ET0HaIc46s3/HQn.40NNe', 'pdahlborg5@lulu.com', '9346089618');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (7, 2, 'Collin', 'Laydel', 'claydel6', '$2b$11$hBVA5bAtJVTzw/E4blXjE.JJAbfMZEash3xn0CmqeiyDgCgUZ2IvG', 'claydel6@unblog.fr', '8421830461');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (8, 2, 'Virgil', 'Ghiotto', 'vghiotto7', '$2b$11$o5vrmFhHUvBppIYnPGovm.hcuU29PiUc7EYTm7b3AEsOWVROubita', 'vghiotto7@elpais.com', '7515928654');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (9, 2, 'Rosalinde', 'Rutt', 'rrutt8', '$2b$11$MeqzTrzFcuffdbD1J/6SIeNo.oA27z6OXAqMc7eP3AXgeTOudQ5S2', 'rrutt8@cpanel.net', '8037677665');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (10, 2, 'Herve', 'Keepin', 'hkeepin9', '$2b$11$AXU/wiMqrPFhLa5.7iazz.vZgTsLC7LYT.hda12Q2f1R1aQkZU47G', 'hkeepin9@alibaba.com', '2458941997');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (11, 2, 'Annemarie', 'Rubee', 'arubeea', '$2b$11$eD41OdPNXIv2X8zXHG5qseh43xmfi16/BkDg2cq1fs0cqe/QwhrGm', 'arubeea@woothemes.com', '5517092053');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (12, 2, 'Kym', 'Finlason', 'kfinlasonb', '$2b$11$o0ZHfnhSbqNWb8bcBdkttuAUmuqmcEi19AzXWugApbAeBdsC.wBia', 'kfinlasonb@unc.edu', '7667951431');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (13, 2, 'Ira', 'Ortzen', 'iortzenc', '$2b$11$VSR69xq0i9lpG7vmPu7Djef4elB/7/gmki2zBtv8wuw/LpXLuTng6', 'iortzenc@salon.com', '4054641647');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (14, 2, 'Fina', 'Chape', 'fchaped', '$2b$11$WA22QsvsohTIXgwJnA3DpO.lMs02SiJvpJFUr/Dmk504WpWdJ7op6', 'fchaped@washingtonpost.com', '6766297243');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (15, 2, 'Galvan', 'McHale', 'gmchalee', '$2b$11$rJZZ7BKtprc.0ciYGGTcBu/O.cOYakM//.YBXa7iaau4.f7r2TMru', 'gmchalee@shutterfly.com', '9979095295');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (16, 2, 'Louise', 'Bussy', 'lbussyf', '$2b$11$cIMriJlsRGExyLh9zLofjeOHTNlw/mTQPIbio/FY9hzKG0tndRUyO', 'lbussyf@jalbum.net', '3281955792');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (17, 2, 'Fayth', 'Habgood', 'fhabgoodg', '$2b$11$.0VaHqhkUs1HJVivQfrWKuetqGyQyslYDAHjYVK2.oTrCDG3QOK9e', 'fhabgoodg@abc.net.au', '9055202231');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (18, 2, 'Darrick', 'Callow', 'dcallowh', '$2b$11$M1A6K0.LdEwi5PmBvy9bX.bkT7IZk0Yl76h7D.es3VD3pfHaPwA0.', 'dcallowh@tripadvisor.com', '9235485138');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (19, 2, 'Inigo', 'Lightwing', 'ilightwingi', '$2b$11$N8liNNdxQKKFCJasf3m3hu427D1UL8Xn/Lj5kKW1wFQIKA5Selhm6', 'ilightwingi@nature.com', '2814051998');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (20, 2, 'Beauregard', 'Dadge', 'bdadgej', '$2b$11$kCHK/f3E8psW1v/JnMec2e1rGyFsUoN7Lu0onOaHX6Ic1nC89IB3K', 'bdadgej@digg.com', '1912261385');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (21, 2, 'Gayleen', 'Coles', 'gcolesk', '$2b$11$bZXPEP9W.gOuSffx40fYIuv.jDUzCLaNgUt4Nq5biRPixqN71sIZ2', 'gcolesk@yahoo.co.jp', '1118831856');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (22, 2, 'Allissa', 'Mc Corley', 'amccorleyl', '$2b$11$IlSXGy/gCJ4.JvN0bMIbKuNyL2NXNmyNaYtgQ7jqz8C8zWF2tLCP6', 'amccorleyl@miitbeian.gov.cn', '5937092552');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (23, 2, 'Garrik', 'Halt', 'ghaltm', '$2b$11$CUakIMqKxiJoHtM/hWfIzuwtLn3qf1snKsmfkbf1Nxq9gBm39XkXq', 'ghaltm@accuweather.com', '8801814760');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (24, 2, 'Marleah', 'Madine', 'mmadinen', '$2b$11$cHftU2NT/W9HPc9Zd8.GVO3P.lMuoXwP1qTAcyo8gbw81uLyQXiy.', 'mmadinen@eepurl.com', '4807394496');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (25, 2, 'Wyn', 'Vignaux', 'wvignauxo', '$2b$11$/aXOwmju4YTZK35nZrjQo.dGXC4VZq1mQBCdse6l5KUZVbNDnUKna', 'wvignauxo@de.vu', '2952207150');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (26, 2, 'Blake', 'Elsay', 'belsayp', '$2b$11$mhoD4KAiFgQjyprCrR4IiOWerjXxUsiuX4sukWx4wzNqY.lCSECOa', 'belsayp@google.nl', '8011632424');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (27, 2, 'Hilda', 'Maltster', 'hmaltsterq', '$2b$11$2CynrvBD0l2s/LRKz0pchub0TqHWJeBZ2nrCbLPeUClw8MsqaLXe2', 'hmaltsterq@so-net.ne.jp', '1485803287');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (28, 2, 'Ynez', 'Donativo', 'ydonativor', '$2b$11$q5vzruwJbOQQAQA19Fw2ruk.fz3hR3UHqdu1R7.GMFYpaWiOQquyC', 'ydonativor@51.la', '8785030926');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (29, 2, 'Patience', 'Reignard', 'preignards', '$2b$11$Tn5v0d08YnQ53GjdFH7aiOh3tSlbPk1GHOieWeZdM4uJubXz6ZHWO', 'preignards@csmonitor.com', '6562500968');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (30, 2, 'Jed', 'Robke', 'jrobket', '$2b$11$5rgWFufVy6zDYIRF9rlNbuLq0liH0iBhtBUZrkbuD9nkv8mWCHXqW', 'jrobket@seesaa.net', '4967640597');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (31, 2, 'Saree', 'Stummeyer', 'sstummeyeru', '$2b$11$Ic2Jcvu8qKmQLOw8tdOaReb0Xm.Js1UoxS.fxUkoldg3K0.rUiItu', 'sstummeyeru@skype.com', '8098579113');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (32, 2, 'Lars', 'Kirkness', 'lkirknessv', '$2b$11$gsRL69it4I2VOcyA8ynkjO045owdYXF68QVfVXrSG7TDVnnCR6Gfu', 'lkirknessv@angelfire.com', '9085336539');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (33, 2, 'Faina', 'Croot', 'fcrootw', '$2b$11$ioWTjC4A1KmmcCBEymmXwuIysgkAIPLN09SScx5W2fnSn72136EB2', 'fcrootw@statcounter.com', '3745770130');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (34, 2, 'Lyssa', 'Ruben', 'lrubenx', '$2b$11$2cJANgXW6/gtwrQc.dCuUOcQ75yMtJJ6tEqt3Ns6rwQNvEo4R1/si', 'lrubenx@google.es', '7571124298');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (35, 2, 'Dominique', 'Christopher', 'dchristophery', '$2b$11$khns9nceLcgjrqwplWnOheqVgbuOI9ciwqwbUih8LR15YlIeN1rOu', 'dchristophery@seesaa.net', '3581978310');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (36, 2, 'Jacquetta', 'Georgins', 'jgeorginsz', '$2b$11$hF9TG7kuSK6xotcTQIcMm.R39RAKln78pkD3t.RDHKBpVjwAG/doK', 'jgeorginsz@weibo.com', '5292667547');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (37, 2, 'Diandra', 'Ferrillio', 'dferrillio10', '$2b$11$IALoSlDZn0i/ghC3MKpa2OlFYP7cy93Dnj/mRb2trzb6NFPq0y26.', 'dferrillio10@rediff.com', '5861121501');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (38, 2, 'Vicki', 'Cahalan', 'vcahalan11', '$2b$11$KrLFYbqJ52aSFWx8F.ezPuHB4rQO/C3OhEz/jrubazeMKc/iWVh1S', 'vcahalan11@pagesperso-orange.fr', '2668114304');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (39, 2, 'Lennie', 'Grove', 'lgrove12', '$2b$11$JYvivXf4JUVGwD7ZNtFpUuLaSPgOWfhjfVE/gVpi7nvvv7sGkxsYO', 'lgrove12@hud.gov', '2914863989');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (40, 2, 'Hinze', 'Jacobsen', 'hjacobsen13', '$2b$11$S2NM7eYtD8fo3Wk/5C1OV.ulaTr9SsW4ggMKsx02.1Rib.XFjjZJO', 'hjacobsen13@paypal.com', '8139970288');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (41, 2, 'Winnifred', 'Quakley', 'wquakley14', '$2b$11$Ye3yYvS/hATiwtFiqT3cE.tzHquuP.3VQhTAfpj6hkh6O3c4G4EiG', 'wquakley14@cyberchimps.com', '9774584344');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (42, 2, 'Dilly', 'Dobbison', 'ddobbison15', '$2b$11$s/X.hqtjiQRXfnPY8gR0Rey1esJn6TWTzExF5guwB2.aFsXBK79.u', 'ddobbison15@rambler.ru', '7367181054');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (43, 2, 'Priscilla', 'Abramson', 'pabramson16', '$2b$11$M/.rKFSwB6EU8KkoP1oKwO23YE5YLarHe7aKWEB544Kbs9XAs.rau', 'pabramson16@nationalgeographic.com', '3455959311');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (44, 2, 'Dermot', 'Laird-Craig', 'dlairdcraig17', '$2b$11$IbvUR97NemrPjvds0BNzPuw3wdYi99KYLIw2k5.QbDBm8ivEaoXHm', 'dlairdcraig17@senate.gov', '3044754872');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (45, 2, 'Nonie', 'Wison', 'nwison18', '$2b$11$auuq7zWEUI7KTtFJfDj0Quw6vJXt1ViFGFVJ1RM7zRdSdI8rjUjHO', 'nwison18@usnews.com', '8601449086');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (46, 2, 'Felicdad', 'Bohike', 'fbohike19', '$2b$11$xcrQXwLsE5PEuL3EtIeA4OzKT7NjXYo6T06BjLoNX.SXiJyMTLsBa', 'fbohike19@vinaora.com', '5406891445');
INSERT INTO `utopia`.`user` (`id`, `role_id`, `given_name`, `family_name`, `username`, `password`, `email`, `phone`) VALUES (47, 2, 'Cameron', 'Bydaway', 'cbydaway1a', '$2b$11$j.ATjLxBP7ww9WfXXvmZAOg6dHS7NhMlpX0AcTzTldOGmHrCaFYqK', 'cbydaway1a@hexun.com', '2624805761');
COMMIT;