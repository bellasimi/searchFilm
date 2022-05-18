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
