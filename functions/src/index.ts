import * as functions from 'firebase-functions'
import { initializeApp } from 'firebase/app'
import { mm, pp } from './config/dbUser'
import { firebaseConfig } from './config/firebase'
import { now } from './logic/date'
import { login, writeLog } from './logic/firebase'
import { getHouseList, updateHouseDetailList } from './watchTouei'
import fetch from 'node-fetch'

initializeApp(firebaseConfig)

// 東栄住宅
export const scheduledFunctionGetHouseList = functions.pubsub.schedule('every day 13:00').onRun(async (context) => {
  fetch('https://us-central1-watch-touei.cloudfunctions.net/getHouseLists')
  return null
})

export const scheduledFunctionGetHouseListSingle = functions.pubsub
  .schedule('every day 12:00')
  .onRun(async (context) => {
    fetch('https://us-central1-watch-touei.cloudfunctions.net/getHouseListsSingle')
    return null
  })

export const getHouseLists = functions
  .runWith({
    timeoutSeconds: 300,
    memory: '4GB'
  })
  .https.onRequest((req: functions.https.Request, resp: functions.Response<any>) => {
    login(mm, pp).then(() => {
      getHouseList()
      updateHouseDetailList()
      writeLog(now(), '東栄住宅')
    })
    setTimeout(() => resp.send({ end: true }), 90000)
  })

export const getHouseListsSingle = functions
  .runWith({
    timeoutSeconds: 300,
    memory: '4GB'
  })
  .https.onRequest((req: functions.https.Request, resp: functions.Response<any>) => {
    login(mm, pp).then(() => {
      updateHouseDetailList()
      writeLog(now(), '東栄住宅Simgle')
    })
    setTimeout(() => resp.send({ end: true }), 90000)
  })
