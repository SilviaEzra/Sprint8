-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.4.0 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para sprint8
CREATE DATABASE IF NOT EXISTS `sprint8` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sprint8`;

-- Volcando estructura para tabla sprint8.events
CREATE TABLE IF NOT EXISTS `events` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla sprint8.events: ~0 rows (aproximadamente)
INSERT INTO `events` (`id`, `title`, `start`, `end`, `createdAt`, `updatedAt`, `type`) VALUES
	(6, 'La Purga', '2024-06-28 16:00:00', '2024-06-28 17:00:00', '2024-06-22 15:16:56', '2024-06-22 15:16:56', '8 personas');

-- Volcando estructura para tabla sprint8.locations
CREATE TABLE IF NOT EXISTS `locations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla sprint8.locations: ~0 rows (aproximadamente)

-- Volcando estructura para tabla sprint8.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `ubicacion` varchar(45) DEFAULT NULL,
  `nota` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla sprint8.products: ~5 rows (aproximadamente)
INSERT INTO `products` (`id`, `nombre`, `tipo`, `ubicacion`, `nota`) VALUES
	(2, 'harry potter', 'fantástico', 'cornella de lobregat', 8),
	(3, 'La noche de las bestias', 'Terror', 'Barcelona', 7),
	(4, 'La Mina', 'Físico', 'Hospitalet de Llobregat', 7),
	(11, 'Tu entierro', 'Claustrofobia', 'Barcelona', 4);

-- Volcando estructura para tabla sprint8.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- Volcando datos para la tabla sprint8.sequelizemeta: ~0 rows (aproximadamente)
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20240622150053-add-type-to-events.js');

-- Volcando estructura para tabla sprint8.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla sprint8.users: ~6 rows (aproximadamente)
INSERT INTO `users` (`id`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
	(1, 'Tomás', '$2b$10$6rCm8gd47j/V4U6tJncuqOD1xq6nsNYzxJfbD.P.ZJQT5wL553pq.', '2024-06-11 12:10:17', '2024-06-11 12:10:17'),
	(2, 'Tomás', '$2b$10$rKyjxBpbNomFxYtCOEqKne/LifsIXAxtH4BoL4kw2Hb23/8L2NRxK', '2024-06-11 12:10:33', '2024-06-11 12:10:33'),
	(3, 'Tomáso', '$2b$10$Ukc2lUnKCptc5V2kBoYZPesKxUpyV8DvMwE2BANBpDWZcvq.4hjee', '2024-06-11 12:28:28', '2024-06-11 12:28:28'),
	(4, 'pepe', '$2b$10$607bEN5aS2WPAie5pN6FIO3F.mv7Dz.Gx4okJJB9LCBIYhpMx4x9q', '2024-06-11 12:33:33', '2024-06-11 12:33:33'),
	(5, 'juan', '$2b$10$gcC2Dta7azzEfAGiLzxwCO8fpBlMdthuCJhByPhkvyt5gq0LWQYXS', '2024-06-11 12:37:09', '2024-06-11 12:37:09'),
	(6, 'juana', '$2b$10$/RJ0H2p/8QwvvHH7AQMF0Oai987GEP0QaR77UmLvHQxTWOHdCg4jC', '2024-06-11 12:47:13', '2024-06-11 12:47:13');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
