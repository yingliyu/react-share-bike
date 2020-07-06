const env = process.env

const { REACT_APP_URL_TYPE, REACT_APP_TOKEN } = env
/* eslint-disable */
console.log(REACT_APP_URL_TYPE, REACT_APP_TOKEN)
function getUrl() {
  switch (REACT_APP_URL_TYPE) {
    case 'dev':
      return {
        baseUrl: 'http://rap2.taobao.org:38080/app/mock/260055'
      }
    case 'prod':
      return {
        baseUrl: 'http://rap2.taobao.org:38080/app/mock/260055'
      }
    case 'qa':
      return {
        baseUrl: 'http://rap2.taobao.org:38080/app/mock/260055'
      }
    default:
      return {
        baseUrl: 'http://rap2.taobao.org:38080/app/mock/260055'
      }
  }
}

const config = {
  baseUrl: getUrl().baseUrl,
  appToken: process.env.REACT_APP_TOKEN
}

export default config
