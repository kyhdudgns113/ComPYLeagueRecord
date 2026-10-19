# AI Server 작업 가이드

- 스택: NestJS 11 + Mongoose + TypeScript
- 실행: `server` 폴더에서 `npm run server` 또는 `npm run start:dev`
- `mysql2` 가 package.json 에 있으나 현재 연결은 MongoDB (`MongooseModule.forRoot`) 다. 새 스키마는 Mongoose 로 만든다.
- 새 기능은 `modules/_CopyMe`, `modules/Database/schemas/_CopyMeDB` 를 복사해 시작한다.

## 1. 폴더 역할

```
server/src
├── main.ts                 # CORS + listen. 포트는 @secret
├── app.module.ts           # DatabaseModule, 기능 Module, Mongoose.forRoot
├── base
│   ├── secret              # mongoDBUrl, SERVER_PORT, CLIENT_IP_PORT, DEBUG_MODE. gitignore
│   ├── types
│   ├── utils               # getFailResponse
│   └── values              # 팀 상수 등. 클라이언트와 의미를 맞춘다
└── modules
    ├── Database            # 스키마 모듈 모음. 기능 모듈이 import
    ├── Setting             # HTTP 기능 모듈 예시
    └── _CopyMe             # 컨트롤러/서비스 템플릿
```

기능 모듈과 DB 모듈을 섞지 않는다.

- HTTP: `modules/Setting` 처럼 도메인 폴더 (controller + service + module)
- 저장: `modules/Database/schemas/{name}DB` (entity + service + module)

## 2. Path alias

`server/tsconfig.json`

| alias | 실제 경로 |
| --- | --- |
| `@commonType` | `src/base/types/CommonTypes` |
| `@httpType` | `src/base/types/HTTPTypes` |
| `@dtoType` | `src/base/types/DtoTypes` |
| `@objectTye` | `src/base/types/ObjectTypes` |
| `@secret` | `src/base/secret` |
| `@util` | `src/base/utils` |
| `@value` | `src/base/values` |

`@objectTye` 는 오타가 맞다. 지금은 이 철자로 import 한다.

```ts
import * as CT from '@commonType'
import * as DTO from '@dtoType'
import * as OT from '@objectTye'
import * as S from '@secret'
```

## 3. 타입 구분

- `CommonTypes`: 리터럴 유니온. 클라이언트 `CommonTypes` 와 동일해야 한다.
- `ObjectTypes`: 클라이언트로 내보내는 객체. `Date` 대신 `createdAtNum: number` (`valueOf()`).
- `HTTPTypes`: 컨트롤러가 받는 body. 클라이언트 `HTTPTypes` 와 맞춘다.
- `DtoTypes`: DB 서비스 인자 (`DTO_CreateLeagueInfo`, `DTO_UpdateLeagueInfo`). HTTP 타입을 그대로 DB 에 넣지 말고 DTO 로 변환한다.

HTTP 와 DTO 가 비슷해도 레이어를 유지한다.

## 4. 기능 모듈 (Controller / Service / Module)

`modules/Xxx/`

```
Xxx.controller.ts
Xxx.service.ts
Xxx.module.ts
index.ts          # export * 세 파일
```

등록:

1. `modules/index.ts` 에 `export * from './Xxx'`
2. `app.module.ts` 의 `imports` 에 `M.XxxModule`

컨트롤러:

```ts
@Controller('/setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get('/getLeagueArr')
  async getLeagueArr() {
    const {ok, body, gkdErrMsg, statusCode} = await this.settingService.getLeagueArr()
    return {ok, body, gkdErrMsg, statusCode}
  }
}
```

- 경로: `/{모듈}/{동작이름}` (`/setting/getLeagueArr`)
- 컨트롤러는 서비스 결과를 그대로 반환한다. 여기서 DB 를 치지 않는다.
- 사용하지 않는 Nest 데코레이터를 import 하지 않는다. (`_CopyMe` 의 미사용 import 를 복사하지 말 것)

서비스 응답 형태는 항상 같다.

```ts
return {ok: true, body: {leagueArr}, gkdErrMsg: '', statusCode: 200}
```

실패:

```ts
return {ok: false, body: {}, gkdErrMsg: '', statusCode: 200}
```

또는 `@util` 의 `getFailResponse(errObj)` (`ok: false`, `gkdErrMsg`, `statusCode`, `jwtFromServer`). `DEBUG_MODE` 일 때 로그를 찍는다.

서비스 첫 줄에 `where` 경로를 둔다. DB 호출에 넘겨 스택을 이어 붙인다.

```ts
async getLeagueArr() {
  const where = '/setting/getLeagueArr'
  try {
    const {leagueArr} = await this.leagueInfoDBService.readLeagueInfoArr(where)
    return {ok: true, body: {leagueArr}, gkdErrMsg: '', statusCode: 200}
  } catch (errObj) {
    return {ok: false, body: {}, gkdErrMsg: '', statusCode: 200}
  }
}
```

기능 모듈은 `DatabaseModule` 을 `imports` 하고, 생성자에서 `XxxDBService` 를 주입한다.

```ts
@Module({
  imports: [DatabaseModule],
  controllers: [SettingController],
  providers: [SettingService],
  exports: [SettingService],
})
```

## 5. Database 모듈

`modules/Database/schemas/{name}DB/`

```
{name}DB.entity.ts
{name}DB.service.ts
{name}DB.module.ts
index.ts
```

entity:

- 클래스명 = 컬렉션 개념 (`LeagueInfo`)
- `@Schema()` + `@Prop(...)` + `SchemaFactory.createForClass`
- `Document` 확장. `_id` 는 Document 에 있다
- 복합 유니크는 `Schema.index({gameNum: 1, leagueNum: 1}, {unique: true})`

module:

```ts
@Module({
  imports: [MongooseModule.forFeature([{name: LeagueInfo.name, schema: LeagueInfoSchema}])],
  providers: [LeagueInfoDBService],
  exports: [LeagueInfoDBService],
})
```

`Database/schemas/index.ts` 에 export → `DatabaseModule` 이 해당 스키마 모듈을 `imports`/`exports`.

DB 서비스 메서드 이름: `createXxx` / `readXxx` / `updateXxx`.

공통 패턴:

```ts
async readLeagueInfoArr(where: string) {
  where = where + '/readLeagueInfoArr'
  try {
    const leagueArrDB = await this.leagueInfoDBModel.find().sort({leagueNum: -1})
    // Document → OT.LeagueInfoType 매핑 (createdAt → createdAtNum)
    return {leagueArr}
  } catch (errObj) {
    throw errObj
  }
}
```

- 첫 인자 `where: string`. 메서드 진입 시 `where = where + '/메서드명'`
- HTTP 응답을 만들지 않는다. throw 해서 상위 기능 서비스가 `ok/gkdErrMsg` 를 만든다
- 클라이언트에 주기 전에 entity 를 `ObjectTypes` 로 매핑한다
- 수정 0건이면 `console.log(\`[${where}] ...\`)` 정도로 남긴다

`_CopyMeDB` 의 `___CopyMe` 는 예시일 뿐이다. `Database/schemas/index.ts` 에 연결하지 않은 채 복사만 한다.

## 6. main / CORS

`main.ts` 는 `S.CLIENT_IP_PORT` origin, credentials true, `S.SERVER_PORT` listen.

시크릿 값·연결 문자열을 문서나 커밋에 넣지 않는다. `base/secret` 은 gitignore 대상이다.

`server/dist` 는 빌드 산출물이다. 커밋하지 않는다.

## 7. Prettier / 코드 버릇

클라이언트와 동일: `semi: false`, `singleQuote: true`, `printWidth: 150`, `bracketSpacing: false`, `arrowParens: avoid`.

`try/catch` 의 `// ::` 구분, `catch (errObj)` 이름, 빈 `body: {}` 실패 응답을 유지한다.

## 8. 작업 체크리스트

새 HTTP API

1. 필요하면 `HTTPTypes` / `DtoTypes` / `ObjectTypes` / `CommonTypes` 를 클라이언트와 같이 수정
2. `modules/Xxx` 가 없으면 `_CopyMe` 복사 후 `modules/index.ts` + `app.module.ts`
3. controller 경로를 클라이언트 `@fetch` path 와 동일하게
4. service 에서 DB 서비스 호출, `{ok, body, gkdErrMsg, statusCode}` 반환

새 컬렉션

1. `_CopyMeDB` 복사 → entity/service/module 이름 변경
2. `schemas/index.ts` + `database.module.ts` 에 연결
3. 기능 서비스에서 주입

클라이언트와 맞출 것

- path 문자열
- body 필드명 (`HTTP_*`)
- `body` 안의 키 (`leagueArr` 등)
- `createdAtNum` 같은 직렬화 규칙
- `Type_Team` 등 리터럴 (KT가 인덱스 0, 스탯티즈 순. `@value` 의 `teamValues`)
