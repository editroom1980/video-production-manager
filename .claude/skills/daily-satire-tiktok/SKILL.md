---
name: daily-satire-tiktok
description: Daily 30-second artistic satire video about the day's news, weather and trends for TikTok - research with sources, a satire safety check, a vertical shot plan and prompts, cost estimate and approval, generation and QC, then the TikTok publish form for the human to submit. Use when the user asks for 毎日の風刺動画, 時事ネタの動画, 天気の動画を毎日, TikTok に毎日投稿, or when the daily scheduled run for this job fires.
---

# 毎日の風刺動画（TikTok）

`docs/video-ai/17-毎日の風刺動画.md` に沿って進める。返答は日本語、普通の文で。

## 決めてある設定（17 §5.5）
- 天気の地域: 姫路。モデル: `kling4_0`、30秒、1080p、`aspect_ratio: 9:16`。1日の見積もりの上限: 60。
- 生成の前に毎回、依頼者の OK を待つ。
- 投稿のモード: 最初から `DIRECT_POST`（公開）。送るのは依頼者。

## 朝の実行（定期実行。生成しない）
1. 調べる（Web 検索。出典の URL と日付を残す）: その日の主な時事、天気（地域は 17 §5 で決めたもの）、話題。
2. 安全確認（17 §2）を通るネタを3つに絞る。通らないものは理由を一言書いて外す。3つとも危うければ、天気・季節・暮らしのネタにする。
3. 1つを選び、30秒の構成を書く。縦 9:16、3〜6カット。各カットの絵、動き、最後の絵、効果音。人は出さず寓話（動物・物・天気・形）にする。
4. プロンプトを書く（`video-prompt` スキルの決まり。画風の決まりを毎回書き、`No music`、文字は入れない）。
5. 見積もる（`get_cost: true`）。合計が1日の上限を超えるなら、尺や設定を下げる。
6. 報告を残して知らせる: ネタ3つ（出典つき）、選んだ理由、構成、プロンプト、見積もり、説明文とハッシュタグの案。「OK」か「〇番で」で進める、と書く。
7. ここで止める。生成しない。

## 承認のあと
1. 生成する（承認した金額の範囲で）。
2. 検品: 十数コマを切り出す。実在の人やロゴに似ていないか、文字が勝手に出ていないか、写実的すぎてニュース映像に見えないか。だめなら理由を書いて、作り直すか聞く。
3. 文字を入れるなら、短い一言をコードで重ねる（生成させない）。
4. 投稿の画面を開く（`tiktok_accounts` で connector_id を取り、`tiktok_prepare_publish`）。`media_type: VIDEO`、モードは `DIRECT_POST`。説明文に出典の要点と AI 生成である旨を入れる。`is_aigc` は依頼者が「はい」と決めていれば入れる。曲は依頼者が投稿の画面で選ぶ。
5. 送るのは依頼者。Claude は投稿の道具を自分で呼ばない。送ったあと、`tiktok_publish_status` で状態を確かめる。

## 守ること
- 生成の前に必ず見積もりを示し、依頼者の OK を待つ。常設の承認（1日〇クレジットまで）を依頼者がはっきり決めた場合だけ、その範囲で確認を省く。
- 実在の人物に似せない。弱い立場の人、被害者、災害の犠牲、宗教・民族・性・障害を笑わない。
- 本当の出来事に見える映像にしない。事実の部分は出典で確かめる。
