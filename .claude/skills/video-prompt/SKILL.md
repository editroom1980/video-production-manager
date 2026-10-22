---
name: video-prompt
description: Write or improve prompts for AI video generators (Veo, Gemini Omni Flash, Sora 2, Kling, Runway, Seedance, Wan) for this team's broadcast and commercial work, or answer questions about which video model to use. Use when the user asks for a 動画生成プロンプト, AIカット, I2V/T2V prompt, shot list for an AI video model, or wants to tune a generated clip.
---

# 動画生成プロンプト作成

このリポジトリの `docs/video-ai/` にまとめた資料をもとに、動画生成AI向けのプロンプトを作ります。

## 手順

1. 次を読む。
   - `docs/video-ai/01-prompt-fundamentals.md`（基本構造と語彙）
   - `docs/video-ai/02-models.md` のうち、対象モデルの節
   - 用途が合えば `docs/video-ai/03-templates.md` の該当テンプレート
2. 足りない情報があれば聞く。ただし聞くのは「何を撮るか」「尺」「縦か横か」程度にとどめ、残りは妥当な既定値で埋める。モデルの指定がなければ、`04-workflow.md` の「モデル選びの目安」で選び、理由を一言添える。
3. 出力の形式:
   - **プロンプト本文**（英語。台詞は日本語のままで、`in Japanese` を明記する）
   - **ネガティブプロンプト**（対応しているモデルのみ）
   - **設定**: モデル、モード、アスペクト比、秒数、API パラメータ（Sora 2 の `size` / `seconds` など）
   - **日本語の要約**: 何が映るか、2〜3行
   - **崩れたときの直し方**を1〜2個
4. 守ること:
   - 1ショットにつき、カメラの動き1つと動作1つ
   - I2V では見た目を書き直さず、動きだけを書く
   - 文字・テロップ・ロゴは生成させない（編集で入れる）
   - 否定形で書かない。除外はネガティブ欄か、末尾の制約文で
   - 実在の人物、自治体、企業、チームを本物と誤認させる内容は作らない。イメージ映像として使う前提で書き、「AI生成」の表記が必要か注意を促す
5. 資料の数値に ⚠️ が付いているものは未確認として扱い、断定しない。

## 既存プロンプトの改善を頼まれたとき

`01-prompt-fundamentals.md` の「書き方の原則」に照らして問題点を挙げ、1回につき1か所だけ変えた改訂版を出す。
