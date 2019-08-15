# accrefs

Webアクセシビリティ関連の資料まとめページです。

## 開発

Node.js >= v12.7.0  
gulp >= v4.0.2

```bash
npm ci
npm start
```

### テンプレートの修正

Pug を利用しています。`src/html/**/*.pug`を修正してください。

### CSSの修正

Sass を利用しています。`src/style/**/*.scss`を修正してください。

### 記事の修正

Markdown を利用しています。`src/md/post/*.md`を修正してください。

タグを増やす場合は `src/md/tag/` に、他のタグファイルと体裁を合わせて保存してください。mdファイルの中身はYAMLブロックしかありません。下記が雛形です。

```yaml
---
layout: './src/html/tag.pug' # 変えない
type: 'tag' # 変えない
title: 'Webアクセシビリティとは？的なもの' # 日本語タグ名
desc: 'Webにおけるアクセシビリティを知りましょう。' # 日本語説明文
name: 'introduction_to_web_accessibility' # タグのファイル名。URLになるのでそれを見越した文字列にしてください。
---
```

変えられるのは `title` と `desc` と `name` です。他を変えるとビルドができないので注意してください。

## 管理者とメンテナの連絡先

- 伊原力也（[@magi1125](https://twitter.com/magi1125)）
- 伊藤由暁（[@otiext](https://twitter.com/otiext)）