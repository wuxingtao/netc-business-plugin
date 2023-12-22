/**
 * @Desc: auth
 * @Author: wu xingtao
 * @Date: 2023/12/22
 */
export const getToken = () => {
  return window.sessionStorage.getItem('token') || ''
}
