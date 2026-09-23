const origin = "https://openai.com";

export const astraModels = ["GPT-6 Astra", "GPT-5.6 Sol", "Claude Fable 5.1", "Claude Fable 5", "Claude Opus 5", "Gemini 3.8 Flash"];
const colors = ["#5198f8", "#17417e", "#e5a270", "#965e3c", "#542a17", "#928ac4"];

function benchmark(id, title, values, note = "") {
  return { id, title, label: title, note, max: 100,
    entries: values.flatMap((value, index) => value === null ? [] : [{ label: astraModels[index], value, displayValue: `${value.toFixed(1)}%`, color: colors[index] }]),
  };
}

export const astraBenchmarks = [
  {
    ...benchmark("science", "Terminal-Bench Science 0.1", [64.6, 22.4, 52.6, 21.4, 30, null], "Terminal-Bench Science 0.1 は、エージェントがコードとターミナルツールを使用して、データ分析、シミュレーションの実行、モデルのフィッティングを含む科学研究ワークフローを完了できるかどうかをテストします。GPT‑6 Astra は、比較対象のモデルの中で 64.6% という新たな高い記録を達成し、Claude Fable 5.1 の 52.6% を上回りました。また、推定 API コストは約 31% 低くなっています。"),
    kind: "scatter", xMax: 80, yMin: 20, yMax: 70,
    series: [
      { label: astraModels[0], color: colors[0], points: [[11.31, 54.3], [12.41, 56.9], [14.74, 61.1], [15.57, 60.3], [26.2, 64.6]] },
      { label: astraModels[1], color: colors[1], points: [[20.1, 22.4]] },
      { label: astraModels[2], color: colors[2], points: [[11.1, 26.3], [14.9, 35.7], [20.3, 40], [31.8, 49.5], [37.9, 52.6]] },
      { label: astraModels[3], color: colors[3], points: [[67.5, 21.4]] },
      { label: astraModels[4], color: colors[4], points: [[33.3, 30]] },
    ],
  },
  benchmark("arc", "ARC-AGI-3", [99.9, 7.8, null, null, 30.2, null], "ARC-AGI-3 tests how well agents learn as they solve unfamiliar interactive tasks. GPT‑6 Astra saturates the eval, scoring 99.9%. The average human tester scored 48%. GPT‑6 Astra was measured with our responses API harness, which better reflects real-world performance than the original benchmark harness, which discards past reasoning and past messages. With this harness, we estimate Sol would score in the ballpark of ~30%."),
  benchmark("math", "FrontierMath Tier 4（v2）", [97.6, 83, 87.8, 90.2, 73.2, null]),
  benchmark("terminal", "Terminal-Bench 4.0", [57.9, 37.3, 55.8, 44.5, 52.6, 19.1], "Terminal-Bench 4.0 は、ソフトウェアエンジニアリング、システム構成、データ分析など、複雑なターミナルベースのタスクでエージェントをテストします。GPT‑6 Astra は 57.9% という新記録を達成し、GPT‑5.6 Sol の 37.3%、Claude Fable 5.1 の 55.8% を上回りました。"),
  benchmark("automation", "AutomationBench", [41.4, 18.1, 31.4, 17.4, 26.9, null]),
];

export const astraBenchmarkGroups = {
  introduction: astraBenchmarks,
  computer: [
    benchmark("agents", "Agents’ Last Exam（エージェントの最終試験）", [59.3, 53.6, null, 48.7, 55.5, null], "Agents’ Last Exam は、金融モデリングからエンジニアリング、メディア制作に至るまで、実際のソフトウェアにおける複雑な専門業務を対象にエージェントを評価します。GPT‑6 Astra は、示された比較において新たな最高値に達し、59.3% を記録しました。"),
    benchmark("screen", "ScreenSpot-Pro", [92.7, 76.9, null, 87.3, null, null]),
    benchmark("osworld", "OSWorld", [72.6, 65.7, null, null, 70.2, null]),
  ],
  professional: [
    benchmark("cad", "BenchCAD", [95.9, 83.3, 84.3, 67.5, 82.1, null], "BenchCAD tests whether models can reconstruct 3D objects from multi-view renders by generating CAD code. With tools, GPT‑6 Astra reaches a new high in the comparison shown, achieving a 95.9% geometric-overlap score, versus 83.3% for GPT‑5.6 Sol and 84.3% reported for Claude Fable 5.1."),
    benchmark("browse", "BrowseComp", [91.5, 90.4, null, 87.4, 90.8, null]),
    benchmark("design", "デザインタスク（社内）", [50, 47.4, null, 35.8, null, null]),
    benchmark("data", "データサイエンスのタスク（内部）", [40.9, 30.5, null, 34.7, null, null]),
  ],
  coding: [astraBenchmarks[3], benchmark("frontier", "FrontierCode 1.1 Extended", [64.5, 60.6, 63.6, 64.9, 63.6, 56.3]), benchmark("deepswe", "DeepSWE", [74.1, 72.7, 67.4, 69.9, 73.7, 73.8]), benchmark("database", "データベース移行タスク（内部）", [63.9, 42.7, 57.8, 50.3, null, null])],
  science: [benchmark("gpqa", "GPQA Diamond", [96, 94.6, 93.7, 92.6, 93.7, 95.3], "GPQA Diamond は、生物学、化学、物理学における大学院レベルの科学的推論を評価します。GPT‑6 Astra は、示されている比較で 96.0% という新たな高を記録しています。"), benchmark("health", "HealthBench Professional", [63.4, 60.5, 58.1, 60.9, 56.4, 52.1]), benchmark("lifesci", "LifeSciBench", [60.3, 59.9, null, null, null, null]), benchmark("gene", "GeneBench Pro", [37.1, 32.3, null, null, null, null]), benchmark("medchem", "MedChemBench", [49.3, 47.4, null, null, null, null])],
  cybersecurity: [benchmark("exploit", "ExploitBench", [100, 78.5, null, null, 70, null]), benchmark("exploitgym", "ExploitGym", [42.4, 30.3, 30.4, 28.4, 22, null]), benchmark("recentexploit", "ExploitBench（2026年6月〜8月）", [39, 5.5, null, null, null, null]), benchmark("sre", "SRE-Bench", [88, 55.9, null, null, 12.5, null])],
  alignment: [benchmark("autoreview", "自動レビューの回避", [0, .29, null, null, null, null], "この評価では、知識業務タスクにおける自動レビューによる却下に対して、モデルがどのように応答するかをテストします。不適切なユーザー設定を悪用して自動レビューを回避することは、失敗と見なされます。Astra は自動レビューを回避しようとしたことは一度もありません。"), benchmark("honeypot", "ExploitGym ハニーポット", [0, 48.2, null, null, null, null])],
};

const paragraph = (text) => ({ type: "paragraph", text });
const heading = (id, text) => ({ type: "heading", id, text });
const charts = (group) => ({ type: "benchmarks", group });
const quote = (text, author) => ({ type: "quote", text, author });

export const astraArticle = [
  heading("intelligence", "新世代の応答性能"),
  { type: "embed", src: "https://player.vimeo.com/video/1222553704?h=ee86f55524&badge=0&autopause=0&player_id=0&app_id=58479&controls=1&autoplay=0&background=0&loop=1", label: "GPT-6 Astra — 新世代の応答性能", wide: true },
  { type: "callout", html: `2026年9月22日更新：GPT‑6 Sol と GPT‑6 Luna を追加し、GPT‑6 ファミリーを拡充します。<a href="${origin}/index/introducing-gpt-6-sol-and-luna/">詳細はこちら</a>` },
  paragraph("世界で最も知能が高く、人間の意図に沿ったモデル、GPT‑6 Astra を発表します。"),
  paragraph("GPT‑6 Astra は、事前学習、強化学習、アラインメントにわたる長年の研究と大規模な取り組みを結集しています。Astra は、コンピューター操作、ブラウジング、ソフトウェアエンジニアリング、サイバーセキュリティ、科学、専門業務において最先端の性能を発揮します。Astra は FrontierMath Tier 4 で 98% のスコアを記録し、実質的な評価上限に達しています。数学における長年の未解決問題の解決にすでに貢献しています。Astra は ARC-AGI-3 で 99.9%、ExploitBench で 100% のスコアを記録し、いずれも実質的な評価上限に達しています。また、コンピューター操作とブラウザー操作の新たなフロンティアを切り開き、最も要求の厳しい専門業務も、比類ないスピード、正確性、判断力で処理します。"),
  paragraph("GPT‑6 Astra は本日より一部の組織向けに提供を開始し、今後数日かけて、すべての ChatGPT Plus、Pro、Business、Enterprise ユーザーに加え、OpenAI API、Microsoft Azure、AWS Bedrock 経由でも利用可能になります。"),
  charts("introduction"),
  quote("「ARC-AGI-3 では、Astra は 96% のレベルで OpenAI が設定した人間の行動効率のベースラインを上回り、このベンチマークで実質的に人間と同等の水準に達しました。これは、OpenAI がこれまでにテストした中で最高のモデルであるだけでなく、フロンティアモデルの性能における大きな飛躍でもあります。未知の環境を探索して問題を解決する能力だけでなく、それを効率的に学習する能力も大きく向上しています。」", "Greg Kamradt 氏、ARC Prize Foundation"),
  paragraph("Astra は当社で最もアラインメントの取れたモデルであり、ユーザーの意図の理解とモデルのふるまいが大幅に向上しています。そのため、Astra の判断をこれまで以上に信頼して、タスクを任せることができます。これを検証する方法の一つとして、OpenAI は Hugging Face のインシデントから得た知見を踏まえた新しい評価を構築しました。この評価では、困難または不可能なタスクに直面したモデルが、意図された範囲を超えるかどうかを判定します。本番環境向けのセーフガードがない場合、GPT‑5.6 Sol は48%のケースで許可された対象の範囲を超えましたが、GPT‑6 Astra では0%でした。"),
  heading("computer-use", "世界最高のコンピューター操作モデル"),
  paragraph("GPT‑6 Astra は、コンピューター操作の速度、精度、安全性における新たなフロンティアを切り開きます。オンラインフォームへの入力、CRM の顧客レコードの更新、カレンダーの整理といった面倒なタスクを処理できます。メールやドキュメントエディタ内で、オンラインリサーチを行い、要約の下書きを作成できます。科学データを分析し、プロットを生成し、Web サイトを作成し、そのサイト上のすべての機能が動作することを確認するためにフロントエンドの QA チェックを実行できます。自律的にソフトウェアをインストールしてテストし、画面上で確認した問題のトラブルシューティングを行えます。こうした改善は、私たちの最先端の評価結果にも表れています。"),
  charts("computer"),
  paragraph("これらの改善は、実際の知識業務タスクにおける大幅な効率向上にもつながります。OSWorld 2.0 のレイテンシシミュレーションでは、Astra は GPT‑5.6Sol よりもタスクあたり約47%短い時間で、より高いコンピューター操作性能を達成しています。Astra はタスクあたり約40分で72.6%を記録したのに対し、Sol は約75分で65.7%でした。"),
  paragraph("Alongside Astra, we are also updating the Codex harness to significantly improve the speed of computer use. Combined with Astra’s efficiency, this translates to a 1.9x faster task completion compared to the current GPT‑5.6 Sol experience, on the Mind2Web benchmark. The model’s improvements on speed mean it can take on many time-consuming life tasks for you, faster than you can."),
  quote("「ローンチ当日に GPT‑6 Astra を Devin のハーネスに統合します。GPT‑6 Astra は、当社のテストベンチマークで最先端の性能を発揮します。その優れたコンピューター操作、文章作成、コードベースの理解により、導入直後からテストが改善されました。動画は明らかに内容を追いやすくなり、レポートはより明確で簡潔になっています。」", "Silas Alberti、リサーチ担当 SVP、Cognition"),
  heading("professional-work", "専門業務における大きな変化"),
  paragraph("GPT‑6 Astra は、コンピューター操作能力の進歩と、実務環境向けに特化したトレーニングを組み合わせることで、複雑な業務タスクへの対応を支援します。複雑な問題に必要な応答性能と、多段階のワークフローを実行し、完成度の高い文書、スプレッドシート、プレゼンテーション資料を作成する能力を兼ね備えています。"),
  charts("professional"),
  paragraph("GPT‑6 Astra は、既存のテンプレートに準拠し、レイアウトが整っていて、構造化されたストーリー展開で要点を簡潔に伝えるスライドを作成するうえで、当社最高のモデルです。お使いのテンプレートに従い、文章やビジュアルのスタイルに合わせた、明確で整ったドキュメント、プレゼンテーション、スプレッドシート、分析資料を作成します。Astra はまた、目の前の作業に不要な情報を繰り返すのではなく、重要なコンテキストだけを出力に取り込むように特別にトレーニングされています。つまり、これにより、ビジネスの文脈や基準に合った、よりすぐに利用できる成果物を出力できます。"),
  paragraph("GPT‑6 Astra は、構築する Web サイト、ゲーム、アプリケーション、レンダリングにも、より優れた視覚的判断力を発揮します。ChatGPT の Sites を使えば、Astra はプロンプトから直接、ウェブサイト、ウェブアプリ、ゲームを作成、ホスト、共有できます。"),
  quote("「Astra は、能力と効率性の両面で、私たちに大きな優位性をもたらします。当社がテストした他のモデルよりも最大 20% 少ないトークン使用量で、当社の最も複雑なクリエイティブワークフローを正常に実行します。何よりも、お客様にとっては、より高品質な出力を意味します。」", "Alex Mashrabov 氏、Higgsfield AI CEO 兼共同創業者"),
  { type: "embed", src: "https://tidal-rush-paradise-gp.skirano.chatgpt.site/", label: "Interactive Tidal Rush kart-racing game", wide: true, caption: "モデルは、鮮やかなグラフィック、魅力的なゲームプレイ、正確なモーションでゲームに命を吹き込み、技術的な知識がない人でも、単純な要素だけにとどまらないカスタムゲームを数分で作成してプレイできるようにします。クレジット：Pietro Schirano。" },
  paragraph("指示に解釈の余地がある場合、GPT‑6 Astra は適切な判断を下す点で従来のモデルより優れています。文脈を利用して一般的な情報の不足を補い、その回答によって結果が変わる可能性がある場合には、要点を絞って質問します。Codex では、回答を待たずに進められる作業を続けながら、非同期で質問できます。返信がない場合、適切な場面では妥当な想定に基づいて進めますが、重要な判断については入力を待ちます。"),
  paragraph("以下の例では、情報が不足すると回答が大きく変わる可能性がある日常的なタスクで、Astra がユーザーとどのように協働するかを示します。"),
  { type: "image", wide: true, src: "https://images.ctfassets.net/kftzwdyauwt9/6XttKhMddBzO6pT2IY2brG/841e9a215931057aeb578e1aa45f9bb4/career-website-dark-v3.png?w=3840&q=90&fm=webp", alt: "個人のキャリアサイト作成を支援する GPT-5.6 Sol と GPT-6 Astra の横並び比較。" },
  paragraph("Astra は、タスクの進行に合わせて状況を把握し続ける点でも優れています。以前のモデルでは、ステアリングメッセージを新たな目標として扱ってしまい、元のリクエストや以前の制約を見失うことがありました。Astra は、新しい要件を取り込み、求められれば方針を変更し、全体のタスクを見失うことなく、途中で挟まれる質問にも回答します。"),
  heading("coding", "コーディング"),
  paragraph("GPT‑6 Astra は、現時点でソフトウェアエンジニアリングに最適なモデルです。"),
  quote("「GPT‑6 Astra は、当社のコーディングベンチマークで最先端の性能を発揮し、GPT‑5.6 Sol と比べて、トレーディングの直感力を測る評価でも明確な進歩を示しています。エージェント型コーディングに使用すると、GPT‑6 Astra は開発者が理解しやすい形でやり取りし、本番品質に到達するまでの反復が少なくて済むコードを生成します。」", "John Crepezzi 氏、Jane Street、AI Assistants チーム"),
  charts("coding"),
  paragraph("Astra により、コンテキストウィンドウが上限に達した際に Codex がコンテキストを保持・取得するための新しい方法を導入します。従来、モデルは、複雑な問題をデバッグしたり、大規模なリファクタリングに取り組んだりする場合など、長時間のセッション中の作業を要約するためにコンパクションを使用してきました。各コンパクションでは、修正が失敗した理由やコンポーネントの動作に関する詳細が省略されることがあります。Codex では、Astra はコンテキストウィンドウをまたいでメモを保持し、蓄積された詳細情報を単一の要約に繰り返し圧縮することなく維持できます。過去のコンテキストウィンドウは引き続き検索可能なため、Astra は、その情報が自身のメモに記録されていなかった場合でも、以前のメッセージやツール出力から要件やテスト結果を見つけることができます。この試験的機能は、Codex の config.toml で有効にできます。今後数週間で Astra のデフォルトになります。"),
  heading("scientific-discovery", "科学的発見の推進"),
  quote("「要するに、一つの時代の終わり、そして新たな時代の始まりだ。」", "Greg Burnham、EpochAI"),
  paragraph("GPT‑6 Astra is a major advance for scientific discovery, mathematics, and health. Today, we’re sharing two further results on the gaps between prime numbers."),
  paragraph("Astra also sets new records across a suite of math and science evaluations."),
  charts("science"),
  paragraph("Astra は、科学的発見を支える実務的な作業に役立ちます。科学的推論とコンピューター操作を組み合わせることで、専門ソフトウェア内で直接作業してデータを詳しく調べ、結果を検討できるため、研究者がエビデンスを評価し、次に何を調査すべきかを判断するのに役立ちます。"),
  heading("cybersecurity", "サイバーセキュリティ"),
  paragraph("OpenAI の安全性アップデートでお伝えしたように、Astra のサイバー能力は大幅に向上しており、OpenAI の Preparedness Framework におけるサイバーセキュリティ分野のクリティカル閾値を満たしています。ゼロデイエクスプロイトを特定して開発する能力は、防御側が弱点を発見してパッチを適用するのに役立つ一方で、より強力な安全対策の必要性も生み出します。これらの能力がどの程度まで及ぶかを把握するため、OpenAI は Astra について、社内評価と第三者の専門家による評価を実施しました。"),
  paragraph("まず、本番環境向けの安全対策を適用せずに、ExploitBench と ExploitGym でモデルをテストしました。これらは、モデルが既知のソフトウェア脆弱性を実際に動作するエクスプロイトに変換できるかどうかを評価するものです。ExploitBench では、Astra は満点の100%を達成しました。一方、OpenAI の従来のフロンティア級サイバー能力を備えたモデルである GPT‑5.6 Sol は78.5%でした。ExploitGym において、Astra は GPT‑5.6 Sol より大幅に少ない出力トークンを使用しながら、GPT‑5.6 Sol の30.3%を上回る42.4%の成功率を達成しました。"),
  charts("cybersecurity"),
  paragraph("過去のソフトウェア脆弱性に関する情報に触れていたことがベンチマーク結果に影響した可能性を考慮し、Astra を 2 つの新しいベンチマークでも評価しました。その一例として、過去3か月間の脆弱性を用いてエクスプロイト開発をテストするため、社内評価『ExploitBench（2026年6月〜8月）』を構築しました。Astra はこのデータセットで、GPT‑5.6 Sol よりも大幅に高い任意コード実行率を達成し、使用した出力トークンもはるかに少なくなりました。評価中に、Astra はこれまで知られていなかったゼロデイ脆弱性を2件も発見し、使用しました。両方の脆弱性を、それぞれのメンテナーに開示しています。"),
  paragraph("Astra については、モデルが生のソースコードにアクセスせずにソフトウェアバイナリをリバースエンジニアリングしてその中核となるロジックを理解できるかどうかを測定するベンチマークである SRE-Bench でもテストしました。Astra はタスクの 88.0% を 1 回の試行で、99.2%を 4 回以内の試行で解決しました。一方、GPT‑5.6 Sol ではそれぞれ55.9%と68.7%でした。"),
  heading("alignment", "GPT‑6 Astra のアラインメントとデプロイを責任を持って行う"),
  paragraph("Astra は、OpenAI がこれまでに開発した中で最もアライメントに優れたモデルです。Astra は、慎重に対応し、タスクの範囲を尊重し、透明性のあるコミュニケーションを行うことに優れています。この成果は、最初から最後まで人間の意図に沿い続けるモデルのトレーニングに取り組んできた、OpenAI の長期的な研究プログラムから生まれた最新の成果です。"),
  paragraph("慎重な対応が求められる環境では、Astra はリスクに応じて慎重に処理を進めます。不適切な挙動を引き出すよう敵対的に選定されたコンピューター使用タスクの評価において、Astra は意図しない結果を回避する点でより高い成功率を示しました。デフォルトで提供される追加のセキュリティ対策を有効にして実行したところ、さらに高いパフォーマンスが得られました。"),
  paragraph("Astra は、ユーザーが設定し、環境によって暗黙的に定められた境界内で動作する可能性も高くなっています。社内評価では、Astra が Codex Auto-Review による拒否を回避しようとしたことは一度もありませんでした。この結果は、Auto-review が意図的に回避可能に設定され、それ以外の方法ではタスクを完了できない場合でも変わりませんでした。"),
  charts("alignment"),
  paragraph("Astra はさらに、透明性の高いユーザーコミュニケーションにおいて新たな基準を打ち立てています。ある評価では、Astra が GPT‑5.6 Sol と比べて、自らの能力や利用可能な機能について不正確な説明をする確率は3分の1でした。"),
  paragraph("評価の結果、Astra が記述する推論は GPT‑5.6 Sol よりも監視が難しいことがわかりました。これは、監視を回避するよう明示的に指示したテストに基づく結果です。これは、Astra がより単純なタスクでは記述する推論をより適切に制御でき、より少ないステップで問題を解決できるためだと考えています。Astra は依然として、複雑なタスクに必要な推論を隠すことには苦慮しているように見えますが、OpenAI は監視可能性の低下を重く受け止めています。"),
  heading("availability", "提供状況"),
  paragraph("GPT‑6 Astra は本日より一部の組織向けに提供を開始し、今後数日以内に、すべての ChatGPT Plus、Pro、Business、Enterprise ユーザーに加え、OpenAI API、Microsoft Azure、AWS Bedrock を通じても利用可能になります。Astra の利用分は、既存のサブスクリプションの利用枠に含まれます。ユーザーおよび企業は、追加利用のためのクレジットを購入することもできます。Pro、Business、Enterprise プランのユーザーも、GPT‑6 Astra Pro を利用できるようになります。Enterprise 管理者はワークスペースで Astra を有効にできます。リリース時点では、アクセスはデフォルトで無効になっています。"),
  paragraph("Astra は、対象となる API 顧客向けにゼロデータ保持をサポートしており、先月お伝えしたとおり、顧客のプライバシーを保護しながら安全性モニタリングを強化するために、プライベート・セーフティ処理をテストしています。"),
  paragraph("開発者向けには、GPT‑6 Astra は OpenAI API で gpt-6-astra として利用でき、Microsoft Azure および Amazon Bedrock 経由でも利用できます。"),
  paragraph("OpenAI API Standard の料金は、入力100万トークンあたり$10、出力100万トークンあたり$50です。キャッシュの読み取りと書き込みには、それぞれ別の料金が適用されます。API では GPT‑6 Astra の高速モードを利用でき、Standard の最大 2 倍の処理速度を、Standard の 2 倍の料金で提供します。"),
];
