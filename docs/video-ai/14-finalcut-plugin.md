# Final Cut Pro のプラグインを作れるか（2026-10-24）

調べ方: Apple の開発者向け資料（Professional Video Applications）を、資料のデータ（JSON）から直接読んだ。ほかは Apple のサポートページと第三者の記事。
根拠: ✅ Apple の資料で確かめた／ ⚠️ 第三者の記事／ ❔ 未確認・推測

## 結論
- 作れる。Apple が公式に用意している拡張の方法は5つある ✅
- VISIONREEL の役に立つのは、次の3つ。この順に、小さく始めるのがよい（推測）
  1. FCPXML を作って、FCP に送る
  2. FCP から書き出しを受け取る（カスタムの共有先）
  3. FCP の画面の中に、VISIONREEL の小さな窓を出す（ワークフロー拡張）
- 映像の効果そのもの（FxPlug）は作れるが、VISIONREEL の目的（生成の管理）とは方向が違う
- 作るのは Mac の上だけ（Xcode が要る）。このクラウドの環境（Linux）では作れないので、手元の開発チャットで行う

## 1. 公式の5つの方法
出典: https://developer.apple.com/documentation/professional-video-applications ✅

| 方法 | 何ができるか | 作り方 | VISIONREEL との関係 |
|---|---|---|---|
| A. FCPXML のやり取り | 素材・メタデータ（評価、キーワード、マーカー）・タイムラインを FCP に送る。FCP から編集の内容を受け取る | XML を書くだけ。どの言語でもよい | 大きい。採用テイクの並びを FCP のプロジェクトとして渡せる |
| B. カスタムの共有先（Custom Share Destination） | FCP の「共有」の行き先に自分のアプリを足す。書き出した映像と、編集の内容（FCPXML）、ライブラリの写しを受け取れる | Mac のアプリ（Info.plist と AppleScript の定義、Apple イベントへの応答） | 中。FCP で仕上げたものを VISIONREEL の「完成素材」と納品チェックに戻せる |
| C. ワークフロー拡張（Workflow Extension） | FCP の画面の中の浮かぶ窓に、自分のアプリの機能を出す。ドラッグで素材を渡す。タイムラインの再生位置を読む・動かす | Mac のアプリの中に拡張（.appex）を入れる。Xcode の雛形と SDK がある | 中〜大。FCP を開いたまま、VISIONREEL のテイクを選んでタイムラインに落とせる |
| D. FxPlug（効果のプラグイン） | 自作のフィルター・ジェネレーター・トランジション。画面上の操作部品、解析（トラッキングのような前処理）も | Swift か Objective-C。Metal などで描く。Motion でテンプレートに包んでから FCP で使う | 小。生成の管理とは別の話。将来、AI の処理を効果として出すなら候補 |
| E. Motion のテンプレート | タイトル・効果・トランジション・ジェネレーターを、コードなしで作る | Motion で作って公開 | 小〜中。テロップや字幕の帯（安全域）の型を配るのに使える |
| （参考）Compressor のエンコーダー拡張 | Compressor に独自の書き出し形式を足す | Objective-C のみ | 使わない |

## 2. 方法ごとの中身

### A. FCPXML を FCP に送る ✅
- 送り方は3つ。ドラッグ＆ドロップ、Apple イベント（AppleScript で「開く」を送る）、録画しながら送る
- Apple イベントで送ると、FCP が「ライブラリを開く」の画面を出し、使う人が送り先のライブラリやイベントを選ぶ。FCPXML の中に `import-options` を書けば、送り先を決めておける
- AppleScript で送るのが勧められている。FCP が送り元のアプリを分かるので、エラーのときの案内が良くなる
- 版: FCP 12.0（2026-01-28）で FCPXML 1.14 ✅（Apple のリリースノート https://support.apple.com/102825 ）。資料の本文には「1.9 は 10.4.9 以降」と古い記述が残っている
- VISIONREEL での形（推測）:
  - プレビューの「ラフカットを書き出す」の隣に「FCP で開く」を置く
  - 採用テイクの並び、カット名、マーカー（カット番号・採用の理由）、評価（採用＝お気に入り）、キーワード（モデル名・案件）、メタデータ（ジョブ ID、プロンプトの版）を FCPXML に書く
  - `osascript` で FCP に送る。Node のサーバーから呼べる。拡張は要らない
  - 12 の V7 の道具（`@chatoctopus/timeline` など）か、自前で XML を書く

### B. FCP から受け取る（カスタムの共有先）✅
- FCP の共有の行き先として、自分のアプリを選べるようにする。受け取れるのは、書き出した映像、プロジェクトの編集の内容（FCPXML）、キーワード・評価・マーカー、ライブラリの写し
- アプリ側に要るもの: Info.plist で FCP と話せることを示す、スクリプトの定義（.sdef）、FCP から来る一連の Apple イベントへの応答
- 共有先の設定ファイルは、アプリと一緒に配って、使う人が FCP に足す
- VISIONREEL での形（推測）:
  - 小さな Mac のアプリ（VISIONREEL.app の Swift の窓を広げる形）が受け取る
  - 受け取ったファイルを案件の `完成素材/` に置き、納品チェック（尺・ラウドネス・解像度）を自動で回す
  - FCP で直したカットの順番や尺を FCPXML から読んで、盤面に戻すこともできる

### C. ワークフロー拡張 ✅
- FCP 10.4.4 で入った ⚠️（ https://www.provideocoalition.com/final-cut-pro-x-10-4-4-adds-workflow-extensions-as-the-highlight-of-a-new-update/ ）。例は Frame.io（確認と承認）、Shutterstock（ストック素材）、Simon Says（文字起こし）、CatDV（素材管理）✅（ https://support.apple.com/101630 ）
- FCP のツールバーの「拡張機能」ボタンから開く。浮かぶ窓に出る ✅
- 作り方: Workflow Extension SDK を入れ、Xcode の「Final Cut Pro Workflow Extension」の雛形で、Mac のアプリに拡張を足す ✅
- タイムラインについてできること ✅（`FCPXTimeline`）:
  - 開いているシーケンス（`activeSequence`）とその時間の範囲（`sequenceTimeRange`）を読む
  - 再生位置を読む（`playheadTime()`）、動かす（`movePlayhead(to:)`）
  - タイムラインの変化を見張る（`add(_:)` で見張り役を登録）
- できないこと ✅:
  - タイムラインを直接編集する API は無い。素材やシーケンスを渡すのは、ドラッグ＆ドロップの FCPXML で行う
  - 拡張は FCP から書き出した映像を直接受け取れない。受け取るのは入れ物のアプリ（B の方法）で、拡張はそこから読む
  - 窓を閉じるとすぐ終わるので、状態は自分で保存する
- Apple の設計の指針: 狭い窓で済む作業（素材の管理、ストック素材を探す）に向く。時間のかかる作業や込み入った作業は、入れ物のアプリに任せる ✅
- VISIONREEL での形（推測）:
  - 拡張の窓に、案件のカット一覧と採用テイクのサムネイルを出す。テイクを FCP のタイムラインにドラッグで落とす
  - FCP の再生位置からカットを特定し、そのカットの「プロンプトの版」「別テイク」を窓に出す。差し替えたいテイクをドラッグする
  - 窓の中身は、VISIONREEL のローカルの画面（127.0.0.1:4870）を Web 表示で出す形がいちばん手間が少ない。ただし、拡張の中で Web 表示が使えるか、拡張のサンドボックスからローカルのサーバーにつなげるかは ❔（試作で確かめる）
  - 生成（クレジット）は拡張から直接撃たない。今と同じく承認待ちに置くだけにする

### D. FxPlug 4 ✅
- 必要なもの: Xcode 15 以降、FxPlug 4 SDK（Apple の開発者サイトからダウンロード）、Motion 5.6.4 以降、Final Cut Pro 10.6.6 以降
- 書き方: Swift か Objective-C。プラグインは FCP の外の別のプロセスで動く（FxPlug 4 の「アウトオブプロセス」）。描画は Metal・Core Image など。OpenGL・OpenCL は非推奨
- できること: パラメーター、画面上の操作部品、3D とライト、色空間、キーフレーム、タイミング、メディアの解析（バックグラウンドで全フレームを見てから描く。FxPlug 4.1）、プロジェクトの情報の取得
- FCP で使うには、Motion で効果のテンプレートに包み、パラメーターを公開する
- FCP for iPad は FxPlug 4 に対応していない ✅
- FxPlug 3 は今の FCP と Motion では使えない ✅
- 配布: Developer ID で署名し、公証（notarization）する。雛形は「ローカルで実行するための署名」になっているので、自分の Mac で使うだけならそのままでも動く見込み ❔

### E. Motion のテンプレート ✅
- FCP のタイトル・効果・トランジション・ジェネレーターは、中身は Motion の書類。Motion で自作して配れる
- VISIONREEL での形（推測）: 縦型 SNS の字幕の帯、テロップの型、AI 生成の開示の表示（10 §5）を、案件で使い回す型として作る。コードなしで作れる

## 3. 公式ではない方法（参考）
- CommandPost（無料、オープンソース、MIT）: macOS のアクセシビリティ機能で FCP の画面を操作し、Lua で自動化する ⚠️（ https://commandpost.fcp.cafe/ ）。FCP の更新で壊れることがある ❔
- FCP 用の MCP サーバー（第三者）: Claude から FCPXML を読み書きし、動いている FCP に読み込ませる ⚠️（ https://glama.ai/mcp/servers/DareDev256/fcp-mcp-server ）。中身と安全性は確かめていない
- 画面を操作する方法は、FCP の更新で壊れやすい。VISIONREEL に組み込むのは、公式の A〜C を先にする

## 4. 必要なもの
- Mac、Xcode（15 以降）、各 SDK（Apple の開発者サイトから。Apple ID でのサインインが要る ❔）
- 自分の Mac で使うだけなら、ローカルの署名で動く見込み ❔
- ほかの人に配るなら、Apple Developer Program に入り、Developer ID で署名して公証する ✅（年会費は ❔）
- このクラウドの環境（Linux）では作れない。作るのは手元の開発チャット

## 5. 進め方の案（手元の開発チャット向け）
1. A（0円、1〜2日の見込み ❔）
   - VISIONREEL のプレビューから、採用テイクの並びを FCPXML 1.14 で書き出す
   - `osascript` で FCP に送る
   - FCP で読めることと、マーカー・評価・キーワードが入ることを確かめる
2. B
   - VISIONREEL.app（Swift の窓）を、カスタムの共有先として受けられるようにする
   - 受け取ったら、`完成素材/` に置いて納品チェックを回す
3. C（試作）
   - ワークフロー拡張の雛形で、窓に VISIONREEL の画面を出せるかを確かめる
   - 出せたら、テイクのドラッグと、再生位置からカットを特定するところまで作る
4. D・E は、必要が出たら

## 出典（2026-10-24 に見たもの）
- Professional Video Applications https://developer.apple.com/documentation/professional-video-applications ✅
- FxPlug https://developer.apple.com/documentation/professional-video-applications/fxplug ✅
- Setting up for FxPlug development https://developer.apple.com/documentation/professional-video-applications/setting-up-for-fxplug-development ✅
- Preparing plug-ins for use in Final Cut Pro https://developer.apple.com/documentation/professional-video-applications/preparing-plug-ins-for-use-in-final-cut-pro ✅
- Notarizing your FxPlug plug-in https://developer.apple.com/documentation/professional-video-applications/notarizing-your-fxplug-plug-in ✅
- Analyzing media https://developer.apple.com/documentation/professional-video-applications/analyzing-media ✅
- Workflow Extensions https://developer.apple.com/documentation/professional-video-applications/workflow-extensions ✅
- Building a Workflow Extension https://developer.apple.com/documentation/professional-video-applications/building-a-workflow-extension ✅
- Designing Workflow Extensions https://developer.apple.com/documentation/professional-video-applications/designing-workflow-extensions ✅
- Interacting with the Final Cut Pro Timeline https://developer.apple.com/documentation/professional-video-applications/interacting-with-the-final-cut-pro-timeline ✅
- FCPXTimeline https://developer.apple.com/documentation/professional_video_applications/fcpxtimeline ✅
- Content and Metadata Exchanges https://developer.apple.com/documentation/professional-video-applications/content-and-metadata-exchanges-with-final-cut-pro ✅
- Sending Data Programmatically https://developer.apple.com/documentation/professional-video-applications/sending-data-programmatically-to-final-cut-pro ✅
- Custom Share Destination https://developer.apple.com/documentation/professional-video-applications/receiving-media-and-data-through-a-custom-share-destination ✅
- FCPXML Reference https://developer.apple.com/documentation/professional-video-applications/fcpxml-reference ✅
- Create an effect template https://developer.apple.com/documentation/professional-video-applications/create-an-effect-template-for-use-in-final-cut-pro ✅
- Encoder Extensions https://developer.apple.com/documentation/professional-video-applications/encoder-extensions ✅
- Final Cut Pro のリリースノート https://support.apple.com/102825 ✅
- Use workflow extensions in Final Cut Pro https://support.apple.com/101630 ✅
- ProVideo Coalition（10.4.4 の記事）⚠️
- CommandPost https://commandpost.fcp.cafe/ ⚠️
- fcp-mcp-server https://glama.ai/mcp/servers/DareDev256/fcp-mcp-server ⚠️
