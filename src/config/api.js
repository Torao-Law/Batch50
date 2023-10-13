const Request = require('request')



async function fetchdata() {
  const api = "https://jsonplaceholder.typicode.com/users"
  
  const response = await Request.get(api,(error, response, body) => {
    // let datafetch = []
    if(error) {
      return console.dir(error);
    }
    return JSON.parse(body)
  })

  return response
}

module.exports = fetchdata

