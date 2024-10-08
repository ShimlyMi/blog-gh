/*
 Navicat Premium Data Transfer

 Source Server         : 本地数据库
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 08/10/2024 17:49:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) NULL DEFAULT NULL,
  `category_name` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分类名称 唯一',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_9359e3b1d5e90d7a0fbe3b2807`(`category_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '2024-08-28 16:06:14.572756', '2024-08-28 16:06:14.572756', NULL, '测试分类2');

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) NULL DEFAULT NULL,
  `tag_name` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标签名称 唯一',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_c567d5f21442789d3fb85a53f0`(`tag_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for talk
-- ----------------------------
DROP TABLE IF EXISTS `talk`;
CREATE TABLE `talk`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '说说内容',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '说说状态 1 公开 2 私密 3 回收站',
  `isTop` tinyint(0) NOT NULL DEFAULT 2 COMMENT '是否置顶 1 置顶 2 不置顶',
  `like_times` int(0) NOT NULL DEFAULT 0 COMMENT '点赞次数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of talk
-- ----------------------------
INSERT INTO `talk` VALUES (1, '2024-09-11 15:56:59.881009', '2024-09-11 15:56:59.881009', NULL, '测试发表说说', 1, 2, 0);
INSERT INTO `talk` VALUES (2, '2024-09-11 16:00:15.360277', '2024-09-11 16:00:15.360277', NULL, '测试发表说说1', 1, 2, 0);
INSERT INTO `talk` VALUES (3, '2024-09-11 16:17:48.311302', '2024-09-11 16:17:48.311302', NULL, '测试发表说说3', 1, 2, 0);
INSERT INTO `talk` VALUES (4, '2024-09-11 16:20:14.603446', '2024-09-11 16:20:14.603446', NULL, '测试发表说说6', 1, 2, 0);
INSERT INTO `talk` VALUES (5, '2024-10-08 17:43:01.266062', '2024-10-08 17:43:01.266062', NULL, '测试发表说说8', 1, 2, 0);

-- ----------------------------
-- Table structure for talk_photo
-- ----------------------------
DROP TABLE IF EXISTS `talk_photo`;
CREATE TABLE `talk_photo`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) NULL DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '图片地址',
  `talkId` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_bcd1a865a9ffc7edc75048fd105`(`talkId`) USING BTREE,
  CONSTRAINT `FK_bcd1a865a9ffc7edc75048fd105` FOREIGN KEY (`talkId`) REFERENCES `talk` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of talk_photo
-- ----------------------------
INSERT INTO `talk_photo` VALUES (1, '2024-10-08 17:43:01.329807', '2024-10-08 17:43:01.329807', NULL, '8f4d43b8842aba7cb88e0c92b4be44ad.jpg', 5);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名,唯一',
  `password` char(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码',
  `role` tinyint(0) NOT NULL DEFAULT 2 COMMENT '用户角色 1 管理员 2 普通用户',
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户昵称',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'http://127.0.0.1:8888/665d7417ccaa2b7287f6da700.jpg' COMMENT '用户头像',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '2024-09-11 12:47:09.294231', '2024-09-11 14:45:52.338419', NULL, 'admin', '$2b$10$e1bSK1jMcJ3K8KPFG4muR.BFf6uRNpkqeO0kID4mehTNRmXMsAIRC', 1, '超级管理员', 'http://127.0.0.1:8888/665d7417ccaa2b7287f6da700.jpg');
INSERT INTO `user` VALUES (2, '2024-09-11 14:47:09.854461', '2024-09-11 14:47:09.854461', NULL, 'MINA', '$2b$10$F6tEpxDmYhmHAbpRDakl1uwhdd18K04hJwxO4o8k3IGvp9XKk8xee', 2, '米娜', 'http://127.0.0.1:8888/665d7417ccaa2b7287f6da700.jpg');

-- ----------------------------
-- Table structure for website
-- ----------------------------
DROP TABLE IF EXISTS `website`;
CREATE TABLE `website`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `avatarBg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'http://127.0.0.1:8888/f56d6e7a0657cee8354612700.jpg' COMMENT '博客头像背景图',
  `personalSignature` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '这个博主很懒，什么也没有留下~' COMMENT '个性签名',
  `blogNotice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '暂无公告，敬请期待！' COMMENT '博客网站公告',
  `viewTimes` int(0) NOT NULL DEFAULT 0 COMMENT '博客网站浏览量',
  `deletedAt` datetime(6) NULL DEFAULT NULL,
  `blog_name` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '米娜的小屋' COMMENT '博客名称',
  `blog_avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001.jpg' COMMENT '博客头像',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of website
-- ----------------------------
INSERT INTO `website` VALUES (1, '2024-08-23 09:43:31.968643', '2024-08-23 09:43:31.968643', 'http://127.0.0.1:8888/f56d6e7a0657cee8354612700.jpg', '这个博主很懒，什么也没有留下~', '暂无公告，敬请期待！', 0, NULL, '米娜的小屋', 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001.jpg');

SET FOREIGN_KEY_CHECKS = 1;
