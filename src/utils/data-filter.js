import moment from 'moment'
import 'moment-with-locales-es6'
moment.locale('ru')
export default data => {
  return moment(data).format('DD MMM YYYY')
}