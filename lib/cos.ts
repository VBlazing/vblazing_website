/*
 * @Author: vblazing
 * @Date: 2025-10-21 17:57:35
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-22 10:21:16
 * @Description: 创建cos实例  地址：https://console.cloud.tencent.com/cos/bucket
 */
import COS from 'cos-nodejs-sdk-v5'

const cos = new COS({
  SecretId: process.env.COS_SECRETID,
  SecretKey: process.env.COS_SECRETKEY
})

export default cos