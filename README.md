# ノートビューア

Googleドライブに置いたObsidianの保管庫を、iPhoneやPCのブラウザで読むための**読み取り専用**のWebアプリ（PWA）。

- ノートの一覧と検索（ファイル名・本文）、Markdownの表示（表・チェックリスト・タグ・コード）
- `[[リンク]]` での移動、参照元の一覧、ライト／ダーク表示
- 読んだノートは端末に保存し、電波がなくても読める（IndexedDB と Service Worker）
- ノートの書き換え・削除はしない。Googleドライブの権限は `drive.readonly` のみ

## 使い方

1. iPhoneのSafariでこのページを開き、共有ボタン →「ホーム画面に追加」
2. 「設定」で OAuth クライアントID と保管庫のフォルダ名を入れ、「Googleにログインして読み込む」
3. 最新にしたいときは「更新」

PCでは「この端末のフォルダを選ぶ」で、ローカルの保管庫も読める。

## Google側の準備（OAuth クライアントID）

Google Cloud Console で次を行う（無料）。

1. プロジェクトを作成し、**Google Drive API** を有効にする
2. OAuth 同意画面：種類「外部」、公開ステータス「テスト」、テストユーザーに自分のGmailを追加
3. 認証情報 → OAuth クライアントID →「ウェブ アプリケーション」
   - 承認済みの JavaScript 生成元：このページのオリジン（例 `https://<ユーザー名>.github.io`）と、PCで試すなら `http://localhost:8765`
4. 発行されたクライアントID（`…apps.googleusercontent.com`）をアプリの「設定」に入れる

クライアントIDは端末のブラウザにだけ保存され、このリポジトリには含まれない。

## 構成

| ファイル | 内容 |
|---|---|
| `index.html` | 画面と動作のすべて（marked・DOMPurify・Googleのログイン部品を読み込む） |
| `sw.js` | 電波がなくてもアプリの画面を開けるようにする |
| `manifest.webmanifest`・`icon*` | ホーム画面に追加したときの名前とアイコン |
