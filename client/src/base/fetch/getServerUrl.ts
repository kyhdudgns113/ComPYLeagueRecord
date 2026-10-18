import {SERVER_URL} from '@secret'

export const getServerUrl = (path: string) => {
  const host = SERVER_URL
  return [host, path].join('')
}
