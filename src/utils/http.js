import JsonP from 'jsonp'
export default class Axios {
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JsonP(
        options.url,
        {
          param: 'callback'
        },
        function (err, res) {
          if (err) {
            console.log(err)
          }
          // to do...
          console.log(res)
          // if (res.status === 'success') {
          //   resolve(res)
          // } else {
          //   reject(res.message)
          // }
        }
      )
    })
  }
}
