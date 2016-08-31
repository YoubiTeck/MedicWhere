
-- Author :  BELKAID Aïssa
-- Généré le :  Dim 28 Août 2016 à 18:00


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `MedicWhere`
--
CREATE DATABASE IF NOT EXISTS `MedicWhere` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `MedicWhere`;

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'unique identifier of the comment',
  `user` int(11) NOT NULL COMMENT 'Assigned to',
  `doctor` int(11) DEFAULT NULL COMMENT 'identifier of the doctor',
  `hospital` int(11) DEFAULT NULL COMMENT 'identifier of the hospital',
  `content` text COLLATE utf8_unicode_ci NOT NULL COMMENT 'Content of the comment',
  `status` tinyint(1) DEFAULT '1' COMMENT 'enabled=1 ; disabled=0',
  `datetime` datetime NOT NULL COMMENT 'Writing date and time',
  `report` int(6) DEFAULT '0' COMMENT 'To count the number of signals',
  PRIMARY KEY (`id`),
  KEY `users` (`user`),
  KEY `doctors` (`doctor`),
  KEY `hospitals` (`hospital`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Use the PUSH DOWN method for the `institutions` table
--

-- --------------------------------------------------------

--
-- Structure de la table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
CREATE TABLE IF NOT EXISTS `doctors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location` GEOMETRY NOT NULL COMMENT "Location's latitude & longitude",
  `address` varchar(255) CHARACTER SET utf8 NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `firstname` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `lastname` varchar(255) CHARACTER SET utf8 NOT NULL,
  `specialty` varchar(255) CHARACTER SET utf8 NOT NULL,
  `add` int(11) NOT NULL COMMENT 'The user who added the doctor',
  `edit` int(11) DEFAULT NULL COMMENT 'The last user who edited the doctor',
  PRIMARY KEY (`id`),
  KEY `add` (`add`),
  KEY `edit` (`edit`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `hospitals`
--

DROP TABLE IF EXISTS `hospitals`;
CREATE TABLE IF NOT EXISTS `hospitals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location` GEOMETRY NOT NULL COMMENT "Location's latitude & longitude",
  `address` varchar(255) CHARACTER SET utf8 NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `specialization` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudonym` varchar(32) CHARACTER SET utf8 NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `password` varchar(512) CHARACTER SET utf8 NOT NULL,
  `forename` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `surname` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `gender` char(1) DEFAULT 'M' COMMENT 'M=Male ; F=Female',
  `birthday` date DEFAULT NULL COMMENT 'The day on which the user was born',
  `active` tinyint(1) DEFAULT '1' COMMENT 'Is user active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
