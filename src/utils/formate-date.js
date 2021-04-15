// 格式化时间YYYY-MM-DD hh:mm:ss
export default {
  formatDate(date) {
    if(!date) return ''
    let time = new Date(date)
    return `${time.getFullYear()}-${this.checkDate(time.getMonth()+1)}-${this.checkDate(time.getDate())} ${this.checkDate(time.getHours())}:${this.checkDate(time.getMinutes())}:${this.checkDate(time.getSeconds())}`
  },
  checkDate (d){
    return d>9? d: `0${d}`
  }
} 