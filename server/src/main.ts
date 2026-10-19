import {CorsOptions} from '@nestjs/common/interfaces/external/cors-options.interface'
import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'

import * as S from '@secret'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // CORS 설정
  const corsOptions: CorsOptions = {
    origin: [S.CLIENT_IP_PORT],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }

  app.enableCors(corsOptions)

  // 서버 실행
  await app.listen(S.SERVER_PORT)
}
bootstrap()
