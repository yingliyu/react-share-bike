const env = process.env

const { REACT_APP_URL_TYPE, REACT_APP_TOKEN } = env
/* eslint-disable */
console.log(REACT_APP_URL_TYPE, REACT_APP_TOKEN)
function baseUrl () {
  switch (REACT_APP_URL_TYPE) {
    case 'dev':
      return 'dev'
    case 'prod':
      return 'prod'
    case 'qa':
      return 'qa'
    default:
      return 'prod'
  }
}

const config = {
  baseUrl: baseUrl(),
  appToken: process.env.REACT_APP_TOKEN,
}

export default config
