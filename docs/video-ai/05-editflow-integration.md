# EditFlow への組み込み案

`index.html`（単一ファイル、`localStorage` に保存、モバイル幅 480px）の現状の作りに合わせた案です。小さい順に並べています。

## 案A: 工程ライブラリにAI工程を追加する（小）

`DEFAULT_STEP_LIBRARY` に3行を足すだけです。

```js
{ code:'AP', jp:'AIカット設計', en:'AI Shot Planning', defaultHours:1 },
{ code:'AG', jp:'AI生成・選別', en:'AI Generation',    defaultHours:2 },
{ code:'AF', jp:'AI素材仕上げ', en:'AI Finishing',     defaultHours:1 },
```

注意点:
- `DEFAULT_PRESETS` は `DEFAULT_STEP_LIBRARY[0]` のようにインデックスで参照しています。**末尾に追加**しないと既存のプリセットがずれます。
- 既存ユーザーの `localStorage` には古いライブラリが保存されているので、`loadState` で不足しているコードを補うマイグレーションが必要か確認してください。
- 必要なら「AI活用CM」プリセットを追加します: IG → SC → AP → AG → AF → RC → FC → RV

## 案B: プロジェクトごとの「AIカット」リスト（中）

プロジェクトに `aiShots` 配列を持たせ、[04-workflow.md](04-workflow.md) の「記録しておくもの」を管理します。

```js
// project.aiShots[]
{
  id: 'shot_xxx',
  label: 'OP空舞台',            // カット名
  model: 'veo-3.1',             // data/video-ai-prompts.json の models[].id
  mode: 't2v',                  // t2v | i2v | ref | edit
  prompt: '...',
  negative: '...',
  aspect: '16:9',
  seconds: 8,
  seed: null,
  refs: ['castle.jpg'],
  status: 'draft',              // draft | generating | review | adopted | rejected
  takes: 0,                     // 生成回数
  adoptedTake: null,
  rightsNote: '',               // 商用利用・クレジット・「AI生成」表記
  updatedAt: '2026-10-22'
}
```

- プロジェクトの詳細シートに「AIカット」セクションを追加し、ステータスの色分けには既存の `colorForUrgency` の配色を流用します。
- AG 工程の完了を「すべてのカットが adopted か rejected になった」と連動させることもできます。

## 案C: プロンプトビルダー（中〜大）

`data/video-ai-prompts.json` を読み込み、選択式でプロンプトを組み立てるシートです。

1. テンプレートを選ぶ（T1〜T8）
2. モデルを選ぶ。モデルごとの `maxSeconds`、`aspects`、`syntax`（マルチショットの書き方、音の記号）が反映される
3. ショットサイズ、アングル、カメラワーク、照明、スタイルをチップで選ぶ。日本語で表示し、英語で出力する
4. 被写体、動作、場所、台詞を日本語で入力する（英訳は手で行うか、将来 API を使う）
5. 「コピー」ボタンでクリップボードに入れる。同時に案Bの `aiShots` に保存する

実装メモ:
- 単一ファイルの構成を保つなら、JSON の中身を `index.html` に `const VIDEO_AI_DATA = {...}` として埋め込むのが簡単です。`fetch('data/video-ai-prompts.json')` は `file://` で開いたときに動かないためです。
- チップの UI は既存の `.tab` / シートのスタイルを流用します。

## 案D: 外部APIとの連携（大・将来）

- 生成APIを直接呼ぶ（Sora 2 API、Vertex AI の Veo、fal などの集約API）
- 静的な HTML から API キーを使うと漏れるため、**中継サーバー（Cloudflare Workers など）が必須**です
- コストを表示するため、モデルごとに秒単価を `video-ai-prompts.json` に持たせる（価格は変わりやすいので更新日を付ける）

## おすすめの順番

A（工程の追加）→ B（記録）→ C（ビルダー）。A と B だけでも「AIカットの工程が遅れているか」をガントチャートで見られるようになり、工程管理アプリとしての価値が出ます。
