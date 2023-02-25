import { dateFormat } from '../config/format'
import * as dayjs from 'dayjs'

export const now = () => dayjs().add(9, 'h').format(dateFormat)
