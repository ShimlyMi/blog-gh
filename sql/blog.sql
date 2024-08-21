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

 Date: 21/08/2024 16:12:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for query-result-cache
-- ----------------------------
DROP TABLE IF EXISTS `query-result-cache`;
CREATE TABLE `query-result-cache`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `time` bigint(0) NOT NULL,
  `duration` int(0) NOT NULL,
  `query` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `result` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for website
-- ----------------------------
DROP TABLE IF EXISTS `website`;
CREATE TABLE `website`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `blogName` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001.jpg' COMMENT '博客头像',
  `blogAvatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'http://127.0.0.1:8888/f56d6e7a0657cee8354612700.jpg' COMMENT '博客头像',
  `avatarBg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '博客头像背景图',
  `personalSignature` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '这个博主很懒，什么也没有留下~' COMMENT '个性签名',
  `blogNotice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '暂无公告，敬请期待！' COMMENT '博客网站公告',
  `viewTimes` int(0) NOT NULL DEFAULT 0 COMMENT '博客网站浏览量',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of website
-- ----------------------------
INSERT INTO `website` VALUES (1, '2024-08-21 11:08:33.956854', '2024-08-21 11:08:33.956854', '米娜的小屋', 'http://127.0.0.1:8888/f56d6e7a0657cee8354612700.jpg', 'http://127.0.0.1:8888/f56d6e7a0657cee8354612700.jpg', '这个博主很懒，什么也没有留下~', '暂无公告，敬请期待！', 0);

SET FOREIGN_KEY_CHECKS = 1;
