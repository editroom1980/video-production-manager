---
name: video-prompt
description: Write or improve prompts for AI video generators used through Higgsfield (Seedance 2.5/2.0, MiniMax H3, Kling 3.0/4.0, Cinema Studio, Veo 3.1 Lite, Wan) and plan the matching voice/audio, for this team's broadcast and commercial work, or answer which model to use. Use when the user asks for a 動画生成プロンプト, AIカット, CM のプロンプト, I2V/T2V prompt, shot list for an AI video model, or wants to tune a generated clip.
---

# 動画生成プロンプト作成

このリポジトリの `docs/video-ai/` の資料をもとに、動画生成AI向けのプロンプトを作ります。返答は日本語で、太字や劇的な断定を避けた普通の文で書きます。

## 手順

1. 次を読む。
   - `docs/video-ai/01-prompt-fundamentals.md`（基本、音、一貫性、実在の物と文字）
   - `docs/video-ai/02-models.md` のうち、対象モデルの節
   - 用途が合えば `docs/video-ai/03-templates.md` の該当テンプレート
   - CM なら `docs/video-ai/06-cm-techniques.md`
2. 足りない情報があれば聞く。ただし聞くのは「何を撮るか」「尺」「縦か横か」程度にとどめ、残りは妥当な既定値で埋める。モデルの指定がなければ、`04-workflow.md` の「モデル選びの目安」で選び、理由を一言添える。
3. モデルの仕様が要るときは、Higgsfield の `models_explore`（無料）で引き直す。資料の数値と違えば、引いた値を使い、違いを伝える。
4. 出力の形式:
   - プロンプト本文（英語。台詞は日本語のままで、言語を明記する）
   - ネガティブプロンプト（対応しているモデルのみ）
   - 設定: Higgsfield のモデルID、モード、縦横比、秒数、参照素材とその役割
   - 音: 効果音・環境音はプロンプトに、台詞は ElevenLabs v4 で別に作るか、どちらにするか。BGM は支給・許諾済みの音源を編集で入れる
   - 日本語の要約: 何が映るか、2〜3行
   - 費用: 書かない。「生成の前に `get_cost` で確かめる」と添える
   - 崩れたときの直し方を1〜2個

## 守ること

- 生成（クレジットを使う操作）はしない。プロンプトを作るだけにする。生成するなら、費用を見積もって承認を取ってから、手元で行う。
- カットの数は秒数で決め打ちせず、内容で決める。上限を書かない。
- 1ショットの中では、カメラの動き1つと動作1つ。カメラの動きと被写体の動きは別の節に書く。
- I2V では見た目を書き直さず、動きだけを書く。
- 曲（BGM）は生成させない。プロンプトに `No music` を入れる。効果音と環境音は生成させてよい。
- 実在の建物・ロゴ・商品・文字は、生成させてよい。ただし実物の写真を参照に渡し、出た絵を写真と並べて照合し、1か所でも違えば使わない。崩れやすいので、仕上げで支給データを重ねるのが確実な道だと添える。
- 日本語の台詞・ナレーションは生成してよい。ElevenLabs v4 で1句3テイク以上作って耳で選ぶ。数と助数詞は仮名で書く。音は伸縮させない。会話シーンは台詞を1行ずつ音声にして Seedance 2.5 の `audio_references` で渡す。
- Higgsfield で参照を指すときは `<<<uuid>>>` の書き方を使う（`@名前` では届かない）。
- MiniMax H3 では start_image と image_references を同時に渡さない（422 になる）。
- `very slowly` は動きが消えることがあるので使わない。
- 否定形で書かない。除外はネガティブ欄か、末尾の制約文で。
- 実在の人物、自治体、企業、チームを本物と誤認させる内容は作らない。「AI生成」の表記が必要か注意を促す。
- 資料の印が ⚠️ や ❔ の数値・機能は断定しない。推論を確認済みと書かない。効くか分からない指示（07 の一覧にあるもの）を使うときは、そう伝える。

## 既存プロンプトの改善を頼まれたとき

01 の「書き方の原則」と 06 の手法に照らして問題点を挙げ、1回につき1か所だけ変えた改訂版を出す。
