---
name: hf-localize
description: Make other-language versions of a finished ad or explainer on Higgsfield - quick dubbing with lip-sync for many languages, or higher-quality ElevenLabs v4 lines plus Sync Lipsync 3 - with captions replaced in the edit, not generated. Use when the user asks for 多言語版, 英語版, 吹き替え, ローカライズ, 海外向けに, or dubbing.
---

# 多言語版を作る

`docs/video-ai/16-chatgpt-dots-to-claude.md` の §1 ⑪ に沿って進める。返答は日本語、普通の文で。

## 手順
1. 受け取るもの: 元の動画（完成版か、台詞の入ったカット）、作る言語、媒体。
2. 方法を選ぶ:
   - 速く多くの言語に: `dubbing`。18言語（eng、cmn、kor、fra、deu、spa、por など）で、翻訳・合成・口合わせまで行う。
   - 質を上げたいとき: 訳文を Claude が作り、依頼者か現地の人が確かめる。その訳文を ElevenLabs v4 で読ませ（1句3テイク以上）、`sync_so` で口を合わせる（`sync_mode` は `cut_off` か `silence`）。
3. 見積もり: 費用を示して承認を取る。`dubbing` に `get_cost` の欄が無い場合は、費用が分からないことを伝え、短い1本で試してから全体に広げる。
4. テロップ・字幕・価格・商品名は生成させない。言語ごとに編集で差し替える（FCP なら FCPXML、14・15）。
5. 検品: 訳の意味、固有名詞と数字、口の合い方、音量（放送は -24 LKFS）、字幕のはみ出し。

## 守ること
- 実在の人の声や顔に似せた吹き替えにしない。出演者の声を使うなら、本人の許諾を確かめる（10 §5）。
- 公開するときは、AI 生成の開示を確かめる。
