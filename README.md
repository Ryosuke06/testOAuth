# OAuth Study App

OAuth 2.0 の認可コードフローを学習するためのサンプルです。  
`frontend` (Next.js) から `backend` (Express + TypeScript) の認可/トークンAPIを呼び出します。

## 構成

- `frontend`: 認可画面 (Next.js App Router)
- `backend`: 認可コード発行・アクセストークン発行API
- `infra`: Azure Resource Group を作成する Bicep

## 前提

- Node.js 20 以上推奨
- npm

## セットアップ

```bash
cd frontend && npm install
cd ../backend && npm install
```

## 起動方法

1. バックエンド起動 (port: `3010`)

```bash
cd backend
npm run build
npm run start
```

2. フロントエンド起動 (port: `3000`)

```bash
cd frontend
npm run dev
```

3. ブラウザでアクセス

`http://localhost:3000/?client_id=1&redirect_uri=http://example.com/&scope=read%20write&state=mystate`

## API

- `POST /decision`
  - ログインと同意判定を行い、`redirect_uri` に `code` 付きでリダイレクト
- `POST /token`
  - 認可コードを検証し、アクセストークンを返却

## 動作確認用モックデータ

- ユーザー: `john / john`
  - `backend/src/mocks/UserData.json`
- クライアント情報:
  - `frontend/mocks/ClientData.json`
  - `backend/src/mocks/ClientData.json`

## 注意

- `backend/src/data/*Store.json` は実行時データです（`.gitignore` で除外済み）。
- `backend/dist` はビルド成果物です（Git管理対象外）。
- 本番利用を想定した実装ではありません（学習用）。
