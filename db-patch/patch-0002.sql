DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(200) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created` timestamp DEFAULT NOW(),
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `realm`;
CREATE TABLE `realm` (
  `realm_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `created` timestamp DEFAULT NOW(),
  PRIMARY KEY (`realm_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `realm` ADD CONSTRAINT `fk_realm_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `subproject_of_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `realm_id` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 0 COMMENT '0: active, 1: future',
  `is_complete` tinyint(1) DEFAULT 0,
  `notes` text DEFAULT NULL,
  `title` varchar(200) NOT NULL,
  `created` timestamp DEFAULT NOW(),
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `project` ADD CONSTRAINT `fk_project_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

DROP TABLE IF EXISTS `action`;
CREATE TABLE `action` (
  `action_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `realm_id` int(11) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `depends_on_id` int(11) DEFAULT NULL,
  `title` varchar(200) NOT NULL,
  `is_complete` tinyint(1) DEFAULT 0,
  `status` tinyint(1) DEFAULT 0 COMMENT '0: now, 1: waiting, 2:future',
  `notes` text DEFAULT NULL,
  `created` timestamp DEFAULT NOW(),
  PRIMARY KEY (`action_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `action` ADD CONSTRAINT `fk_action_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

DROP TABLE IF EXISTS `contact`;
CREATE TABLE `contact` (
  `contact_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `realm_id` int(11) DEFAULT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `notes` text DEFAULT NULL,
  `created` timestamp DEFAULT NOW(),
  PRIMARY KEY (`contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `contact` ADD CONSTRAINT `fk_contact_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
