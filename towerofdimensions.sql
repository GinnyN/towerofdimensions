-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 27-07-2012 a las 17:21:04
-- Versión del servidor: 5.5.25-log
-- Versión de PHP: 5.3.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `towerofdimensions`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `achivements-desbloqueados`
--

CREATE TABLE IF NOT EXISTS `achivements-desbloqueados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id-jugador` int(11) NOT NULL,
  `id-achivement` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `items`
--

CREATE TABLE IF NOT EXISTS `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id-jugador` int(11) NOT NULL,
  `id-item` int(11) NOT NULL,
  `id-mercenario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

--
-- Volcado de datos para la tabla `items`
--

INSERT INTO `items` (`id`, `id-jugador`, `id-item`, `id-mercenario`) VALUES
(1, 1, 1, -1),
(2, 2, 1, -1),
(3, 3, 1, 5),
(4, 3, 2, 6),
(5, 3, 1, -1),
(6, 4, 1, 7),
(7, 4, 2, 8),
(8, 4, 1, -1),
(9, 5, 1, 9),
(10, 5, 2, 10),
(11, 5, 1, -1),
(12, 6, 1, 11),
(13, 6, 2, 12),
(14, 6, 1, -1),
(15, 7, 1, 13),
(16, 7, 2, 14),
(17, 7, 1, -1),
(18, 8, 1, 15),
(19, 8, 2, 16),
(20, 8, 1, -1),
(21, 9, 1, 17),
(22, 9, 2, 18),
(23, 9, 1, -1),
(24, 10, 1, 19),
(25, 10, 2, 20),
(26, 10, 1, -1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugador`
--

CREATE TABLE IF NOT EXISTS `jugador` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `dinero` int(11) NOT NULL DEFAULT '300',
  `fecha-inicio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Volcado de datos para la tabla `jugador`
--

INSERT INTO `jugador` (`id`, `nombre`, `dinero`, `fecha-inicio`) VALUES
(1, 'g', 300, '2012-07-06 03:57:30'),
(2, 'gi', 300, '2012-07-06 03:58:40'),
(3, 'gin', 300, '2012-07-06 04:03:36'),
(4, 'ginn', 300, '2012-07-06 04:17:10'),
(5, 'ginny', 300, '2012-07-06 04:29:29'),
(6, 'ginnyn', 300, '2012-07-06 04:30:30'),
(7, 'ginnyng', 300, '2012-07-06 04:32:43'),
(8, 'ginnyngn', 300, '2012-07-06 04:35:40'),
(9, 'ginnyngnh', 300, '2012-07-06 04:43:21'),
(10, 'lecome', 300, '2012-07-09 02:23:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mercenarios`
--

CREATE TABLE IF NOT EXISTS `mercenarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id-jugador` int(11) NOT NULL,
  `id-mercenario-base` int(11) NOT NULL,
  `hp-actual` int(11) NOT NULL,
  `hp-max` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `agilidad` int(11) NOT NULL,
  `destreza` int(11) NOT NULL,
  `constitucion` int(11) NOT NULL,
  `fuerza` int(11) NOT NULL,
  `inteligencia` int(11) NOT NULL,
  `sabiduria` int(11) NOT NULL,
  `carisma` int(11) NOT NULL,
  `poder` int(11) NOT NULL,
  `marcial` int(11) NOT NULL,
  `stealth` int(11) NOT NULL,
  `magia` int(11) NOT NULL,
  `tecnologia` int(11) NOT NULL,
  `item-1` int(11) NOT NULL,
  `item-2` int(11) NOT NULL,
  `item-3` int(11) NOT NULL,
  `item-4` int(11) NOT NULL,
  `item-5` int(11) NOT NULL,
  `item-6` int(11) NOT NULL,
  `experiencia` int(11) NOT NULL,
  `nivel` int(11) NOT NULL,
  `mision-actual` int(11) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Volcado de datos para la tabla `mercenarios`
--

INSERT INTO `mercenarios` (`id`, `id-jugador`, `id-mercenario-base`, `hp-actual`, `hp-max`, `nombre`, `agilidad`, `destreza`, `constitucion`, `fuerza`, `inteligencia`, `sabiduria`, `carisma`, `poder`, `marcial`, `stealth`, `magia`, `tecnologia`, `item-1`, `item-2`, `item-3`, `item-4`, `item-5`, `item-6`, `experiencia`, `nivel`, `mision-actual`) VALUES
(1, 1, 0, 9, 9, 'Spark', 2, 5, 3, 3, 3, 2, 1, 3, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0),
(2, 1, 1, 9, 9, 'Ginny', 2, 5, 3, 3, 3, 2, 1, 3, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0),
(3, 2, 0, 9, 9, 'Spark', 2, 5, 3, 3, 3, 2, 1, 3, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0),
(4, 2, 1, 9, 9, 'Ginny', 2, 5, 3, 3, 3, 2, 1, 3, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0),
(5, 3, 0, 9, 9, 'Spark', 2, 5, 3, 3, 3, 2, 1, 3, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0),
(6, 3, 1, 9, 9, 'Ginny', 2, 5, 3, 3, 3, 2, 1, 3, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0),
(7, 4, 0, 9, 9, 'Spark', 2, 5, 3, 3, 3, 2, 1, 3, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, -1),
(8, 4, 1, 9, 9, 'Ginny', 2, 5, 3, 3, 3, 2, 1, 3, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, -1),
(9, 5, 0, 9, 9, 'Spark', 2, 5, 3, 3, 3, 2, 1, 3, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, -1),
(10, 5, 1, 9, 9, 'Ginny', 2, 5, 3, 3, 3, 2, 1, 3, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, -1),
(11, 6, 0, 9, 9, 'Spark', 2, 5, 3, 3, 3, 2, 1, 3, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, -1),
(12, 6, 1, 9, 9, 'Ginny', 2, 5, 3, 3, 3, 2, 1, 3, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, -1),
(13, 7, 0, 9, 9, 'Spark', 2, 5, 3, 3, 3, 2, 1, 3, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, -1),
(14, 7, 1, 9, 9, 'Ginny', 2, 5, 3, 3, 3, 2, 1, 3, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, -1),
(15, 8, 0, 9, 9, 'Spark', 2, 5, 3, 3, 3, 2, 1, 3, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, -1),
(16, 8, 1, 9, 9, 'Ginny', 2, 5, 3, 3, 3, 2, 1, 3, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, -1),
(17, 9, 0, 9, 9, 'Spark', 2, 5, 3, 3, 3, 2, 1, 3, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, -1),
(18, 9, 1, 9, 9, 'Ginny', 2, 5, 3, 3, 3, 2, 1, 3, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, -1),
(19, 10, 0, 9, 9, 'Spark', 2, 5, 3, 3, 3, 2, 1, 3, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, -1),
(20, 10, 1, 9, 9, 'Ginny', 2, 5, 3, 3, 3, 2, 1, 3, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, -1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mercenarios-crecimiento`
--

CREATE TABLE IF NOT EXISTS `mercenarios-crecimiento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id-mercenario` int(11) NOT NULL,
  `agilidad` int(11) NOT NULL,
  `destreza` int(11) NOT NULL,
  `constitucion` int(11) NOT NULL,
  `fuerza` int(11) NOT NULL,
  `inteligencia` int(11) NOT NULL,
  `sabiduria` int(11) NOT NULL,
  `carisma` int(11) NOT NULL,
  `poder` int(11) NOT NULL,
  `hp-calculo` varchar(100) NOT NULL,
  `marcial` int(11) NOT NULL,
  `stealth` int(11) NOT NULL,
  `magia` int(11) NOT NULL,
  `tecnologia` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=17 ;

--
-- Volcado de datos para la tabla `mercenarios-crecimiento`
--

INSERT INTO `mercenarios-crecimiento` (`id`, `id-mercenario`, `agilidad`, `destreza`, `constitucion`, `fuerza`, `inteligencia`, `sabiduria`, `carisma`, `poder`, `hp-calculo`, `marcial`, `stealth`, `magia`, `tecnologia`) VALUES
(1, 5, 1, 4, 2, 4, 0, 1, 0, 3, 'Constitucion', 3, -2, -3, -4),
(2, 6, 1, 4, 2, 4, 0, 1, 0, 3, 'Constitucion', 3, -2, -3, -4),
(3, 7, 1, 4, 2, 4, 0, 1, 0, 3, 'Constitucion', 3, -2, -3, -4),
(4, 8, 1, 4, 2, 4, 0, 1, 0, 3, 'Constitucion', 3, -2, -3, -4),
(5, 9, 1, 4, 2, 4, 0, 1, 0, 3, 'Constitucion', 3, -2, -3, -4),
(6, 10, 1, 4, 2, 4, 0, 1, 0, 3, 'Constitucion', 3, -2, -3, -4),
(7, 11, 1, 4, 2, 4, 0, 1, 0, 3, 'Constitucion', 3, -2, -3, -4),
(8, 12, 1, 4, 2, 4, 0, 1, 0, 3, 'Constitucion', 3, -2, -3, -4),
(9, 13, 1, 4, 2, 4, 0, 1, 0, 3, 'Constitucion', 3, -2, -3, -4),
(10, 14, 1, 4, 2, 4, 0, 1, 0, 3, 'Constitucion', 3, -2, -3, -4),
(11, 15, 1, 4, 2, 4, 0, 1, 0, 3, 'Constitucion', 3, -2, -3, -4),
(12, 16, 1, 4, 2, 4, 0, 1, 0, 3, 'Constitucion', 3, -2, -3, -4),
(13, 17, 1, 4, 2, 4, 0, 1, 0, 3, 'Constitucion', 3, -2, -3, -4),
(14, 18, 1, 4, 2, 4, 0, 1, 0, 3, 'Constitucion', 3, -2, -3, -4),
(15, 19, 1, 4, 2, 4, 0, 1, 0, 3, 'Constitucion', 3, -2, -3, -4),
(16, 20, 1, 4, 2, 4, 0, 1, 0, 3, 'Constitucion', 3, -2, -3, -4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mercenarios-verdaderos`
--

CREATE TABLE IF NOT EXISTS `mercenarios-verdaderos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id-mercenario` int(11) NOT NULL,
  `agilidad` int(11) NOT NULL,
  `destreza` int(11) NOT NULL,
  `constitucion` int(11) NOT NULL,
  `fuerza` int(11) NOT NULL,
  `inteligencia` int(11) NOT NULL,
  `sabiduria` int(11) NOT NULL,
  `carisma` int(11) NOT NULL,
  `poder` int(11) NOT NULL,
  `hp-max` int(11) NOT NULL,
  `marcial` int(11) NOT NULL,
  `stealth` int(11) NOT NULL,
  `magia` int(11) NOT NULL,
  `tecnologia` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `misiones`
--

CREATE TABLE IF NOT EXISTS `misiones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id-jugador` int(11) NOT NULL,
  `id-mision` int(11) NOT NULL,
  `ganada-fallada` int(11) NOT NULL,
  `mercenario1` int(11) NOT NULL,
  `mercenario2` int(11) NOT NULL,
  `hora-comienzo` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hora-termino` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `first` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `misiones-desbloqueadas`
--

CREATE TABLE IF NOT EXISTS `misiones-desbloqueadas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id-jugador` int(11) NOT NULL,
  `id-zona` int(11) NOT NULL,
  `id-mision` int(11) NOT NULL,
  `activa` tinyint(1) NOT NULL DEFAULT '0',
  `terminada` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `misiones-desbloqueadas`
--

INSERT INTO `misiones-desbloqueadas` (`id`, `id-jugador`, `id-zona`, `id-mision`, `activa`, `terminada`) VALUES
(1, 8, 0, 0, 0, 0),
(2, 9, 0, 0, 0, 0),
(3, 10, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zonas-desbloqueadas`
--

CREATE TABLE IF NOT EXISTS `zonas-desbloqueadas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id-jugador` int(11) NOT NULL,
  `id-zona` int(11) NOT NULL,
  `id-dimension` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Volcado de datos para la tabla `zonas-desbloqueadas`
--

INSERT INTO `zonas-desbloqueadas` (`id`, `id-jugador`, `id-zona`, `id-dimension`) VALUES
(1, 1, 0, 0),
(2, 2, 0, 0),
(3, 3, 0, 0),
(4, 4, 0, 0),
(5, 5, 0, 0),
(6, 6, 0, 0),
(7, 7, 0, 0),
(8, 8, 0, 0),
(9, 9, 0, 0),
(10, 10, 0, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
