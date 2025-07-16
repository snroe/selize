// CREATE TABLE`user`(
//   `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
//   `state` tinyint(1) NULL DEFAULT NULL COMMENT '用户状态:0=正常,1=禁用',
//   `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
//   `avatar_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像图片地址',
//   `mobile` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号码',
//   `salt` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码加盐',
//   `password` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录密码',
//   `created` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
//   `creator` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人',
//   `edited` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
//   `editor` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改人',
//   `deleted` tinyint(1) UNSIGNED ZEROFILL NULL DEFAULT 0 COMMENT '逻辑删除:0=未删除,1=已删除',
//   PRIMARY KEY(`id`) USING BTREE
// ) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户' ROW_FORMAT = Dynamic;

import { z } from 'zod/v4';

const userSchema = z.object({
  id: z.number().int().positive().optional(),
  state: z.enum(['0', '1']).default('0'),
  first_name: z.string().min(1).max(255),
  last_name: z.string().min(1).max(255),
  avatar_url: z.url(),
  phone_number: z.string().min(1).max(255),
  password_salt: z.string().min(1).max(255),
  created_at: z.date(),
  creator: z.string(),
  edited_at: z.date(),
  editor: z.string(),
  deleted: z.boolean(),
  deleted_at: z.date(),
})

export type UserSchema = z.infer<typeof userSchema>