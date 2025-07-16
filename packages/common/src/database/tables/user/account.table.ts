import { AccountSchema } from '../../../modules/schema/index.js';
import { uuid } from '../../../modules/index.js'

type DbType = 'pg' | 'mongodb' | 'mysql';
type DbTransformFn = (data: AccountSchema) => Record<string, any>;

/**
 * 数据库转换函数
 * @description
 * 根据数据库类型返回对应的数据转换函数。
 * 
 * 目前支持 PostgreSQL、 MongoDB 和 MySQL。
 * 
 * 对于 PostgreSQL，会添加一个索引字段 index，默认值为 0。
 * 
 * 对于 MongoDB，会添加一些额外的字段，如 createdAt、updatedAt、_id 等。
 * 
 * @param data 待转换的数据
 * @returns 转换后的数据
 * @private
 */
export const dbTransformMap: Record<DbType, DbTransformFn> = {
  pg: (data) => ({
    ...data,
    index: data.index ?? 0,
  }),
  mongodb: (data) => ({
    ...data,
    createdAt: data.created_at,
    updatedAt: data.edited,
    _id: data._id,
  }),
  mysql: (data) => {
    const { created_at, edited, ...rest } = data;
    return {
      ...rest,
      index: rest.index ?? 0,        // 设置index默认值
      createdAt: created_at,         // 重命名created_at
      updatedAt: edited,             // 重命名edited
    };
  },
};

/**
 * 创建账号
 * @description
 * 用户会有各种各样的登录方式，如手机号、邮箱地址、身份证号码和微信登录等。
 * 
 * 因此该表主要是用来记录每一种登录方式的信息，但不包含密码信息，因为各种登录方式都会使用同一个密码。
 * 
 * 每一条记录都会关联到唯一的一条用户记录。
 * @param options
 * @example
 * ```ts
 * const data = createAccount('postgres', {
 *  id: 1001, // 账号 ID
 *  user_id: 1001, // 用户 ID
 *  open_code: '123456', // 登录方式
 *  category: 'email', // 登录方式类别
 *  creator: 'admin001', // 创建者 ID
 * ```
 */
export function createAccount(
  dbType: DbType,
  data?: Partial<AccountSchema>
): Record<string, any> {
  const now = new Date();
  const baseData: AccountSchema = {
    _id: data?._id || uuid(),
    id: data?.id ?? 0,
    user_id: data?.user_id ?? 0,
    open_code: data?.open_code ?? '',
    category: data?.category ?? '',
    created_at: data?.created_at ?? now,
    creator: data?.creator ?? '',
    edited: data?.edited ?? now,
    editor: data?.editor ?? '',
    deleted: data?.deleted ?? '0',
    deleted_at: data?.deleted_at ?? null,
  };

  const transform = dbTransformMap[dbType];
  if (!transform) throw new Error(`Unsupported database type: ${dbType}`);

  return transform(baseData);
}