# ๐ ์ํ ๊ฒ์ ์ฌ์ดํธ

[๋ฐฐํฌ ๋งํฌ](https://searchfilm-ee77a4.netlify.app/)

์์ด๋ก ์ ๋ชฉ์ ์๋ ฅํ๋ฉด ๊ด๋ จ ์ํ๋ค์ ์ ๋ณด๋ฅผ ๋ณผ ์ ์๋ ์ฌ์ดํธ์๋๋ค. 

<br/>

https://user-images.githubusercontent.com/79133602/179399734-c46d96c2-2c5c-4569-9812-c6363363f14f.mp4


<br/>

# ๐ค ์ฌ์ดํธ ์ ์ ๋ฐฐ๊ฒฝ

Vue๋ฅผ ๊ณต๋ถํ๊ณ  ํ์ตํ ๋ด์ฉ์ ํ์ธํ๊ธฐ ์ํด ๋ง๋ค์์ต๋๋ค. 


<br/>

# ๐ฉโ๐ป ์ฃผ์ ๊ตฌํ ์ฌํญ 


### 1. ๊ฒ์์ด ์๋ ฅ์ ์ ํจ์ฑ๊ฒ์ฌ

๊ฒ์์ด ์๋ ฅ์ ์๋์ฒ๋ผ regex, ์กฐ๊ฑด๋ฌผ์ ํตํด ์ ํจ์ฑ ๊ฒ์ฌ๋ฅผ ํฉ๋๋ค.

```js
validateKeyword() {
  const regex = /[ใฑ-ใ|ใ-ใฃ|๊ฐ-ํฃ]/
  const isInvalid =
    regex.test(this.keyword) || this.keyword.length < 2 || this.keyword.length > 15
  if (isInvalid) {
    alert('๊ฒ์์ด๋ ํ๊ธ์ ์ ์ธํ๊ณ  2~15์๋ก ์๋ ฅํด์ฃผ์ธ์')
  } else {
    this.$router.push(`/search/${this.keyword}`)
  }

```

์ ํจ์ฑ ๊ฒ์ฌ๋ฅผ ํต๊ณผํ๋ฉด ํด๋น keyword๋ก api๋ฅผ ํธ์ถํด์ ์ํ๋ชฉ๋ก์ ๊ฐ์ ธ์ต๋๋ค.

```js
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

์ด๋ api์ ์ ๊ทผํ๋ ๊ฑด `/.netlify/functions/search` ๊ฒฝ๋ก์ ๋ง๋  ๊ฐ์ ํจ์์๋๋ค.

```js
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

๋ง์ฝ ๋ค์ ํ์ด์ง๋ฅผ ๊ฐ์ ธ์ค๊ณ  ์ถ๋ค๋ฉด ๋๋ณด๊ธฐ ๋ฒํผ์ ๋๋ฅด๊ณ , ํด๋น ๋ฒํผ ํด๋ฆญ์ loadMore() ํจ์๋ฅผ ํธ์ถํด์ ์๋ก ๋ฆฌ์คํธ๋ฅผ ์ถ๊ฐํฉ๋๋ค.

```js
loadMore() {
  this.page += 1
  this.fetchSearch()
},

```

### 2. ์ํ ์์ธ ์ ๋ณด ๋ณด๊ธฐ ( path query ์ฌ์ฉ )

๊ฒ์๋ ๋ฆฌ์คํธ๋ฅผ ๋๋ฅด๋ฉด ํตํด ์ํ์ ์์ธ์ ๋ณด๋ฅผ ๋ณผ ์ ์๋๋ก fetchDetail ํจ์๋ฅผ ํธ์ถํ๊ณ ,

```js
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

ํด๋น ํจ์๋ ์๋ฒ๋ฆฌ์ค๋ก ์ฟผ๋ฆฌ๋ฌธ์ ๋ณด๋ด ํด๋น ์ฟผ๋ฆฌ๋ฌธ ๋ด์ฉ์ผ๋ก ๋ค์ get ์์ฒญ์ ๋ฐ์ fetchDetail๋ก ๋ฐํํฉ๋๋ค.

```js
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

### 3. ํ๊ฒฝ๋ณ์ ์๋

API Key(`7035c60c`)๋ฅผ ํ๊ฒฝ๋ณ์๋ก ๋ง๋ค์ด์ ์๋ํ์ต๋๋ค.

๊ฐ๋ฐ์์ dotenv-webpack ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ค์น ํ .env ํ์ผ์ ํด๋น ๋ด์ฉ์ ์๋ ฅ ํ

```js
API_KEY="7035c60c"
API_END_POINT="<https://www.omdbapi.com>"
NETLIFY_API = "/.netlify/functions/workspace"

```

์ฌ์ฉํ  ํ์ผ์์ `const { API_END_POINT, API_KEY } = process.env` ์ด๋ฐ ์์ผ๋ก ๊ฐ์ ธ์์ต๋๋ค.

๋ฐฐํฌ์์ .envํ์ผ์ ์ฌ๋ฆฌ์ง ์๊ณ , netlify์์ ์ ๊ณตํ๋ ํ๊ฒฝ๋ณ์์ ํด๋น ๊ฐ์ ์๋ ฅํ์ต๋๋ค.

### 4. ๋ก๋ฉ ์ฒ๋ฆฌ

API ์์ฒญ์ ํ๋ ๋์ isLoading์ true๋ก ๋ง๋ค์ด loading.gif๊ฐ ํ๋ฉด์ ๋์ค๋๋ก ํ์ต๋๋ค.

```js
<Loading v-show="isLoading" />
```


<br/>

# ๐ฉโ๐ป refactor & fix



### 1.  ์ต์ ํ

fetch๋ฅผ ์ฌ๋ฌ๋ฒ ํ๊ธฐ ๋๋ฌธ์ v-if๋ณด๋ค v-show๊ฐ ๋ ํจ์จ์ ์ด๋ผ๊ณ  ์๊ฐํด์ ํด๋น ๋๋ ํฐ๋ฆฌ๋ฅผ ์ฌ์ฉํ์ต๋๋ค.

```js
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

### 2. ์๋ฌธ์ ๊ณผ ํด๊ฒฐ

๊ฒ์์ ํ๋ฉด ๋ผ์ฐํ์ ํตํด์ ๊ฒ์์ด๋ฅผ ์ ๋ฌํ๊ณ  created() ์ฌ์ดํด์์ fetch๋ฅผ ํ๋๋ก ํ์ต๋๋ค.

```js
this.$router.push(`/search/${this.keyword}`)
```

๊ทธ๋ฐ๋ฐ ์ด๋ ๊ฒ ํ๋ฉด SearchPage์ฒ๋ผ(์๋) ํด๋น ํ์ด์ง์์ ๋ผ์ฐํ์ ํ๊ธฐ์ created() ๋ผ์ดํ ์ฌ์ดํด์ ์ฌ์ฉํ์ง ์๋ ์์ธ๊ฐ ์๊น๋๋ค.

![https://user-images.githubusercontent.com/79133602/169147694-575cf45d-afa7-4666-a786-2d87f8f31d7c.png](https://user-images.githubusercontent.com/79133602/169147694-575cf45d-afa7-4666-a786-2d87f8f31d7c.png)

### ํด๊ฒฐ๋ฐฉ์

ํด๋น ๋ผ์ฐํ์ path๋ฅผ to, from์ ์ฌ์ฉํด์ ๋น๊ตํ ๋ค

```js
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.fetchSearch('route')
      }
    },
  },
```

๋ค๋ฅด๋ฉด type์ ๋ฌ๋ฆฌํด์ fetch๋ฅผ ํ๋๋ก ๋ง๋ค์์ต๋๋ค.

```js
if (type === 'render') {
    this.searchList = [...this.searchList, ...result.Search]
  } else {
    this.searchList = result.Search
  }

```

### 3. ๋ ๋ค๋ฅธ ๋ฌธ์ 

 ์์ธ ํ์ด์ง๋ก ์ด๋ํ  ๋๋ watch๊ฐ ์คํ๋๊ธฐ ๋๋ฌธ์ ๋ถํ์ํ API ์์ฒญ์ด ์๊ธฐ๊ณ  ์์์ต๋๋ค!  ๊ทธ๋์ ๋ค์๊ณผ ๊ฐ์ด search path๋ก ์ด๋ํ  ๋๋ง fetchSearch๋ฅผ ํธ์ถํ๋๋กํ์ต๋๋ค.

```js
watch: {
    $route(to, from) {
      if (to.path.includes('search')) {
        this.fetchSearch('route')
      }
    },
  },
```

### 4.  type์ ๋ฌ๋ฆฌํด์ fetchํ๋ ์กฐ๊ฑด๋ฌธ ๋ณ๊ฒฝ

fetchSearch(type = 'render') ๋งค๊ฐ๋ณ์๋ก searchList๋ฅผ ๋ณ๊ฒฝํ๊ณ  ์๋๋ฐ, ํด๋น  ๋ฐฉ๋ฒ์ด ์ด์ํ๊ณ  ๋นํจ์จ์ ์ด๋ผ๊ณ  ์๊ฐํด์ type ๋์  ๊ธฐ์กด this.searchList๋ฅผ ๋ฐ์์ searchList๋ก ๋ณ๊ฒฝํ๊ณ  ์์ ๋ณต์ฌ๋ฅผ ์จ์ ๊ธฐ์กด ๋ฐ์ดํฐ์ ์ถ๊ฐ ํ๋๋ก ํ์ต๋๋ค.

```js
async fetchSearch() {
      this.isLoading = true
      const params = `?s=${this.$route.params.keyword}&page=${this.page}`
      const result = await fetch(`/.netlify/functions/search${params}`).then((result) =>
        result.json()
      )

      if (result.Response === 'False') {
        this.isFetched = false
        alert('ํด๋น ๊ฒ์ ๊ฒฐ๊ณผ๊ฐ ์์ต๋๋ค!')
        this.$router.push('/')
      }

      this.searchList = [...this.searchList, ...result.Search]

      this.totalResults = result.totalResults
      this.isLoading = false
    }
```


