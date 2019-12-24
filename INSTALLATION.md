# INSTALLATION

Node.js v12.7.0が必要です。

```bash
git clone git@github.com:a11yj/accrefs.git
cd accrefs
npm ci
npm start
```

ターミナルに`http://localhost:8080`が表示されるので、ブラウザで開いてください。

## ページの種類

このウェブサイトには次の種類のページが存在します：

- ホーム（`/`）
- タグ詳細（`/tags/:slug/`）
- 参考資料一覧（`/references/`）

参考資料詳細は存在しません。

## ビルドツール

[11ty](https://www.11ty.io)を利用しています。

### HTMLを編集する

HTMLはPugを利用しています：

| ファイル | ページ |
|:---|:---|
| `src/_includes/base.pug` | 共通テンプレート |
| `src/index.pug` | ホーム |
| `src/tag.pug` | タグ詳細 |
| `src/references.pug` | 参考資料一覧 |
| `src/feed.xml.pug` | RSS |


### CSSを編集する

メタCSS言語は利用していません。`src/assets/main.css`を編集してください。

### ウェブサイトで取り扱うコンテンツ

#### 参考資料（reference）

ウェブサイトで紹介したいページへのリンクおよび関連情報です。

参考資料のデータはFrontmatterを利用したマークダウンで管理しています。`src/references/*.md`の内容を編集するとサイトに反映されます。

データを追加するためには、次のフォーマットに従ったファイルを連番に沿ったファイル名で追加してください。

```markdown
---
title: 'アクセシビリティとは' # リンク先の名前
tags:
  - 'Webアクセシビリティとは？的なもの' # 対応するタグの日本語表記
link: 'https://waic.jp/knowledge/accessibility/' # リンク先URL
---

ウェブアクセシビリティ基盤委員会（通称：WAIC）の放つ、公式感漂うSEO的に強そうなドキュメント。Webアクセシビリティ確保とJISの関係性について解説しています。
```

YAMLブロックには上から「タイトル」「タグ」「リンク先URL」を記述し、YAMLブロックに続く本文はそのリンク先についての説明文になります。

本文中ではマークダウン記法・HTML記法を利用できます。段落・箇条書き・リンク・テーブル・画像などが挿入できます。

#### タグ（tag）を編集する

参考資料を種類別にまとめるためのタグです。ひとつの参考資料に複数のタグを付与できます。

タグのデータはJSONで管理しています。`src/_data/tags.json`の内容を編集するとサイトに反映されます。

データを編集するためには、次のフィールドに従って記述してください。

```json
[
  {
    "title": "何から手を着けていいのか分からないときは",
    "slug": "getting_started",
    "content": "『デザイニングWebアクセシビリティ』が手元にないという方は、今すぐ用意しましょう（？）"
  },
  {
    "title": "Webアクセシビリティとは？的なもの",
    "slug": "introduction_to_web_accessibility",
    "content": "Webにおけるアクセシビリティを知りましょう。"
  },
  {
    "title": "企業がWebアクセシビリティに取り組む価値",
    "slug": "company_effort",
    "content": ""
  },
  ...
]
```

ウェブサイトには配列の要素が並んでいる順番で表示されます。