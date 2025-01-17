import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import LocalizedFormat from 'dayjs/plugin/LocalizedFormat';

dayjs.locale('pt-br')
dayjs.extend(LocalizedFormat)

export default function FormatDate(date: Date) { 
     return  dayjs(date).format('LL')
}