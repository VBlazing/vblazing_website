/*
 * @Author: vblazing
 * @Date: 2025-10-15 20:39:10
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-15 20:39:39
 * @Description: 数据库连接
 */
import postgres from 'postgres';

const isProduction = process.env.NODE_ENV === 'production'

export const sql = postgres(process.env.POSTGRES_URL!, { ssl: isProduction ? 'require' : false })