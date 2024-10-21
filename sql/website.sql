-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: blog
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `category_name` varchar(55) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分类名称 唯一',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_9359e3b1d5e90d7a0fbe3b2807` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'2024-08-28 16:06:14.572756','2024-08-28 16:06:14.572756',NULL,'测试分类2');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `real_name` varchar(55) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色名称',
  `value` tinyint NOT NULL COMMENT '权限数字',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_6b5b701377b0071693edf05aa9` (`real_name`),
  UNIQUE KEY `IDX_98082dbb08817c9801e32dd015` (`value`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'2024-10-15 10:01:30.102316','2024-10-15 10:01:30.102316',NULL,'超级管理员',1),(2,'2024-10-15 10:01:50.157187','2024-10-15 10:01:50.157187',NULL,'普通用户',2);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `tag_name` varchar(55) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标签名称 唯一',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_c567d5f21442789d3fb85a53f0` (`tag_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `talk`
--

DROP TABLE IF EXISTS `talk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `talk` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '说说内容',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '说说状态 1 公开 2 私密 3 回收站',
  `isTop` tinyint NOT NULL DEFAULT '2' COMMENT '是否置顶 1 置顶 2 不置顶',
  `like_times` int NOT NULL DEFAULT '0' COMMENT '点赞次数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `talk`
--

LOCK TABLES `talk` WRITE;
/*!40000 ALTER TABLE `talk` DISABLE KEYS */;
INSERT INTO `talk` VALUES (1,'2024-09-11 15:56:59.881009','2024-09-11 15:56:59.881009',NULL,'测试发表说说',1,2,0),(2,'2024-09-11 16:00:15.360277','2024-09-11 16:00:15.360277',NULL,'测试发表说说1',1,2,0),(3,'2024-09-11 16:17:48.311302','2024-09-11 16:17:48.311302',NULL,'测试发表说说3',1,2,0),(4,'2024-09-11 16:20:14.603446','2024-09-11 16:20:14.603446',NULL,'测试发表说说6',1,2,0),(5,'2024-10-08 17:43:01.266062','2024-10-08 17:43:01.266062',NULL,'测试发表说说8',1,2,0);
/*!40000 ALTER TABLE `talk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `talk_photo`
--

DROP TABLE IF EXISTS `talk_photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `talk_photo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '图片地址',
  `talkId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_bcd1a865a9ffc7edc75048fd105` (`talkId`),
  CONSTRAINT `FK_bcd1a865a9ffc7edc75048fd105` FOREIGN KEY (`talkId`) REFERENCES `talk` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `talk_photo`
--

LOCK TABLES `talk_photo` WRITE;
/*!40000 ALTER TABLE `talk_photo` DISABLE KEYS */;
INSERT INTO `talk_photo` VALUES (1,'2024-10-08 17:43:01.329807','2024-10-08 17:43:01.329807',NULL,'8f4d43b8842aba7cb88e0c92b4be44ad.jpg',5);
/*!40000 ALTER TABLE `talk_photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名,唯一',
  `password` char(64) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码',
  `nickname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户昵称',
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'http://127.0.0.1:8888/665d7417ccaa2b7287f6da700.jpg' COMMENT '用户头像',
  `roleId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`),
  UNIQUE KEY `REL_c28e52f758e7bbc53828db9219` (`roleId`),
  CONSTRAINT `FK_c28e52f758e7bbc53828db92194` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2024-10-15 11:37:57.359505','2024-10-15 11:37:57.359505',NULL,'admin','$2b$10$ctoGwtixY95WcT0SY8mPi.cXuhG.Uqlre8nYxfOg4tdPcN9gdIMGa','超级管理员','http://127.0.0.1:8888/665d7417ccaa2b7287f6da700.jpg',1),(2,'2024-10-15 11:43:18.683684','2024-10-15 11:43:18.683684',NULL,'MINA','$2b$10$L0MqJZZnWCopFpkTY8Ff8.PjGpUffUQ8xMFlcbC21mFtX.BLnoFx6','米娜','http://127.0.0.1:8888/665d7417ccaa2b7287f6da700.jpg',2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `website`
--

DROP TABLE IF EXISTS `website`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `website` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `avatarBg` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'http://127.0.0.1:8888/f56d6e7a0657cee8354612700.jpg' COMMENT '博客头像背景图',
  `personalSignature` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '这个博主很懒，什么也没有留下~' COMMENT '个性签名',
  `blogNotice` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '暂无公告，敬请期待！' COMMENT '博客网站公告',
  `viewTimes` int NOT NULL DEFAULT '0' COMMENT '博客网站浏览量',
  `deletedAt` datetime(6) DEFAULT NULL,
  `blog_name` varchar(55) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '米娜的小屋' COMMENT '博客名称',
  `blog_avatar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001.jpg' COMMENT '博客头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `website`
--

LOCK TABLES `website` WRITE;
/*!40000 ALTER TABLE `website` DISABLE KEYS */;
INSERT INTO `website` VALUES (1,'2024-08-23 09:43:31.968643','2024-08-23 09:43:31.968643','http://127.0.0.1:8888/f56d6e7a0657cee8354612700.jpg','这个博主很懒，什么也没有留下~','暂无公告，敬请期待！',0,NULL,'米娜的小屋','http://127.0.0.1:8888/d534c7552f7a63793b1e00001.jpg');
/*!40000 ALTER TABLE `website` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-21 17:09:08
