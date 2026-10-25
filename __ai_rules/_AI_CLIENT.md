# AI Client 작업 가이드

- 스택: React 19 + Vite + TypeScript + Redux Toolkit + React Router + SCSS
- 실행: `client` 폴더에서 `npm run client` 또는 `npm run dev`
- 새 기능은 기존 `_CopyMe` 폴더를 복사해 시작한다. 폴더 구조·파일명·export 방식을 바꾸지 않는다.

## 1. 폴더 역할

```
client/src
├── App.tsx                 # 라우트 정의
├── main.tsx                # BrowserRouter + Redux Provider + URLProvider
├── base
│   ├── components          # 공통 UI (Icon, Modal). alias: @component
│   ├── fetch               # get/post/put/del. alias: @fetch
│   ├── secret              # IP/PORT/URL. gitignore. alias: @secret
│   ├── styles              # 전역 CSS, values.scss
│   ├── types               # 타입. alias 아래 참고
│   ├── utils               # alert, localStorage. alias: @util
│   └── values              # 상수. alias: @value
├── manager
│   ├── context             # API 콜백 + useEffect. alias: @context
│   └── redux               # 전역 상태. alias: @redux
├── pages                   # 페이지. 라우트 단위
└── template                # Header / Lefter / Footer / Modals / Outlet
```

`pages/_CopyMe`, `manager/redux/slices/_CopyMe`, `manager/context/_copyMe`, `template/Modals/_CopyMe` 는 템플릿이다. 실제 기능이 아니다.

## 2. Path alias

`tsconfig.app.json` 과 `vite.config.ts` 둘 다 맞춰야 한다.

| alias | 실제 경로 |
| --- | --- |
| `@commonType` | `src/base/types/CommonTypes` |
| `@httpType` | `src/base/types/HTTPTypes` |
| `@localType` | `src/base/types/LocalTypes` |
| `@objectType` | `src/base/types/ObjectTypes` |
| `@prop` | `src/base/types/props` |
| `@component` | `src/base/components` |
| `@context` | `src/manager/context` |
| `@fetch` | `src/base/fetch` |
| `@util` | `src/base/utils` |
| `@value` | `src/base/values` |
| `@secret` | `src/base/secret` |
| `@redux` | `src/manager/redux` |
| `@styles/*` | `src/base/styles/*` |

타입 import 는 `import type` 을 쓴다 (`verbatimModuleSyntax`).

네임스페이스:

```ts
import * as CT from '@commonType'
import * as OT from '@objectType'
import * as LT from '@localType'
import * as F from '@fetch'
import * as U from '@util'
```

## 3. 타입 구분

- `CommonTypes`: 도메인 리터럴 (`Type_Team`, `Type_Pitcher`, `Type_Result` 등). 서버와 의미가 같아야 한다.
- `ObjectTypes`: 앱이 다루는 객체 (`LeagueInfoType`, `PitcherType`, `RecordObjectType`).
- `HTTPTypes`: 요청 body (`HTTP_AddLeague` 등). 서버 `HTTPTypes` 와 맞춘다.
- `LocalTypes`: 클라이언트 전용 (`ModalType`, `LefterTabType`, `Setter<T>`, `APIReturnType`).
- `props`: DOM props (`DivCommonProps`, `TableRowCommonProps`, `ModalCommonProps`).

컴포넌트 props 는 해당 HTML 엘리먼트 CommonProps 를 확장한다.

```ts
type LeagueRowProps = TableRowCommonProps & {
  league: OT.LeagueInfoType
}
```

`createdAt` 은 서버에서 `createdAtNum: number` 로 온다. Date 객체를 상태로 두지 않는다.

## 4. 하위 컴포넌트 그룹 폴더 (FSD 응용)

**적용:** `src/pages`, `src/template` 안의 큰 컴포넌트(각 Page, `Template`, `Lefter` 등).
**비적용:** `src/base`, `src/manager`. 공용 레이어라 페이지 로컬 의존 방향을 넣을 수 없다.

하위 UI는 부모와 **같은 폴더 안 그룹 폴더**에 두고, 그 안에 컴포넌트별 폴더를 만든다. 그룹명은 **복수형**.

```
ExamplePage/
  ExamplePage.tsx
  ExamplePage.scss
  index.ts
  objects/
    FooObject/
      FooObject.tsx
      index.ts
  parts/
    BarPart/
      BarPart.tsx
      index.ts
  rows/
    BazRow/
      BazRow.tsx
      index.ts
  units/
    QuxUnit/
      QuxUnit.tsx
      index.ts
```

지금 코드: `SettingPage/units`, `SettingPage/rows`, `template/Lefter/rows`.
`Template` 직속 `Header` / `Lefter` / `Footer` / `Modals` 는 레이아웃 슬롯이다. 그룹 폴더는 그 안(Lefter, 각 Page)에 둔다.

필요한 그룹만 만든다. 빈 그룹을 미리 깔지 않는다.

### 알파벳 의존 방향

그룹 폴더명을 알파벳 오름차순으로 정렬했을 때:

- **뒤 그룹** → **앞 그룹** 참조 가능
- **앞 그룹** → **뒤 그룹** 참조 금지
- **같은 그룹** 안에서는 서로 참조하지 않는 것을 기본으로 한다

예: `parts` 는 `objects` 를 쓸 수 있다. `objects` 는 `parts` 를 쓰지 않는다. (`objects` < `parts`)

부모 tsx(`ExamplePage.tsx`)는 하위 그룹을 모두 참조할 수 있다.

그룹마다 `index.ts` barrel. 부모는 별칭으로 가져온다.

```ts
import * as O from './objects'
import * as P from './parts'
import * as R from './rows'
import * as U from './units'
```

한 단계 아래에서는 부모 기준으로 올라간다.

```ts
// ExamplePage/units/QuxUnit/QuxUnit.tsx
import * as R from '../../rows'
```

### 예약 그룹명

이 이름만 쓴다. 단수형 폴더(`unit`, `row`)를 만들지 않는다.

알파벳 순 = 의존 방향 (위가 작은 조각, 아래가 큰 조각).

| 그룹 | 쓰는 곳 |
| --- | --- |
| `addons` | 배지·툴팁처럼 독립 동작이 거의 없는 덧붙임 |
| `assets` | 그 부모 전용 정적 조각. 전역 에셋(`base/styles`)과는 별개 |
| `bases` | 그 부모 안에서만 쓰는 가장 밑단 래퍼 |
| `buttons` | 버튼 |
| `cells` | 테이블/그리드 칸 |
| `commons` | 같은 부모 안 공유 조각. 앱 전역(`@component`)까지는 올리지 않을 때 |
| `components` | 아래 이름에 안 들어가는 중간 UI. 더 구체적인 그룹이 있으면 그쪽 |
| `elements` | 라벨·입력·텍스트 한 덩어리 |
| `features` | 그 부모 안의 기능 단위 (필터 한 세트, 폼 한 덩어리) |
| `groups` | 단순 묶음. 도메인 로직은 거의 없다 |
| `icons` | 그 부모 전용 아이콘 조합. 공용 `Icon` 은 `@component` |
| `modules` | `features` 보다 크고 `units` 보다 작은 기능 블록 |
| `objects` | 도메인 객체 1건 UI |
| `parts` | object 여러 개, 또는 object 를 감싼 조립 조각 |
| `rows` | 테이블 행·리스트 한 줄 (`LeagueRow`, Lefter 의 `SettingRow`) |
| `subPages` | 부모 Page 내부 전환 화면. `App.tsx` 라우트 페이지가 아님 |
| `units` | 페이지를 나누는 큰 구역 (`LeagueUnit`, `TeamUnit`, `PlayerUnit`) |

### 추천 후보 (예약 목록에 없음)

새 이름이 꼭 필요할 때만. **조립하는 쪽이 알파벳상 뒤**여야 한다.

| 후보 | 알파벳 위치 | 이유 |
| --- | --- | --- |
| `items` | `icons` < **items** < `modules` | 리스트 한 칸. `rows`(테이블 행)와 구분할 때 |
| `tables` | `subPages` < **tables** < `units` | `rows`/`cells` 를 담으려면 `rows` 보다 뒤여야 한다 |
| `sections` | `rows` < **sections** < `subPages` | 여러 row 를 묶는 중간 블록 |
| `popups` | `parts` < **popups** < `rows` | objects/parts 로 작은 오버레이를 조립할 때 |
| `windows` | `units` < **windows** | unit 까지 담는 큰 오버레이 |
| `views` | `units` < **views** | unit 보다 크고 Page 보다 작은 화면 덩어리 |

쓰지 말 것:

- `modals`: `modules`/`objects` 보다 앞이라 도메인 UI 를 조합할 수 없다. 공용 셸은 `@component`, 화면 모달은 `template/Modals` 또는 `popups`/`windows`.
- `lists`: `rows` 보다 앞이라 행을 담지 못한다. 행을 담으면 `tables`.
- `layouts`: `modules` 앞이라 unit/row 를 못 담는다. 페이지 뼈대는 부모 tsx 또는 `bases`.

## 5. 컴포넌트 작성 규칙

한 컴포넌트 = 폴더 하나.

```
Foo/
  Foo.tsx
  Foo.scss      # 필요할 때만
  index.ts      # export * from './Foo'
```

기본 형태:

```tsx
import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './Foo.scss'

type FooProps = DivCommonProps

export const Foo: FC<FooProps> = ({...props}) => {
  return (
    <div className={`Foo`} {...props}>
      {/* 1. 타이틀 */}
      <p className={`Title_Unit`}>제목</p>
    </div>
  )
}
```

- named export. default export 쓰지 않는다. (`App.tsx` 만 예외)
- 루트 `className` 은 컴포넌트명과 같다.
- 자식 클래스: `{역할}_{부모역할}` → `Title_Page`, `Body_Page`, `Title_Unit`, `Table_Unit`, `Title_Row`, `AddLeagueIcon_Row`
- 선택 상태: `_selected` (`SettingRow`)
- `props` 를 루트에 스프레드해서 className/onClick 확장을 연다.
- 이벤트는 `useCallback`, 안에서 `e.stopPropagation()`
- JSX 주석으로 구역을 나눈다 (`{/* 1. 타이틀 */}`)
- 상위 스타일로  sufficed 하면 하위 scss import 를 생략하고 주석으로 이유를 남긴다.

컴포넌트 함수 본문 순서. 없는 항목은 생략한다. return(JSX) 은 가급적 맨 마지막.

선언:

1. Redux 에서 불러올 state, action
2. Context 에서 불러올 state, action
3. `useState`
4. 그 외 훅 (`useNavigate` 등)
5. 내부적으로 쓸 변수
6. `CSSProperties` 변수 (잘 안 씀)

함수 / 이펙트:

1. 공통적으로 쓸 함수
2. 이벤트 리스너 — 변수명에 이벤트 종류부터 적는다 (`onClickButton`)
3. `useEffect` — 상단에 뭐 하는 건지 한 줄 주석

```tsx
export const Foo: FC<FooProps> = ({...props}) => {
  const {modalType} = useModalStates()
  const {closeModal} = useModalActions()
  const {getLeagueArr} = useSettingCallbacksContext()

  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const onClickRow = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    navigate('/main/setting')
  }, [navigate])

  // 리그 목록 불러오기
  useEffect(() => {
    getLeagueArr()
  }, [getLeagueArr])

  return (
    <div className={`Foo`} {...props} />
  )
}
```

barrel 로 묶고 별칭으로 쓴다. `import * as` 그룹은 `as` 별칭 알파벳순.

```ts
import * as M from './Modals'
import * as P from './pages'
import * as R from '../../rows'
import * as U from './units'
```

## 6. import 규칙

그룹 순서와 그룹 사이 빈 줄 1칸을 지킨다. 없는 그룹은 생략한다. 그룹 안에는 빈 줄을 넣지 않는다.

1. 값 import — 패키지 (`react`, `react-router-dom` 등)
2. 값 import — alias (`@component`, `@redux` 등)
3. 값 import — 상대경로 (`./`, `../`)
4. `import type` — 패키지 → alias → 상대경로 순. 이 안에서는 빈 줄 없음
5. `import * as X from ...`
6. 사이드 이펙트 (`import './Foo.scss'`)

같은 그룹은 `from` 경로 문자열 알파벳순.

예외: `import * as` 그룹만 `as` 뒤 별칭 알파벳순. `from` 은 보지 않는다.

```tsx
import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import {Icon} from '@component'
import {useModalActions} from '@redux'

import {Footer} from './Footer'
import {Header} from './Header'
import {Lefter} from './Lefter'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'
import type {ModalCommonProps} from '../../types'

import * as M from './Modals'
import * as R from '../../rows'
import * as U from '@util'

import './Template.scss'
```

- `react` 값과 `import type {FC} from 'react'` 는 다른 그룹이다.
- `import * as U from '@util'` 과 `import {Icon} from '@component'` 도 다른 그룹이다. namespace 는 5번으로 모은다.
- 기본 형태 예시처럼 type 과 scss 만 있으면 1~3, 5번은 생략한다.

## 7. 라우트 / 레이아웃

`App.tsx`

- `/` → `RedirectHomePage` (1초 후 `/main`)
- `/main/*` → `Template` + Outlet
  - `/main` → `IntroPage`
  - `/main/setting` → `SettingPage`
  - `/main/pitchRecord` → `PitchRecordPage`

새 페이지:

1. `pages/XxxPage/` 를 `_CopyMe` 복사
2. `pages/index.ts` 에 export
3. `App.tsx` 에 Route 추가
4. Lefter 행이 필요하면 `template/Lefter/rows` 추가 + `URLEffects` 의 pathname 분기 + `LefterTabType` + `Base` slice 액션

`Template` 구조: Header / (Lefter + PageArea Outlet) / Footer / 모달 스위치.

## 8. Redux

전역 UI· entites. `manager/redux/slices/{Name}/`

- `slice.ts`: `createSlice`, `NameSlice` export
- `hook.ts`: `useNameStates`, `useNameActions` (선택적으로 단일 필드 훅)
- `index.ts`: `export * from './hook'` / `export * from './slice'`

등록:

1. `slices/index.ts`
2. `store.ts` 의 `reducer`

현재 슬라이스:

- `base`: `lefterTab`, `pageTeamName`
- `modal`: `modalType`
- `record`: `leagueArr`, `leagueNum`

액션 훅은 의도가 드러나는 이름을 쓴다.

```ts
closeModal: () => dispatch(ModalSlice.actions.setModalType(null))
openAddLeagueModal: () => dispatch(ModalSlice.actions.setModalType('AddLeague'))
```

컴포넌트에서 `useDispatch` 직접 쓰지 말고 슬라이스 훅을 쓴다.

`_CopyMe` 슬라이스는 store 에 등록하지 않는다.

## 9. Context

서버 통신과 그 결과를 Redux 에 넣는 부수효과. 페이지/도메인 단위.

파일:

- `__states.tsx`: 로컬 state
- `_callbacks.tsx`: fetch 함수 (`useCallback`)
- `_effects.tsx`: `useEffect` (주석: `// 자동 갱신: ...`)
- `_provider.tsx`: States → Callbacks → Effects 순으로 감싼다
- `index.ts`: 전부 re-export

콜백 패턴 (`setting/_callbacks.tsx`):

```ts
const url = `/setting/getLeagueArr`
return F.get(url, null)
  .then(res => res.json())
  .then(res => {
    const {ok, body, statusCode, gkdErrMsg, message} = res
    if (ok) {
      // body 필드 검증 후 {isSuccess: true, ...}
    } else {
      U.alertErrMsg(url, statusCode, gkdErrMsg, message)
      return {isSuccess: false} as LT.APIReturnType
    }
  })
  .catch(errObj => {
    U.alertErrors(url, errObj)
    return {isSuccess: false} as LT.APIReturnType
  })
```

반환은 `APIReturnType` (`isSuccess` + 임의 필드).

`URLProvider` 는 `main.tsx` 에서 앱 전체를 감싼다. 경로에 따라 Lefter 탭을 맞춘다.

`SettingProvider` 는 구현되어 있으나 아직 어디에도 감싸지 않았다. 리그 목록을 실제로 불러오려면 `SettingPage` 또는 Template 에 연결해야 한다.

컨텍스트 타입 블록은 `// prettier-ignore` 로 세로 정렬을 유지한다.

## 10. 모달

1. `LocalTypes.ModalType` 에 리터럴 추가 (`'AddLeague' | ... | null`)
2. `Modal/hook.ts` 에 `openXxxModal` 추가
3. `template/Modals/XxxModal/` 생성 (`Modal` 컴포넌트 + `onClose={closeModal}`)
4. `template/Modals/index.ts` export
5. `Template.tsx` 에서 `modalType === 'Xxx' && <M.XxxModal />`

공통 모달: `@component` 의 `Modal`, `ModalLv2` (z-index 만 다름). 배경 클릭 시 close, 내용 클릭은 `stopPropagation`.

인라인 `style` 로 모달을 꾸미지 않는다. 클래스로 한다.

## 11. Fetch

`@fetch`: `get(path, jwt)`, `del(path, jwt)`, `post(path, data, jwt)`, `put(path, data, jwt)`

- path 는 `/setting/getLeagueArr` 처럼 서버 컨트롤러와 동일한 문자열
- jwt 없으면 세 번째 인자에 `null`
- URL 은 `@secret` 의 `SERVER_URL` + path

에러 알림은 `@util` 의 `alertErrMsg` / `alertErrors` 만 쓴다.

## 12. 스타일

- 컴포넌트 scss 는 부모 선택자로 감싼다. 페이지는 `.Template { .SettingPage { ... } }`, 유닛은 `.SettingPage { .LeagueUnit { ... } }`
- 색/간격 토큰은 `base/styles/values.scss` (`@use '.../values.scss' as v`)
- 속성 알파벳 순에 가깝게, 빈 줄로 그룹을 나눈다
- Material Symbols: `Icon` / `IconFilled` (`iconName` = 글리프 이름)

## 13. Prettier / 코드 버릇

- `semi: false`, `singleQuote: true`, `printWidth: 150`, `bracketSpacing: false`, `arrowParens: avoid`, `trailingComma: es5`
- 분기 끝 `// ::` 는 의도된 시각 구분이다. 지우지 않는다.
- `PayloadAction` import 옆 `// eslint-disable-line` 은 슬라이스 템플릿 관례다.

## 14. 작업 체크리스트

새 페이지

1. `_CopyMe` 복사 → `pages/index.ts` → `App.tsx`
2. 필요 시 Lefter + URLEffects + Base 탭 타입
3. `pages`/`template` 하위 UI 는 예약 그룹 폴더(`rows`, `units` 등)에 두고, 알파벳상 뒤 그룹만 앞 그룹을 참조한다. `base`/`manager` 에는 그룹 폴더를 만들지 않는다.

새 전역 상태

1. `_CopyMe` 슬라이스 복사 (이름: `XxxSlice`, store key 는 camelCase)
2. `slices/index.ts` + `store.ts`

새 API

1. context `_callbacks` 에 fetch
2. `_effects` 또는 버튼 핸들러에서 호출
3. 성공 시 Redux 액션으로 반영
4. 서버 path / HTTP 타입과 맞출 것

공통값·팀 상수·NULL 객체는 `@value` (`teamValues`, `nullValues`). 매직 스트링으로 팀을 하드코딩하지 않는다.
