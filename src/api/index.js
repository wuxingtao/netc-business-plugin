import { http as httpNew } from '../modules/request'

export const versionManagerCheckVersion = (params) => {
  return httpNew('web.version.versionManager.checkVersion', params, { appkey: '55262' })
}
