import {
  browserLocalPersistence,
  getAuth,
  NextOrObserver,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  Unsubscribe,
  User,
  UserCredential,
} from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";
import { getDownloadURL, getStorage, ref as sorageRef } from "firebase/storage";

import {
  HOUSE_DETAIL_LIST_PATH,
  SOLD_HOUSE_DETAIL_LIST_PATH,
} from "../config/dbPath";
import { HouseDetailList } from "../types/house";

// 共通
// ログイン
export function login(id: string, pass: string): Promise<UserCredential> {
  const auth = getAuth();
  return setPersistence(auth, browserLocalPersistence).then(() =>
    signInWithEmailAndPassword(auth, id, pass)
  );
}
// ログアウト
export function logOut(): Promise<void> {
  const auth = getAuth();
  return signOut(auth);
}

// ログインユーザー取得
export function getUser(nextOrObserver: NextOrObserver<User>): Unsubscribe {
  const auth = getAuth();
  return onAuthStateChanged(auth, nextOrObserver);
}

// 売れた物件一覧
export function getSoldHouses(): Promise<HouseDetailList> {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, SOLD_HOUSE_DETAIL_LIST_PATH)).then((snapshot) =>
    snapshot.val()
  );
}

// 販売中物件一覧
export function getHouses(): Promise<HouseDetailList> {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, HOUSE_DETAIL_LIST_PATH)).then((snapshot) =>
    snapshot.val()
  );
}

// 画像を取得しURLを発行する
export function getImage(path: string): Promise<string> {
  const storage = getStorage();
  const storageRef = sorageRef(storage, path);
  return getDownloadURL(storageRef);
}
