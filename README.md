# Watch-men

- **`個人用`**
- データ収集用クローラーと閲覧用 Web アプリのセット
- 基盤は Firebase を想定

## functions

- setup:

```
$ cd functions
$ npm install

# 下記ファイルにKEYを記載して作成
# - functions/src/config/firebase.ts
```

- deploy

```
$ npm run deploy
```

## web app

- setup:

```
$ cd web
$ npm install

# 下記ファイルにKEYを記載して作成
# - web/src/config/key.ts
# - web/src/config/firebase.ts
```

- debug

```
$ npm start
```

- deploy

```
$ npm run deploy
```
