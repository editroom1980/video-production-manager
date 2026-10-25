# カメラマンのハク（固定キャラクター、2026-10-25 決定）

毎日の風刺動画（17）の主役。白鷺の姿はそのままに、役をカメラマンにした（依頼者の指示）。下の「ハク係長」は最初の案で、今は使わない。

## 設定
- 何者か: 白鷺（コサギ）のカメラマン。ニュースの現場に一番乗りするが、毎回いい場面を撮り逃すか、とんでもない物を撮ってしまう（報われない）
- 決まりの動き: 飾り羽（得意＝立つ、がっかり＝しおれる）、驚くと首が伸びる、カメラをのぞき込む決めポーズ
- 言葉: 話さない

## 見た目（毎回プロンプトに書く固定の文）
> a small original white egret cameraman puppet: round egg-shaped body of matte white needle-felted wool, small round head, long thin white plume feathers curving back from the head, small solid black dot eyes, black beak, thin black stick legs, bright yellow three-toed feet, short white felt wings used as arms, wearing a navy blue zip-up jacket with tiny white dots worn closed, red ribbed collar, cuffs and hem, a small round yellow embroidered feather patch on the left chest, mostly red over-ear headphones around the neck with black ear cushions and black inner headband, holding a small black camcorder in one wing, no strap, handmade claymation stop-motion puppet look

- 色: 白（体）、紺に白い水玉（ジャンパー）、赤（ヘッドホン、リブ）、黄色（ワッペン、足）、黒（目・くちばし・脚・カメラ）
- ストラップは付けない（依頼者の指示）。文字・ロゴは入れない

## 素材（`camera/`）
- `turnaround.jpg`: 四方から見た図。これを正とする
- `expressions.jpg`: 表情（ふつう、得意、がっかり、驚き＝首が伸びる、眠い、カメラをのぞく）
- `D_final.jpg`: 決定した正面の全身
- `compare.jpg`、`A〜D.jpg`、`D_open.jpg`: 検討した案
- 気づいた点: ビデオカメラの横に字のような小さな模様が出ることがある（読めない）。動画で目立つ場合は、プロンプトに「no markings on the camcorder」を足す

## Higgsfield
- 要素: `haku-cameraman`、ID `ad3dc307-df2d-4fe0-b32d-a2f28baa9e63`（正面と斜め。1枚目は正面）
- 素材の ID: 正面 `e0164766-a144-4bc4-9028-b7c1e249b9c4`、斜め `7cccabe7-0d46-4819-8ead-d808d2e447d5`
- ジョブ: 決定の正面 `97f26240-5760-42eb-a520-8a84372011f9`、四方 `2d6a0203-ffd6-45dc-b48c-6b74b8046de9`、表情 `ddc1cdf1-544a-4a84-8d6f-e4a366f2313d`
- 費用: 4案 8、前を開けた案 2、決定 2、設定画 4（合計 16 クレジット）
- 動画での呼び方 ❔（次の生成で確かめる）: `kling4_0` は `kling_element_ids` に要素の ID か、`image_references` に正面の素材 ID

---

# （旧案）ハク係長

毎日の風刺動画（17）の主役。2026-10-25 に作成。オリジナルの設計で、既存のキャラクターに似せていない。

## 設定
- 何者か: 白鷺（コサギ）の会社員。役職は係長。姫路城の別名「白鷺城」から
- 性格: まじめで、毎日のニュースに振り回されて報われない中間管理職。怒らない。最後は小さくため息をつく
- 決まりの動き
  - 飾り羽: 得意なときはピンと立つ、がっかりするとしおれる（感情の目盛り）
  - 首: 驚くと首がびよーんと伸びる（つかみの3秒に使う）
- 言葉: 話さない（言葉なしで分かる話にする。海外でも通じる）

## 見た目（毎回プロンプトに書く固定の文）
> a small original white egret office worker puppet: round egg-shaped body of matte white needle-felted wool, small round head, two to three long thin white plume feathers curving back from the head, small solid black dot eyes, long slim black beak, thin black stick legs, bright yellow three-toed feet, short white felt wings used as arms, wearing only a narrow navy blue necktie with tiny white dots, handmade claymation stop-motion puppet look

- 白黒の影で分かる目印: 頭の後ろの飾り羽、細い脚、ネクタイ
- 色: 白（体）、紺に白い水玉（ネクタイ）、黄色（足）、黒（目・くちばし・脚）
- 画風: 粘土と羊毛のコマ撮り。手作りの質感を残す。写実にしない

## 素材
- `turnaround.jpg`: 四方から見た図（正面・斜め・横・後ろ）。これを正とする
- `expressions.jpg`: 表情（ふつう、得意、がっかり、驚き＝首が伸びる、眠い、決意）。顔が粘土寄りで首が長めなど、四方の図と少し違う。表情の参考にだけ使う
- `front.jpg`: 四方の図から正面を切り出したもの

## Higgsfield
- 要素（Element）: `haku-kakaricho`、ID `8be7fecb-5ea9-4b09-b853-a944f35766d5`（正面と斜めの2枚。1枚目は正面）
- 素材の ID: 正面 `ae020f3e-e050-4e54-843e-dfe2173cfc34`、斜め `152f7536-be26-4bec-ab9c-9c903a2db51a`
- 設定画のジョブ: 四方 `3e63cd51-ec84-4543-97af-2be4e71af712`、表情 `f15ddba1-7b58-4d5c-bd6c-050067380bce`（`nano_banana_pro` で頼んだが、記録上は `nano_banana_2` で作られた。1枚 2 クレジット）
- 動画での呼び方 ❔（次の生成で確かめる）
  - `kling4_0`: `kling_element_ids` に要素の ID を入れるか、`image_references` に正面の素材 ID を入れる
  - `seedance_2_5` など: プロンプトに `<<<8be7fecb-5ea9-4b09-b853-a944f35766d5>>>` と書く（要素に対応しているモデルのみ）。または `image_references` に正面の素材

## 調べたこと（なぜこの設計か、2026-10-25）
- 形が単純で、白黒の影で分かる（桜井政博氏の話 ⚠️ https://gonintendo.com/contents/39129-sakurai-discusses-how-to-establish-characters-through-their-design ）
- 報われなさへの共感（おぱんちゅうさぎ ⚠️ https://www.sbbit.jp/article/cont1/185096 、ちいかわは日本キャラクター大賞2026 グランプリ ⚠️ https://www.nippon.com/ja/guide-to-japan/p01994/ ）
- 人間に似せすぎない動物の方が共感されやすい（不気味の谷）
- 同じ型で毎回出る、まねしやすい（Italian brainrot ⚠️ https://knowyourmeme.com/editorials/guides/what-are-the-italian-brainrot-animals-the-ai-memes-like-bombardiro-crocodilo-taking-over-tiktok-explained ）
- 言葉なしで分かる動物の短いドラマが海外に広がっている（⚠️ https://highxtar.com/en/the-viral-phenomenon-of-ai-kung-fu-cats-taking-tiktok-by-storm/ ）
