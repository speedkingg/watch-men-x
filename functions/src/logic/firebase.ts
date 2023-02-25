import { getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth'
import { child, get, getDatabase, ref, remove, set } from 'firebase/database'
import { getStorage, listAll, ref as sorageRef, uploadBytes, UploadResult } from 'firebase/storage'
import {
  DB_WRITE_ERROE_PATH,
  HOUSE_DETAIL_LIST_PATH,
  HOUSE_LIST_PATH,
  LOG_PATH,
  SOLD_HOUSE_DETAIL_LIST_PATH
} from '../config/dbPath'
import { TOUEI_STRAGE_PATH } from '../config/stragePath'
import { ErrorDetail, HouseDetail, HouseDetailList, HouseUrlList } from '../types/house'

// 東栄住宅
export function addHouseInfo(id: string, path: string = ''): Promise<void> {
  const db = getDatabase()
  return set(ref(db, `${HOUSE_LIST_PATH}/${id}`), path)
}

export function upsertHouseDetail(id: string, houseDetail: HouseDetail): Promise<void> {
  const db = getDatabase()
  return set(ref(db, `${HOUSE_DETAIL_LIST_PATH}/${id}`), houseDetail)
}

export function upsertHouseDetailItem(id: string, key: string, value: any): Promise<void> {
  const db = getDatabase()
  return set(ref(db, `${HOUSE_DETAIL_LIST_PATH}/${id}/${key}`), value)
}

export function upsertHousePath(id: string, propatie: string, path: string): Promise<void> {
  const db = getDatabase()
  return set(ref(db, `${SOLD_HOUSE_DETAIL_LIST_PATH}/${id}/${propatie}`), path)
}

export function addSoldHouseDetail(id: string, houseDetail: HouseDetail): Promise<void> {
  const db = getDatabase()
  return set(ref(db, `${SOLD_HOUSE_DETAIL_LIST_PATH}/${id}`), houseDetail)
}

export function addError(id: string, error: ErrorDetail): Promise<void> {
  const db = getDatabase()
  return set(ref(db, `${DB_WRITE_ERROE_PATH}/${id}`), error)
}

export function getHouseInfolist(): Promise<HouseUrlList> {
  const dbRef = ref(getDatabase())
  return get(child(dbRef, HOUSE_LIST_PATH)).then((snapshot) => snapshot.val())
}

export function getHouseInfo(id: string): Promise<string | null> {
  const dbRef = ref(getDatabase())
  return get(child(dbRef, `${HOUSE_LIST_PATH}/${id}`)).then((snapshot) => snapshot.val())
}

export function getHouseDetaillist(): Promise<HouseDetailList> {
  const dbRef = ref(getDatabase())
  return get(child(dbRef, HOUSE_DETAIL_LIST_PATH)).then((snapshot) => snapshot.val())
}

export function getSoldHouselist(): Promise<HouseDetailList> {
  const dbRef = ref(getDatabase())
  return get(child(dbRef, SOLD_HOUSE_DETAIL_LIST_PATH)).then((snapshot) => snapshot.val())
}

export function removeHouseInfo(id: string): Promise<void> {
  const db = getDatabase()
  return remove(ref(db, `${HOUSE_LIST_PATH}/${id}`))
}

export function removeHouseDetail(id: string): Promise<void> {
  const db = getDatabase()
  return remove(ref(db, `${HOUSE_DETAIL_LIST_PATH}/${id}`))
}

// strage
export function saveHouseImage(buffer: ArrayBuffer, imageName: string): Promise<string> {
  const storage = getStorage()
  const storageRef = sorageRef(storage, `${TOUEI_STRAGE_PATH}/${imageName}.jpg`)
  return uploadBytes(storageRef, buffer).then((snapshot: UploadResult) => snapshot.metadata.fullPath)
}
export function getImageList(): Promise<string[]> {
  const storage = getStorage()
  const storageRef = sorageRef(storage, `${TOUEI_STRAGE_PATH}`)
  return listAll(storageRef).then((res) => res.items.map((i) => i.fullPath))
}

// 共通
// ログイン
export function login(id: string, pass: string): Promise<UserCredential> {
  const auth = getAuth()
  return signInWithEmailAndPassword(auth, id, pass)
}

// ログ
export function writeLog(date: string, event: string): Promise<void> {
  const db = getDatabase()
  return set(ref(db, `${LOG_PATH}/${date}`), event)
}
