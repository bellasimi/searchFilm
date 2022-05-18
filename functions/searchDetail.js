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
