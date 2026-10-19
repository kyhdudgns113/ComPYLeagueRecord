import * as S from './src/base/secret'

import path from 'node:path'
import {fileURLToPath} from 'node:url'
import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

const root = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@commonType': path.resolve(root, 'src/base/types/CommonTypes'),
      '@component': path.resolve(root, 'src/base/components'),
      '@context': path.resolve(root, 'src/manager/context'),

      '@fetch': path.resolve(root, 'src/base/fetch'),
      '@httpType': path.resolve(root, 'src/base/types/HTTPTypes'),
      '@localType': path.resolve(root, 'src/base/types/LocalTypes'),

      '@objectType': path.resolve(root, 'src/base/types/ObjectTypes'),
      '@prop': path.resolve(root, 'src/base/types/props'),
      '@redux': path.resolve(root, 'src/manager/redux'),
      '@secret': path.resolve(root, 'src/base/secret'),
      '@styles': path.resolve(root, 'src/base/styles'),
      '@util': path.resolve(root, 'src/base/utils'),
      '@value': path.resolve(root, 'src/base/values'),
    },
  },
  server: {
    host: S.CLIENT_IP,
    port: S.CLIENT_PORT,
  },
})
