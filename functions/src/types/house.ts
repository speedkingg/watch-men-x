export interface HouseUrlList {
  [propertyId: string]: string
}

export interface HouseDetailList {
  [id: string]: HouseDetail
}

export interface HouseDetail {
  作成日時: string
  更新日時: string
  パス: string

  初期販売最高価格: number
  初期販売最低価格: number
  現在販売最高価格: number
  現在販売最低価格: number

  所在地: string
  アクセス: string
  土地面積?: number
  建物面積?: number
  間取り?: string
  カースペース: string
  完成予定日: string
  入居予定日: string

  全体区画図: string
  間取り図: string

  都市計画: string
  用途地域: string
  建ぺい率: string
  容積率: string
  接道: string

  構造: string
  設備: string

  緯度: string
  経度: string

  土地ID: string
  物件ID?: string

  タグ?: string[]
}

export interface ErrorDetail {
  path: string
  error: string
  other?: string
  date?: string
}
