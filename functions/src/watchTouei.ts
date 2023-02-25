import * as dayjs from 'dayjs'
import { JSDOM } from 'jsdom'
import fetch from 'node-fetch'
import * as request from 'request'
import { TOUEI_STRAGE_PATH } from './config/stragePath'
import { HOUSE_LIST, TOEI_HOST } from './config/url'
import { now } from './logic/date'
import {
  addError,
  addHouseInfo,
  addSoldHouseDetail,
  getHouseDetaillist,
  getHouseInfo,
  removeHouseDetail,
  removeHouseInfo,
  saveHouseImage,
  upsertHouseDetail,
  upsertHouseDetailItem
} from './logic/firebase'
import { query, queryAll } from './logic/query'
import { ErrorDetail, HouseDetail, HouseDetailList } from './types/house'

// 処理１　物件一覧の取得
export const getHouseList = (): void => {
  request(HOUSE_LIST, (error: any, response: request.Response, body: any) => {
    const dom = new JSDOM(body)
    const itemList = queryAll(dom, '.c-property_item')

    itemList.forEach((item: Element): void => {
      const propertyId: string | undefined = item.getAttribute('id')?.replace('pi_', '')
      const path: string | null | undefined = item.querySelector('.hl-property_item > a')?.getAttribute('href')
      if (!propertyId) return
      getHouseInfo(propertyId).then((gotPath) => {
        if (!gotPath) {
          // すでに登録されていなければ、登録する
          if (path) {
            addHouseInfo(propertyId, path)
            console.log('added', path)
            try {
              upsertHouseInfoList([propertyId, path])
            } catch (e) {
              // 登録に失敗した場合、切り戻す
              removeHouseInfo(propertyId)
            }
          } else {
            const errorDetail: ErrorDetail = {
              path: '',
              error: 'パスが取得できませんでした。'
            }
            addError(now(), errorDetail)
          }
        }
      })
    })
  })
}

// 処理２ 物件ごとの情報を再取得し更新する
export const updateHouseDetailList = (): void => {
  getHouseDetaillist().then((infoList: HouseDetailList) => {
    // console.log('volume: ', Object.keys(infoList).length)
    const today = dayjs()
    Object.entries(infoList)
      .filter(
        ([id, house]: [id: string, h: HouseDetail]) => today.diff(dayjs(house.更新日時.replace('_', '')), 'day') !== 0
      )
      .forEach(([id, houseDetail]: [id: string, houseDetail: HouseDetail]) => {
        try {
          request(`${TOEI_HOST}${houseDetail.パス}`, (error: any, response: request.Response, body: any) => {
            const dom = new JSDOM(body)

            if (query(dom, '.hl-404') !== null) {
              //物件が売り切れの場合
              moveHoudeInfo(houseDetail, id)
            } else {
              try {
                const parentPath = houseDetail.パス.replace(/(.+)\/01_[0-9]{3}_H/, '$1')
                request(`${TOEI_HOST}${parentPath}`, async (error: any, response: request.Response, body: any) => {
                  const dom = new JSDOM(body)
                  if (query(dom, '.hl-404') !== null) {
                    //物件が売り切れの場合
                    moveHoudeInfo(houseDetail, id)
                  } else {
                    // 価格を更新する
                    const basicTable = queryAll(dom, '.c-data_item')
                    const priceList = convertSalePrice(findTableItemDd(basicTable, '販売価格'), houseDetail.パス)
                    if (priceList[0] === 0) return // 価格取得失敗
                    houseDetail.現在販売最高価格 = priceList[0]
                    houseDetail.現在販売最低価格 = priceList[1]
                    houseDetail.更新日時 = now()
                    upsertHouseDetail(id, houseDetail)
                  }
                })
              } catch (e: any) {
                writeError(houseDetail.パス, e.message)
              }
            }
          })
        } catch (e: any) {
          writeError(houseDetail.パス, e.message)
        }
      })
  })
}

// 物件詳細を追加する
const upsertHouseInfoList = ([id, path]: [id: string, path: string]): void => {
  request(`${TOEI_HOST}${path}`, (error: any, response: request.Response, body: any) => {
    const dom = new JSDOM(body)

    // 物件情報から親情報を取得
    const houseInfo: HouseDetail = extractHouseInfo(dom, id, path)

    // 個別に物件情報を取得し上書き
    const houseList = queryAll(dom, '.c-plan_item')
    houseList.forEach((houseDom: Element) => {
      try {
        // 一覧情報を個別情報で上書き
        const info = overWriteHouseInfo(houseInfo, houseDom)
        // DB書き込み
        const id = `${info.土地ID}-${info.物件ID}`
        const pid = info.土地ID
        // 物件詳細をDBに書き込み
        saveImage(id, pid, info.全体区画図, info.間取り図).then(() => {
          info.全体区画図 = info.全体区画図 ? `${TOUEI_STRAGE_PATH}/全体区画図-${pid}.jpg` : ''
          info.間取り図 = info.間取り図 ? `${TOUEI_STRAGE_PATH}/間取り図-${id}.jpg` : ''
          upsertHouseDetail(id, info).then(() => getTag(info.パス, id))
        })
      } catch (e: any) {
        writeError(path, e.message)
      }
    })
  })
}

const extractHouseInfo = (dom: JSDOM, id: string, path: string): HouseDetail => {
  try {
    const basicTable = queryAll(dom, '.c-data_item')
    // 物件概要２
    const builldingInfoTable = queryAll(dom, '.p-summary_table')[1].querySelectorAll('tr')
    // 物件概要３
    const builldingDetailTable = queryAll(dom, '.p-summary_table')[2].querySelectorAll('tr')

    // 緯度経度を取得
    const coodinate = queryAll(dom, '.way.btn-how')[0].getAttribute('data-saddr')?.split(', ')

    const priceList = convertSalePrice(findTableItemDd(basicTable, '販売価格'), path)

    const blockDiagram = query(dom, "a[title='全体区画図']")?.getAttribute('href')

    const houseInfo: HouseDetail = {
      作成日時: now(),
      更新日時: now(),
      土地ID: id,
      パス: path,

      初期販売最高価格: priceList[0],
      初期販売最低価格: priceList[1],
      現在販売最高価格: priceList[0],
      現在販売最低価格: priceList[1],
      所在地: findTableItemDd(basicTable, '所在地'),
      アクセス: findTableItemDd(basicTable, 'アクセス'),
      カースペース: findTableItemDd(basicTable, 'カースペース'),
      完成予定日: findTableItemDd(basicTable, ['完成予定日', '完成予定時期']),
      入居予定日: findTableItemDd(basicTable, ['入居予定日', '引渡可能時期']),

      間取り図: '',
      全体区画図: blockDiagram ? blockDiagram : '',

      都市計画: findTableItemTd(builldingInfoTable, '都市計画'),
      用途地域: findTableItemTd(builldingInfoTable, '用途地域', 1),
      建ぺい率: findTableItemTd(builldingInfoTable, '建ぺい率'),
      容積率: findTableItemTd(builldingInfoTable, '容積率', 1),
      接道: findTableItemTd(builldingInfoTable, '接道'),

      構造: findTableItemTd(builldingDetailTable, '構造', 1),
      設備: findTableItemTd(builldingDetailTable, '設備'),

      緯度: coodinate ? coodinate[0] : '',
      経度: coodinate ? coodinate[1] : ''
    }

    return houseInfo
  } catch (e: any) {
    writeError(path, e.message)
    throw Error
  }
}

// テーブルの要素一覧から指定した<td>とペアの<dd>のvalueを返す
// ついでにいらないものを消す
const findTableItemDd = (tableItems: NodeListOf<Element>, targetText: string | string[]): string => {
  let targetItem: string | undefined = undefined
  tableItems.forEach((item: Element) => {
    const headerName = item.querySelector('dt')?.innerHTML
    const arrayJudge = typeof targetText === 'object' && targetText.some((v) => v === headerName)
    if (headerName === targetText || arrayJudge) {
      targetItem = item
        .querySelector('dd')
        ?.innerHTML.replace('<a href="#aroundMap" class="btn-detail_data">周辺マップを見る</a>', '')
        .replaceAll('  ', '')
        .replaceAll('<br>', '')
        .replaceAll('\n', '')
      return
    }
  })
  return targetItem ? targetItem : ''
}

// テーブルの要素一覧から指定した<th>とペアの<td>のvalueを返す
// ついでにいらないものを消す
const findTableItemTd = (
  tableItems: NodeListOf<Element>,
  targetText: string,
  targetNum: number = 0 // 要素の列番号
): string => {
  let targetItem: string | undefined = undefined
  tableItems.forEach((item: Element) => {
    if (item.querySelectorAll(`th`)[targetNum]?.innerHTML === targetText) {
      targetItem = item.querySelectorAll(`td`)[targetNum]?.innerHTML.replaceAll(' ', '').replaceAll('\n', '')
      return
    }
  })
  return targetItem ? targetItem : ''
}

const overWriteHouseInfo = (houseInfo: HouseDetail, houseDom: Element): HouseDetail => {
  let houseInfoCopy = Object.assign({}, houseInfo)
  const infoTable = houseDom.querySelectorAll('dl')
  const floorPlan = houseDom.querySelector('h3')?.innerHTML
  const floorPlanDiagram = houseDom.querySelector('.c-image_item')?.getAttribute('href')
  const planId = houseDom.getAttribute('id')
  const path = houseDom.querySelector('.btn-plan')?.getAttribute('href')

  houseInfoCopy.土地面積 = Number(findTableItemDd(infoTable, '土地面積')?.replace('㎡', ''))
  houseInfoCopy.建物面積 = Number(findTableItemDd(infoTable, '建物面積')?.replace('㎡', ''))
  houseInfoCopy.カースペース = findTableItemDd(infoTable, 'カースペース')
  houseInfoCopy.間取り = floorPlan ? floorPlan : ''
  houseInfoCopy.間取り図 = floorPlanDiagram ? floorPlanDiagram : ''
  houseInfoCopy.物件ID = planId ? planId : ''
  houseInfoCopy.パス = path ? path : houseInfo.パス
  return houseInfoCopy
}

// 価格を抜き出す
const convertSalePrice = (text: string, path: string): number[] => {
  const cleanText = text.replaceAll(',', '')
  let convertedPrice = ''
  if (cleanText.match(/.*\d{4}.*\d{4}.*/)) {
    convertedPrice = cleanText.replace(/.*(\d{4}).*(\d{4}).*/, '$1,$2')
  } else if (cleanText.match(/.*\d{4}.*/)) {
    convertedPrice = cleanText.replace(/.*(\d{4}).*/, '$1,$1')
  } else {
    convertedPrice = '0,0'
    writeError(path, '価格取得失敗')
  }

  return convertedPrice.split(',').map((s: string) => Number(s))
}

const writeError = (path: string, message: string): void => {
  const errorDetail: ErrorDetail = {
    path: path,
    error: message
  }
  addError(now(), errorDetail)
}

// 画像を保存する
const saveImage = (id: string, pid: string, 全体区画図パス: string, 間取り図パス: string) => {
  return Promise.all([
    全体区画図パス &&
      fetch(`${TOEI_HOST}${全体区画図パス}`).then((response: any) => {
        response.arrayBuffer().then((buffer: ArrayBuffer) => {
          saveHouseImage(buffer, `全体区画図-${pid}`)
        })
      }),

    間取り図パス &&
      fetch(`${TOEI_HOST}${間取り図パス}`).then((response) => {
        response.arrayBuffer().then((buffer) => {
          saveHouseImage(buffer, `間取り図-${id}`)
        })
      })
  ])
}

const moveHoudeInfo = (houseDetail: HouseDetail, id: string): void => {
  //物件が売り切れの場合
  houseDetail.更新日時 = now()
  addSoldHouseDetail(id, houseDetail).then(() => {
    removeHouseDetail(id).then(() => {})
  })
}

export const getTag = (path: string, id: string) => {
  request(`${TOEI_HOST}${path}`, (error: any, response: request.Response, body: any) => {
    const dom = new JSDOM(body)
    const featureList: string[] = []
    queryAll(dom, '.c-features_item').forEach((e: HTMLElement) => {
      e.textContent && featureList.push(e.textContent)
    })
    upsertHouseDetailItem(id, 'タグ', featureList)
  })
}
