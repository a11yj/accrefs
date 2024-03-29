# DEVELOPMENT

Node.js v18.15.0 が必要です。

```bash
git clone git@github.com:a11yj/accrefs.git
cd accrefs
npm ci
npm start
```

ターミナルに`http://[::]:3000/`が表示されるので、ブラウザで開いてください。

## ページの種類

このウェブサイトには次の種類のページが存在します：

- ホーム（`/`）
- タグ別一覧（`/tags/:slug/`）
- 年別一覧（`/years/:year/`）
- 参考資料一覧（`/references/`）

参考資料詳細は存在しません。

## ビルドツール

SSG ライブラリは使用せず、Node.js でファイルを生成しています。

`task/` 配下のファイルは以下の通りです。

| タスクファイル | 役割                                                                                                                         |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| assets.mjs     | `src/assets/` 配下のファイルを `dist/assets/` にコピーします。                                                               |
| matters.mjs    | gray-matter を利用して `src/references/` 配下の md ファイルをパースして返します。                                            |
| database.mjs   | matters.mjs の戻り値を受け取って参考資料のメタ情報を整形し、site.config.mjs を混ぜて実質的な DB を返します。                 |
| html.mjs       | database.mjs の戻り値を受け取って HTML を生成します。                                                                        |
| build.mjs      | assets, matters, database, html をシリアルに実行するインデックスファイルです。                                               |
| draft.mjs      | 参考資料の雛形になる md ファイルを生成します。ファイル名は自動採番です。                                                     |
| lint.mjs       | 参考資料やタグのフォーマットが正しいかチェックします。                                                                       |
| csv2md.mjs     | 規定カラムの csv ファイルから md ファイルを自動生成します。大規模作業時に利用する想定で build.mjs には組み込まれていません。 |
| md2csv.mjs     | `references/**.md` から規定カラムの csv ファイル自動生成します。デバッグ用です。                                             |

1. md ファイルをパースする（matters.mjs）
2. 整形しつつ必要データと混ぜる（database.mjs）
3. pug でグローバル変数として必要データを渡してコンパイルする（html.mjs）

ページに必要なデータを追加する場合は 2 のステップで、ページを増やす場合は 3 のステップでそれぞれ処理を追加してください。

### HTML を編集する

HTML は Pug を利用しています：

| ファイル                       | ページ                    |
| :----------------------------- | :------------------------ |
| `src/templates/_base.pug`      | 共通テンプレート          |
| `src/templates/_script.pug`    | head 要素内の script 要素 |
| `src/templates/home.pug`       | ホーム                    |
| `src/templates/tag.pug`        | タグ別ページ              |
| `src/templates/year.pug`       | 年別ページ                |
| `src/templates/references.pug` | すべての参考資料          |
| `src/templates/feed.pug`       | RSS                       |

### CSS を編集する

メタ CSS 言語は利用していません。`src/assets/main.css`を編集してください。

### ウェブサイトで取り扱うコンテンツ

#### 参考資料（reference）

ウェブサイトで紹介したいページへのリンクおよび関連情報です。

参考資料のデータは Frontmatter を利用したマークダウンで管理しています。`src/references/*.md`の内容を編集するとサイトに反映されます。

データを追加するためには、次のフォーマットに従ったファイルを連番に沿ったファイル名で追加してください。

```markdown
---
title: "リンク先の名前"
tags:
  - "タグ名1"
  - "タグ名2"
link: "https://sankousiryou.com/permalink"
year: 2023
---

リンク先の参考資料についての説明文。
```

YAML ブロックには上から「タイトル」「タグ」「リンク先 URL」「年情報」を記述し、YAML ブロックに続く本文はそのリンク先についての説明文になります。

本文中ではマークダウン記法・HTML 記法を利用できます。段落・箇条書き・リンク・テーブル・画像などが挿入できます。

#### タグ（tag）を編集する

参考資料を種類別にまとめるためのタグです。ひとつの参考資料に複数のタグを付与できます。

タグのデータは JSON で管理しています。`site.config.mjs`の`TAGS`定数を編集するとサイトに反映されます。

データを編集するためには、次のフィールドに従って記述してください。

```javascript
[
  {
    title: "Webアクセシビリティとは",
    slug: "introduction_to_web_accessibility",
  },
  {
    title: "取り組む理由",
    slug: "effort",
  },
  ...
]
```

ホームには配列の順番で表示されます。
