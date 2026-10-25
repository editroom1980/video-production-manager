---
name: trend-scout
description: Find today's topics for short videos in Japan from free live sources (Google Trends daily RSS for JP, X trends via trends24, major news, weather), score them for virality and satire safety, and return a ranked shortlist with sources. Use when the user asks for ネタ探し, 今日の話題, トレンド, バズりそうなネタ, or when daily-satire-tiktok needs topics.
---

# ネタ探し（日本の今日の話題）

返答は日本語、普通の文で。出典の URL と取った時刻を必ず残す。

## 1. 集める（無料。どれも 2026-10-25 に取れることを確かめた）
- Google トレンドの急上昇（日本）: `curl -sS -A "Mozilla/5.0" "https://trends.google.com/trending/rss?geo=JP"`。`<title>` が話題、`<ht:approx_traffic>` が検索の量の目安
- X（旧 Twitter）の日本のトレンド: `curl -sS -A "Mozilla/5.0" "https://trends24.in/japan/"`。`class=trend-link` の文字列が話題（第三者のまとめ）
- 主なニュース: Web 検索（NHK、共同、tenki.jp など）。事件・事故・災害の有無もここで見る
- 天気: Web 検索で地域の今日の予報。警報・大雨のときは笑いの対象にしない
- TikTok の流行（ハッシュタグ・曲）: TikTok Creative Center の Trends（ https://ads.tiktok.com/business/creativecenter ）。ログインが要る場合があり、ここからは取れないことがある。取れなければ「取れなかった」と書く

## 2. 点数をつける（各1〜3点）
| 観点 | 見ること |
|---|---|
| 話題の大きさ | Google と X の両方に出ているか、量は多いか |
| 共感 | 多くの人が「あるある」と思えるか（不満、困りごと、季節の習慣） |
| 絵になるか | 1つの誇張した絵で伝わるか。説明が要るネタは弱い |
| 安全 | `daily-satire-tiktok` の安全確認（17 §2）を通るか。通らなければ0点で外す |
| 鮮度 | 今日か昨日に始まった話題か。数日続くなら翌日も使えるか |

## 3. 返すもの
- 上位3つ: 話題、出典、点数、誇張の方向（一言）、外した理由（外したもの）
- 「今日は使わない」ネタ（災害・事件・実在の人が中心のもの）と理由
