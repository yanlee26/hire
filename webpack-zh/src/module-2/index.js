import { shuffle, keys } from 'lodash'
import { sample } from '../common'

export function logData(data) {
  console.log('module-1')
  return sample(shuffle(keys(data)))
}
