# skala-vue

Vue 3 학습 실습 과제를 과제 단위로 정리한 저장소입니다.

## 폴더 구조

과제별 산출물을 `dayN` 폴더로 분리하여, 각 과제를 독립적으로 실행하고 확인할 수 있도록 구성하였습니다.

```
src/exercise/
├── AppTabs.vue           통합 진입점 (과제별 탭 전환)
├── App1.vue ~ App7.vue   과제별 단독 진입점
├── day1/                 SearchCity, WeatherByRegion
├── day2/                 WeatherComposition
├── day3/                 BaseDashboardCard, SearchBar, SearchHistory,
│                         WeatherCard, WeatherParent
├── day4/                 router.js
│   └── views/            Home, Detail, About, History, NotFound
├── day5/                 UnitToggler, WeatherCardStore, router.js
│   ├── stores/           configStore, weatherStore
│   └── views/            Home, Detail, History, Forecast (스토어 · API 적용)
├── day6/                 과제 3 화면에 PrimeVue 적용
└── day7/                 전체 화면에 PrimeVue 적용
    ├── router.js
    └── views/            Home, Detail, Forecast, About, NotFound
```

`day5`는 기온이 표시되는 화면만 전용 View를 사용하고,
기온과 무관한 화면(`About`, `NotFound`)은 `day4`의 View를 그대로 재사용합니다.

`day7`은 화면(View)만 새로 작성하고,
데이터 로직은 `day5`의 스토어를, 공통 컴포넌트는 `day6`의 것을 재사용합니다.
이렇게 구성하면 뒤 과제를 진행해도 앞 과제의 화면이 그대로 보존됩니다.

## 실행 방법

기본 진입점은 `AppTabs.vue`이며, 과제별 화면을 상단 탭으로 전환하며 확인할 수 있습니다.

```js
import App from './exercise/AppTabs.vue'
import router from './exercise/day7/router'
```

특정 과제만 단독으로 실행하려면 `src/main.js`에서 진입점을 교체합니다.
과제 4부터는 라우터를 사용하므로 `App`과 `router`를 항상 짝으로 교체해야 합니다.

```js
import App from './exercise/App5.vue'
import router from './exercise/day5/router'
```

```bash
npm install
npm run dev
```

OpenWeatherMap API를 사용하므로 `.env.example`을 `.env.local`로 복사한 뒤
발급받은 키를 입력해야 실시간 날씨 데이터가 표시됩니다.

## 1. Weather Mockup.ver1

### 구현한 기능

- 도시 검색 기능
- 도시 카드 선택 및 상세 날씨 확인

도시 검색 기능과 도시 카드 선택 및 상세 날씨 확인 기능을 2개의 컴포넌트로 분리하여 구현하였습니다.

구현 과정에서는 PDF에 제공된 예시 화면과 유사하게 구현하려고 하였습니다.

또한 하나의 요소에 여러 개의 class를 함께 지정하여,
공통 스타일과 상태별 스타일을 조합해서 적용할 수 있다는 점을 학습하였습니다.

예를 들어 `class="region hot"`과 `class="region cool"`처럼
`region`에는 공통 스타일을 적용하고,
`hot`, `cool`에는 각각 다른 배경색을 적용하는 방식으로 구현하였습니다.

## 2. Weather Mockup.ver2

### 구현한 기능

- `ref()`를 이용한 검색어, 선택 도시 정보, 날씨 데이터의 반응형 상태 관리
- `computed()`를 이용한 도시 검색 결과 필터링
- `watch()`를 이용한 선택된 도시 정보 변경 감지
- `watchEffect()`를 이용한 검색어 변경 자동 추적
- `watch()`를 이용한 검색 기록 관리
- 검색 결과에 따른 화면 출력 처리

기존 Weather Mockup에서 구현한 기능을 기반으로 Composition API를 적용하였습니다.

`computed()`를 사용하여 사용자가 입력한 검색어에 따라 날씨 데이터를 필터링하고,
검색어가 없을 경우 전체 도시를 출력하며 일치하는 도시가 없을 경우 별도의 안내 문구가 출력되도록 구현하였습니다.

또한 `watch()`를 통해 선택된 도시 정보의 변경을 감지하고,
`watchEffect()`를 통해 검색어의 변화를 자동으로 추적하여 콘솔에서 확인할 수 있도록 구현하였습니다.

또한 `ref()`로 선언한 배열에 검색 기록을 저장하고,
`watch()`로 검색어의 변경을 감지하여 실제 도시명과 일치하는 경우에만 기록에 추가되도록 구현하였습니다.

검색어는 입력할 때마다 변경되기 때문에 별도의 조건 없이 기록할 경우
도시 이름을 완성하는 중간 입력까지 모두 쌓이게 됩니다.
이를 방지하기 위해 기존 도시 목록과 일치하는지 확인한 뒤 기록하도록 처리하였습니다.

검색 기록은 이전 입력이 누적된 결과이므로 `computed()`로는 만들 수 없는 값이며,
이를 통해 상태 변화에 따른 추가 작업은 `watch()`로 처리해야 한다는 점을 학습하였습니다.

이번 실습을 통해 `computed()`는 반응형 데이터를 이용해 새로운 값을 계산할 때 사용하고,
`watch()`와 `watchEffect()`는 반응형 데이터의 변화를 감지하여 추가 작업을 수행할 때 사용할 수 있다는 차이를 학습하였습니다.

## 3. Weather Mockup.ver3

### 구현한 기능

- 기능 변경 없이 4개의 Component 파일로 분리
- `props`를 이용한 부모 컴포넌트의 데이터 전달
- `emit`을 이용한 자식 컴포넌트의 이벤트 전달
- `<slot>`을 이용한 공통 디자인 재사용
- `<style scoped>`를 이용한 컴포넌트별 스타일 분리
- `SearchHistory.vue` 컴포넌트 추가

기존 Weather Mockup.ver2의 기능을 그대로 유지한 상태에서 컴포넌트 단위로 분리하였습니다.

모든 반응형 데이터는 `WeatherParent.vue`에 유지하고,
나머지 컴포넌트는 전달받은 데이터를 표시하거나 이벤트를 전달하는 역할만 담당하도록 구현하였습니다.

`BaseDashboardCard.vue`는 검색 박스와 리스트 박스의 공통 디자인을 담당하며,
`<slot>`을 배치하여 부모 컴포넌트가 도시 검색, 검색 기록, 지역별 날씨 현황을 주입할 수 있도록 구현하였습니다.

`SearchBar.vue`는 부모로부터 검색어를 `props`로 전달받아 표시하고,
검색어가 입력되면 `update-query` 이벤트를 발생시키면서 검색어를 부모에게 전달하도록 구현하였습니다.
이때 `v-model` 대신 `:value`와 `@input`을 사용하였는데,
`v-model`은 한글을 조합하는 동안에는 값을 갱신하지 않기 때문에
입력과 동시에 검색 결과를 반영하기 위해 직접 바인딩하는 방식을 선택하였습니다.

`WeatherCard.vue`는 선택된 도시 객체를 `props`로 전달받아 표시하고,
카드를 선택하는 `select-card` 이벤트와 상세보기의 `click-detail` 이벤트를 부모에게 전달하도록 구현하였습니다.

`<slot>`으로 전달되는 자식 컴포넌트는 시각적으로는 `BaseDashboardCard.vue` 내부에 위치하지만,
스크립트적으로는 부모 컴포넌트의 스코프에서 컴파일되므로
`WeatherParent.vue`에서 `SearchBar.vue`, `WeatherCard.vue`와 직접 바인딩 및 통신이 가능하다는 점을 학습하였습니다.

추가 컴포넌트로는 Weather Mockup.ver2에서 구현한 검색 기록을 `SearchHistory.vue`로 분리하였습니다.
검색 기록을 `props`로 전달받아 표시하고,
기록을 선택하면 `select-history` 이벤트로 해당 도시명을 부모에게 전달하여
다시 검색되도록 구현하였습니다.

이번 실습을 통해 `props`는 부모에서 자식으로 데이터를 전달할 때 사용하고,
`emit`은 자식에서 부모로 이벤트를 전달할 때 사용하며,
`<slot>`은 반복되는 디자인을 공통화하여 재사용할 때 사용할 수 있다는 것을 학습하였습니다.

## 4. Weather Mockup.ver4

### 구현한 기능

- Vue Router 설정 및 라우터 지연 로딩 적용
- Catch-all Route를 이용한 페이지 없음 처리
- `RouterLink`와 `RouterView`를 이용한 Navigation Bar 및 메인 콘텐츠 영역 구성
- Programmatic Navigation을 이용한 상세 페이지 이동
- 동적 경로 매칭(`:cityId`)을 이용한 도시별 상세 기상 정보 조회
- 쿼리 스트링을 이용한 검색어 및 조회 상태 동기화
- `WeatherHistoryView.vue` 과거 날씨 조회 화면 추가

기존 Weather Mockup.ver3에서 작성한 컴포넌트를 그대로 재사용하면서,
화면 단위를 View로 분리하고 Vue Router를 적용하였습니다.

`WeatherParent.vue`가 담당하던 대시보드 화면은 `WeatherHomeView.vue`로 옮기고,
`BaseDashboardCard.vue`, `SearchBar.vue`, `WeatherCard.vue`는 수정 없이 그대로 사용하였습니다.

라우터에는 `/`, `/about`, `/weather/:cityId`, `/history` 경로를 등록하고,
정의되지 않은 주소는 Catch-all Route(`/:pathMatch(.*)*`)로 처리하여
`NotFoundView.vue`가 출력되도록 구현하였습니다.
메인 화면을 제외한 나머지 경로에는 지연 로딩을 적용하여
해당 화면에 접근하는 시점에 필요한 파일만 내려받도록 구현하였습니다.

`App4.vue`에는 `RouterLink`로 구성한 Navigation Bar와
화면이 출력될 `RouterView` 영역을 배치하였습니다.

`WeatherHomeView.vue`에서는 상세보기 버튼의 `window.alert()`를 제거하고,
`router.push('/weather/' + id)`를 호출하는 Programmatic Navigation으로 변경하였습니다.

`WeatherDetailView.vue`는 동적 경로 매칭으로 전달된 `cityId`를 `route.params`에서 읽어,
Mount 시점에 Mock Data에서 해당 도시 객체를 선택하도록 구현하였습니다.

추가 화면으로는 `WeatherHistoryView.vue`를 작성하여 `/history` 경로에 연결하였습니다.
도시별 최근 10일간의 관측 기록을 표로 출력하고,
조회할 도시는 쿼리 스트링(`/history?city=city_01`)으로 관리하여
별도의 상태 변수 없이 `route.query`만으로 화면이 갱신되도록 구현하였습니다.

이번 실습을 통해 `push()`와 `replace()`의 차이를 학습하였습니다.
검색어를 입력할 때마다 `push()`를 호출하면 한 글자마다 방문 기록이 쌓이기 때문에
뒤로가기가 정상적으로 동작하지 않게 됩니다.
다른 화면으로 이동할 때는 `push()`를 사용하고,
같은 화면에서 주소의 상태만 갱신할 때는 `replace()`를 사용해야 한다는 것을 확인하였습니다.

## 5. Weather Mockup.ver5

### 구현한 기능

- Pinia를 이용한 `configStore.js` 작성 및 적용
- `state`, `getters`, `actions`를 이용한 날씨 단위 관리
- `UnitToggler.vue` 단위 변경 컴포넌트 작성 및 Navigation Bar 배치
- 메인, 상세, 과거 조회 화면에 단위 설정 변경 적용
- 인자를 받는 getter를 이용한 단위 변환 로직 공통화
- 추가 스토어 `weatherStore.js` 작성 및 도시 데이터 통합

기존 Weather Mockup.ver4의 화면 구성을 유지한 상태에서 Pinia 스토어를 적용하였습니다.

`configStore.js`에는 단위를 저장하는 `unit`을 state로 선언하고,
현재 단위에 맞는 기호를 리턴하는 `unitSymbol`을 getter로,
섭씨와 화씨를 전환하는 `toggleUnit()`을 action으로 작성하였습니다.

`UnitToggler.vue`는 Navigation Bar 옆에 배치하여 현재 단위를 표시하고,
버튼을 누르면 스토어의 `toggleUnit()`을 직접 호출하도록 구현하였습니다.
스토어를 사용하면 부모에서 자식으로 `props`를 내려보내지 않아도
필요한 컴포넌트에서 직접 상태를 읽고 변경할 수 있다는 점을 확인하였습니다.

단위 설정은 메인 대시보드뿐 아니라 상세 화면과 과거 날씨 조회 화면에도 적용하였습니다.
이때 화면마다 변환 로직을 각각 작성하면 동일한 코드가 중복되기 때문에,
섭씨 값을 현재 단위에 맞춰 변환해 주는 `toDisplayTemp` getter를 스토어에 추가하였습니다.
getter가 인자를 받아야 하는 경우에는 값을 바로 리턴하지 않고
함수를 리턴하는 `computed`로 작성해야 한다는 점을 학습하였습니다.

추가 스토어로는 `weatherStore.js`를 작성하였습니다.
도시 목록과 상세 관측 정보, 과거 관측 기록이 화면마다 따로 선언되어 있었기 때문에
이를 스토어의 state로 모으고,
도시 코드로 각 데이터를 조회하는 `getCityById`, `getDetailById`, `getRecordsById`와
검색어로 도시를 거르는 `searchCities`를 getter로 작성하였습니다.
그 결과 도시 데이터를 수정할 때 스토어 한 곳만 변경하면
메인, 상세, 과거 조회 화면에 모두 반영되도록 구현하였습니다.

이번 실습을 통해 여러 화면이 함께 사용하는 상태는 스토어에서 관리해야 한다는 것을 학습하였습니다.
Weather Mockup.ver4에서는 화면을 이동하면 View가 다시 생성되어 상태가 유지되지 않았고,
`props`와 `emit`만으로는 화면 사이에 값을 전달하기 어려웠습니다.
스토어를 적용한 뒤에는 화면 계층이나 이동 여부와 관계없이
같은 상태를 공유할 수 있다는 점을 확인하였습니다.

## 6. Weather Mockup.ver6

### 구현한 기능

- 외부 UI Library로 PrimeVue 선정 및 적용
- 과제 3 화면에 UI Library 적용 (`App6.vue`)
- 전체 화면에 UI Library 적용 (`App7.vue`)
- `Menubar`를 이용한 Navigation Bar 구성
- `DataTable`을 이용한 예보 데이터 출력 및 정렬
- `Toast`, `Message`를 이용한 알림 및 상태 표시

외부 UI Library로 PrimeVue를 선정하였습니다.
Element Plus와 비교하였을 때 컴포넌트 종류가 더 많고,
컴포넌트를 파일 단위로 불러오는 방식이라 사용한 것만 번들에 포함된다는 점을 고려하였습니다.
실제로 두 라이브러리를 각각 적용해 빌드해 본 결과
전역 등록 방식에서는 CSS가 355KB였으나 PrimeVue에서는 17KB로 줄어드는 것을 확인하였습니다.

적용 범위는 두 단계로 나누었습니다.
`App6.vue`는 과제 3의 단일 화면에 UI Library를 적용한 것이고,
`App7.vue`는 라우터와 스토어, API 연동이 모두 포함된 전체 화면에 적용한 것입니다.

기존 컴포넌트를 직접 수정하지 않고 `day6`, `day7` 폴더를 새로 작성하였습니다.
`day3`의 컴포넌트는 과제 4와 과제 5가 함께 사용하고 있어,
직접 수정할 경우 앞선 과제의 화면까지 함께 변경되기 때문입니다.
`props`와 `emit` 계약, `computed`와 `watch` 등의 반응형 로직은 그대로 유지하고
마크업과 스타일만 교체하여, 원본과 비교할 수 있도록 구현하였습니다.

주요 교체 내역은 다음과 같습니다.

| 기존                   | PrimeVue                  |
| ---------------------- | ------------------------- |
| 직접 작성한 카드 `div` | `Card`                    |
| `input`                | `IconField` + `InputText` |
| 더움 / 선선함 뱃지     | `Tag`                     |
| 상세보기 버튼          | `Button`                  |
| 검색 기록 목록         | `Chip`                    |
| 상태바, 안내 문구      | `Message`                 |
| `window.alert()`       | `Toast`                   |
| `RouterLink` 나열      | `Menubar`                 |
| 직접 작성한 `table`    | `DataTable`               |
| 단위 변경 버튼         | `SelectButton`            |

`DataTable`을 적용하면서 예보 표에 날짜, 기온, 습도 기준 정렬 기능이 추가되었습니다.
직접 구현하지 않아도 라이브러리가 제공하는 기능을 그대로 사용할 수 있다는 점을 확인하였습니다.

이번 실습을 통해 UI Library를 적용할 때는
컴포넌트가 기본으로 제공하는 동작이 기존 요구사항과 충돌하지 않는지
확인해야 한다는 점을 학습하였습니다.
검색 입력창의 경우 `v-model`을 사용하면 한글 조합 중에는 값이 갱신되지 않기 때문에,
과제 3의 한글 즉시 동기화 동작을 유지하기 위해
`:value`와 `@input`으로 직접 바인딩하는 방식을 그대로 사용하였습니다.
