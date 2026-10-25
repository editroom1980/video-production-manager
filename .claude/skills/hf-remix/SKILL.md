---
name: hf-remix
description: Rework an existing clip on Higgsfield without reshooting - transfer its motion to another character, swap an object, garment or product, or restyle the whole clip while keeping the motion (Genjutsu) - with rights checks and cost approval. Use when the user asks for 動きを移したい, このダンスを別のキャラで, 商品だけ差し替え, 衣装を替えたい, 画風を変えたい, Genjutsu, or モーショントランスファー.
---

# 撮り直さずに作り替える（Genjutsu）

`docs/video-ai/16-chatgpt-dots-to-claude.md` の §1 ⑨ に沿って進める。返答は日本語、普通の文で。

## 方法を選ぶ
| したいこと | 使うもの |
|---|---|
| 動画の動きを、写真の人物・キャラに移す | `generate_video`、`model: hf_mult_motion_control`（画像は role `image`、動きの元の動画は role `video` を1本）。安い版は `hf_mult_motion_control_flash` |
| 動画の中の物・衣装・商品を差し替える | `generate_video`、`model: hf_mult_replace_object`（差し替える物の画像と、元の動画1本）。安い版は `hf_mult_replace_object_flash` |
| 動きはそのままで、全体の画風を変える | `get_presets`（`source: genjutsu`、`category: genjutsu-styles`）で型を選ぶ |
| 流行りの型を使う | `get_presets`（`source: genjutsu`、`category: genjutsu-trending`） |

## 手順
1. 元の動画（4〜30秒）と、差し込む画像を受け取る。`media_upload` で上げる。
2. 権利を確かめる: 元の動画が自作か、使う許可があるか。実在の人の顔や動き、他社の商品を、許可なく使わない。
3. `get_cost: true` で見積もり、承認を取る。手元では VISIONREEL の承認待ちに置く。
4. 承認のあと生成する。
5. 検品: 差し替えた商品が実物の写真と同じか（規則9b）。手や顔の崩れ、つなぎ目。

## 守ること
- 一覧を見るだけでは生成しない（`get_presets` は見るだけ。`execute_preset` は承認のあと）。
