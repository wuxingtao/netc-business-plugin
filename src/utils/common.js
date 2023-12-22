/**
 * @Desc: common
 * @Author: wu xingtao
 * @Date: 2023/12/22
 */
import md5 from 'js-md5'

export const md5Http = (token, timestamp, body) => {
  return md5(md5(token).toUpperCase() + timestamp + JSON.stringify(body || {})).toUpperCase()
}
