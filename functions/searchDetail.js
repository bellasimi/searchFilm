const axios = require('axios')
const { API_END_POINT, API_KEY } = process.env

exports.handler = async function (event) {
  const { id } = event.queryStringParameters
  try {
    const { data } = await axios.get(`${API_END_POINT}?apikey=${API_KEY}&id=${id}`)
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
