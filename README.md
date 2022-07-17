# 🎞 영화 검색 사이트

[배포 링크](https://searchfilm-ee77a4.netlify.app/)

영어로 제목을 입력하면 관련 영화들의 정보를 볼 수 있는 사이트입니다. 

# 🤔 사이트 제작 배경

Vue를 공부하고 학습한 내용을 확인하기 위해 만들었습니다. 

# 👩‍💻 주요 구현 사항 


### 1. 검색어 입력시 유효성검사

검색어 입력시 아래처럼 regex, 조건물을 통해 유효성 검사를 한다.

```
validateKeyword() {
  const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
  const isInvalid =
    regex.test(this.keyword) || this.keyword.length < 2 || this.keyword.length > 15
  if (isInvalid) {
    alert('검색어는 한글을 제외하고 2~15자로 입력해주세요')
  } else {
    this.$router.push(`/search/${this.keyword}`)
  }

```

유효성 검사를 통과하면 해당 keyword로 api를 호출해서 영화목록을 가져온다.

```
async fetchSearch() {
  this.isLoading = true
  const params = `?s=${this.$route.params.keyword}&page=${this.page}`
  const result = await fetch(`/.netlify/functions/search${params}`).then((result) =>
    result.json()
  )

  if (!result.Response) {
    this.isFetched = false
  }

  this.searchList = [...this.searchList, ...result.Search]
  this.totalResults = result.totalResults
  this.isLoading = false

```

이때 api에 접근하는 건 `/.netlify/functions/search` 경로에 만든 가상 함수다.

```
const axios = require('axios')
const { API_END_POINT, API_KEY } = process.env

exports.handler = async function (event) {
  const { s, page } = event.queryStringParameters
  try {
    const { data } = await axios.get(`${API_END_POINT}?apikey=${API_KEY}&s=${s}&page=${page}`)
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: error.message,
    }
  }
}

```

만약 다음 페이지를 가져오고 싶다면 더보기 버튼을 누르고, 해당 버튼 클릭시 loadMore() 함수를 호출해서 새로 리스트를 추가한다.

```
loadMore() {
  this.page += 1
  this.fetchSearch()
},

```

### 2. 영화 상세 정보 보기 ( path query 사용 )

검색된 리스트를 누르면 통해 영화의 상세정보를 볼 수 있도록 fetchDetail 함수를 호출하고,

```
async fetchDetail() {
  this.isLoading = true
  const params = `?i=${this.$route.params.imdbID}&plot=full`
  const result = await fetch(`/.netlify/functions/searchDetail${params}`).then((result) =>
    result.json()
  )
  this.film = result
  this.isLoading = false
},

```

해당 함수는 서버리스로 쿼리문을 보내 해당 쿼리문 내용으로 다시 get 요청을 받아 fetchDetail로 반환한다.

```
const axios = require('axios')
const { API_END_POINT, API_KEY } = process.env

exports.handler = async function (event) {
const { i } = event.queryStringParameters
try {
  const { data } = await axios.get(`${API_END_POINT}?apikey=${API_KEY}&i=${i}`)
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
} catch (error) {
  return {
    statusCode: error.response.status,
    body: error.message,
  }
}
}

```

### 3. 환경변수 은닉

API Key(`7035c60c`)를 환경변수로 만들어서 은닉했다.

개발시엔 dotenv-webpack 라이브러리 설치 후 .env 파일에 해당 내용을 입력 후

```
API_KEY="7035c60c"
API_END_POINT="<https://www.omdbapi.com>"
NETLIFY_API = "/.netlify/functions/workspace"

```

사용할 파일에서 `const { API_END_POINT, API_KEY } = process.env` 이런 식으로 가져왔다.

배포시엔 .env파일을 올리지 않고, netlify에서 제공하는 환경변수에 해당 값을 입력했다.

### 4. 로딩 처리

API 요청을 하는 동안 isLoading을 true로 만들어 loading.gif가 화면에 나오도록 했다.

```
<Loading v-show="isLoading" />

```

# 👩‍💻 refactor & fix



### 1.  최적화

fetch를 여러번 하기 때문에 v-if보다 v-show가 더 효율적이라고 생각해서 해당 디렉터리를 사용했다.

```
async fetchDetail() {
  this.isLoading = true
  const params = `?i=${this.$route.params.imdbID}&plot=full`
  const result = await fetch(`/.netlify/functions/searchDetail${params}`).then((result) =>
    result.json()
  )
  this.film = result
  this.isLoading = false
},

```

### 2. 의문점과 해결

검색을 하면 라우팅을 통해서 검색어를 전달하고 created() 사이클에서 fetch를 하도록 했다.

```
this.$router.push(`/search/${this.keyword}`)

```

그런데 이렇게 하면 SearchPage처럼(아래) 해당 페이지에서 라우팅을 하기에 created() 라이프 사이클을 사용하지 않는 예외가 생긴다.

![https://user-images.githubusercontent.com/79133602/169147694-575cf45d-afa7-4666-a786-2d87f8f31d7c.png](https://user-images.githubusercontent.com/79133602/169147694-575cf45d-afa7-4666-a786-2d87f8f31d7c.png)

### 해결방안

해당 라우팅의 path를 to, from을 사용해서 비교한 뒤

```
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.fetchSearch('route')
      }
    },
  },

```

다르면 type을 달리해서 fetch를 하도록 만들면 된다. 

```
if (type === 'render') {
    this.searchList = [...this.searchList, ...result.Search]
  } else {
    this.searchList = result.Search
  }

```

### 3. 또 다른 문제

 상세 페이지로 이동할 때도 watch가 실행되기 때문에 불필요한 API 요청이 생기고 있었다!  그래서 다음과 같이 search path로 이동할 때만 fetchSearch를 호출하도록했다.

```jsx
watch: {
    $route(to, from) {
      if (to.path.includes('search')) {
        this.fetchSearch('route')
      }
    },
  },
```

### 4.  type을 달리해서 fetch하는 조건문 변경

fetchSearch(type = 'render') 매개변수로 searchList를 변경하고 있는데, 해당  방법이 어색하고 비효율적이라고 생각해서 type 대신 기존 this.searchList를 받아서 searchList로 변경하고 얕은 복사를 써서 기존 데이터에 추가 하도록 했다. 

```jsx
async fetchSearch() {
      this.isLoading = true
      const params = `?s=${this.$route.params.keyword}&page=${this.page}`
      const result = await fetch(`/.netlify/functions/search${params}`).then((result) =>
        result.json()
      )

      if (result.Response === 'False') {
        this.isFetched = false
        alert('해당 검색 결과가 없습니다!')
        this.$router.push('/')
      }

      this.searchList = [...this.searchList, ...result.Search]

      this.totalResults = result.totalResults
      this.isLoading = false
    }
```


