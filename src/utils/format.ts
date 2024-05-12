import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function turnToBeijing(date: string, format: string = 'YYYY-MM-DD HH:mm:ss') {
  //上面这个format指的是默认值，这个思想很重要
  const goodDate = dayjs.utc(date).utcOffset(8).format(format)
  return goodDate
}
