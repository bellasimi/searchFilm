const axios = require('axios')
const { API_END_POINT, API_KEY } = process.env

exports.handler = async function (event) {
  const { params } = JSON.parse(event.body)

  const { data } = await axios.get(`${API_END_POINT}?apikey=${API_KEY}${params}`)

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}
