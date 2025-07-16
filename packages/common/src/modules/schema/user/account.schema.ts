// CREATE TABLE`account`(
//   `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '账号ID',
//   `user_id` bigint(20) NULL DEFAULT NULL COMMENT '用户ID',
//   `open_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录账号,如手机号等',
//   `category` tinyint(1) NULL DEFAULT NULL COMMENT '账号类别',
//   `created` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
//   `creator` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人',
//   `edited` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
//   `editor` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '修改人',
//   `deleted` double(1, 0) UNSIGNED ZEROFILL NULL DEFAULT 0 COMMENT '逻辑删除:0=未删除,1=已删除',
//   PRIMARY KEY(`id`) USING BTREE,
//   INDEX`idx_member_id`(`user_id`) USING BTREE COMMENT '普通索引',
//   CONSTRAINT`account_ibfk_1` FOREIGN KEY(`user_id`) REFERENCES`user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
// ) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '账号' ROW_FORMAT = Dynamic;

import { z } from 'zod/v4';

/**
 * 账号类型
 * @description 
 * 记录每一种登录方式的信息，但不包含密码信息，因为各种登录方式都会使用同一个密码。
 * 每一条记录都会关联到唯一的一条用户记录。
 */
const accountSchema = z.object({
  index: z.number().int().positive().optional(),// 索引
  _id: z.uuid(),
  id: z.number().int().positive(), // 账号ID
  user_id: z.number().int().positive(), // 用户ID
  open_code: z.string().min(1).max(32), // 账号标识
  category: z.string().min(1).max(32), // 账号类别
  created_at: z.date(), // 创建时间
  creator: z.string().min(1).max(32), // 创建人ID
  edited: z.date(), // 修改时间
  editor: z.string().min(1).max(32), // 修改人ID
  deleted: z.enum(['0', '1']), // 是否删除
  deleted_at: z.date().nullable().optional(), // 删除时间
})

export type AccountSchema = z.infer<typeof accountSchema>;