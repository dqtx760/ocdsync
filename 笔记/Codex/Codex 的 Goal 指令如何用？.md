---
title: Codex 的 Goal 指令如何用？
time: 2026-06-07
tags:
  - codex
---
## 1. `/goal` 是什么



`/goal` 是 Codex 的“目标模式”入口。如果你用的中文界面 需要输入 `/目标` 使用。



普通 prompt 通常是一次性的：你要求模型做一件事，模型计划、执行、回答，然后停下。

`/goal` 则把当前 Codex 线程绑定到一个持久目标上：**Codex 会围绕这个目标持续规划、执行、检查、修正，并在认为目标已经被证据证明完成、被阻塞、被暂停、被清除或达到预算/使用限制时停止。**



OpenAI 官方把它定义为一种“跟随目标”的工作流：当任务需要跨多轮执行、直到达到可验证的停止条件时使用。

典型任务包括迁移、重构、部署重试循环、实验、性能优化、研究复现、报告产出等。



官方强调：`/goal` 最适合“**终点清楚但路径不确定**”的工作。

也就是说，你不需要知道每一步怎么做，但必须知道最终如何判断它做完了。



因此，`/goal` 的核心不是“让 Codex 多跑一会儿”，而是把任务改写成一份“完成契约”：



* 要达成什么结果

* 用什么证据证明结果已达成

* 不能改变什么

* 能在哪些范围内行动

* 如果失败、卡住或需要人工决定，应该怎么停止

* 每轮尝试后应该如何记录、回顾、继续。



如果 goal 写得好，Codex 会有一个稳定的北极星。

它可以在上下文变长、线程持续运行、工具调用很多的情况下，仍然回到同一个可验证目标上。



如果 goal 写得差，例如“优化一下性能”“整理代码”“把项目做好”，Codex 可能出现两个相反的问题：过早宣布完成，或者无限尝试而不知道何时停。



### 1.1 `/goal` 与普通 prompt 的差别



| **维度** | **普通 prompt**        | **`/goal`**              |
| ------ | -------------------- | ------------------------ |
| 持续性    | 通常只处理当前回合            | 目标持久存在于线程状态中             |
| 停止依据   | 回答完或工具调用完就停          | 根据目标完成、暂停、清除、阻塞、预算等状态停止  |
| 适合任务   | 简短解释、局部编辑、代码审查、一次性问答 | 长任务、多轮调试、多次测试、多文件修改、实验循环 |
| 用户需要提供 | 问题或任务                | 目标、验证面、约束、边界、迭代策略、阻塞条件   |
| 风险     | 可能遗漏上下文              | 可能消耗较多预算或在模糊目标上循环        |
| 最佳实践   | 清楚说明需求               | 把“完成条件”写成可审计证据           |



### 1.2 一句话判断法



当你准备输入一个任务时，可以问自己：

> 这个任务是否需要 Codex 在多轮中自主选择下一步，并且有一个可测试、可审计、可停止的完成条件？

如果答案是“是”，考虑用 `/goal`。如果答案是“只是解释一下”“改一行”“给我一个建议”，通常不要用。



## 2. 可用入口、版本、启用方式与生命周期命令

Goal 指令现在可以在 Codex App、IDE 扩展与 CLI 中可用。

### 2.1 三种入口

#### Codex CLI

在 Codex CLI 中，`/goal` 是 slash command 之一。常用形式如下：

```plain&#x20;text
/goal <objective>
/goal
/goal pause
/goal resume
/goal clear
```



* `/goal <objective>`：设置目标。

* `/goal`：查看当前 goal 状态或进入 goal 管理语义。

* `/goal pause`：暂停当前目标。

* `/goal resume`：恢复暂停的目标。

* `/goal clear`：清除当前目标。



官方提到，如果 slash command 在当前 turn 进行时输入，它会排队，并在当前 turn 完成后解析。



这个细节很重要：不要误以为输入了 `/goal pause` 就一定会立刻中断正在执行的工具调用；

它可能要等当前安全边界或当前回合结束后生效。



#### Codex App

Codex App 中可以在 composer 输入 `/goal`，也可能提供“设置为目标”的 UI 操作。

官方 App 命令文档说明：如果 `/goal` 不出现，可在配置中启用 `features.goals = true`；

App 中还有进度控件，可暂停、恢复、编辑、清除目标。



官方 Prompting 文档建议：**当目标不好定义时，可以先使用 `/plan`，让 Codex 帮你把目标草拟出来，再把计划压缩成 goal。**



#### IDE 扩展

IDE 扩展也支持 `/goal`。

它适合“人在代码上下文中监督，Codex 持续执行”的场景，例如迁移、测试修复、样式规范改造、重构、文档同步等。

IDE 模式的优势是上下文贴近编辑器，劣势是用户可能更容易在运行中手动改代码，因此更要保持 clean branch 和明确 diff review。



### 2.2 启用方式

如果 `/goal` 不可见，可以尝试：

```toml
# ~/.codex/config.toml 或项目级 .codex/config.toml
[features]
goals = true
```

或在 CLI 中运行：

```bash
codex features enable goals
```



配置文件通常位于用户目录的 `~/.codex/config.toml`，也可以在项目目录下放 `.codex/config.toml`。



### 2.3 生命周期状态



公开资料中反复出现以下状态或停止情形：

* **active**：目标正在执行或可继续。

* **paused**：用户暂停。

* **complete**：Codex 认为目标已通过证据完成。

* **blocked**：缺少权限、信息、外部服务、人工确认，无法继续。

* **budget\_limited**：达到 token budget 或预算限制。

* **usage\_limited**：达到硬性使用限制或配额错误。

* **cleared**：目标被清除。

* **interrupted**：线程、工具、网络或用户动作中断。



对于长任务，最容易误解的是 `budget_limited`。

它不等于失败，也不等于完成，只说明预算到了。

正确产物应该包括：已经完成什么、还差什么、当前证据、下一步建议、风险和阻塞项。



### 2.4 App Server API

OpenAI Codex 的 app-server README 与官方 App Server 文档公开了 goal 相关接口，例如：

* `thread/goal/set`

* `thread/goal/get`

* `thread/goal/clear`

* `thread/goal/updated`

* `thread/goal/cleared`



文档还提到 objective 非空且有最大长度限制，`tokenBudget` 可用于预算控制。

设置新 objective 会替换当前 goal，并重置使用量计数。



这个信息对工具集成、内部平台或研发效能团队有价值：如果你要把 `/goal` 纳入自研工作台，不要只把它当作一条聊天消息，而要把 goal 状态、预算、阻塞状态、完成证据都作为一等对象管理。



## 3. 底层心智模型：从 prompt 到“完成契约”

### 3.1 goal 文本同时是起始 prompt 与完成标准



官方指出，goal 文本既是起始 prompt，也是完成标准。

这意味着一个好 goal 必须同时满足两件事：

1. 让 Codex 知道第一步该做什么

2. 让 Codex 在若干轮后能判断“是否真的做完”



很多人只写第一件事，不写第二件事。例如：

```plain&#x20;text
/goal Improve checkout performance.
```



这句话告诉了方向，但没有告诉终点。

Codex 不知道目标是 p95 下降 10%、接口错误率下降、前端首屏时间下降，还是数据库查询次数减少。

更糟糕的是，它也不知道应该跑哪个 benchmark、不能改哪些业务逻辑、是否允许引入缓存、是否允许改接口契约。



更好的写法是：

```plain&#x20;text
/goal Reduce checkout benchmark p95 latency below 120 ms, measured by `npm run bench:checkout`.
Keep all existing tests passing with `npm test`.
Do not change public API schemas or payment semantics.
Make focused changes, rerun the benchmark after each meaningful change, and stop only when the benchmark output and test output prove the target.
If the target cannot be met after 5 focused attempts, pause and report the bottleneck, attempted changes, and best observed p95.
```

这段 goal 同时定义了结果、验证方式、限制、迭代策略和停止条件。



### 3.2 “证据式完成”比“模型觉得完成”可靠



Codex 的公开prompt 中有一条关键思路：

* 在标记 goal 完成前，要根据当前状态做审计

* 将目标拆成交付物和成功标准

* 检查文件、命令、测试、PR 状态

* 把不确定性视为未完成

* 只有证据支持完成时才更新 goal。



这个设计说明：`/goal` 的正确用法让它“拿出可复核证据”。



可复核证据可以是：

* 测试命令输出；

* benchmark 输出；

* lint/typecheck/build 输出；

* 覆盖率报告；

* 生成文件路径；

* 差异摘要；

* 截图或渲染产物；

* 数据分析脚本与结果表；

* Sentry/Linear/GitHub/Gmail 等外部系统的查询摘要；

* 由脚本生成的 JSON、CSV、HTML、Markdown 报告；

* 用户指定 checklist 的勾选状态。



### 3.3 continuation 是“事件驱动”，不是无限后台进程



Cookbook 说 Goal continuation 从安全的 idle thread 边界继续；

如果某个 continuation turn 没有工具调用，下一次自动 continuation 会被抑制；

plan-only 工作不触发 continuation。



这意味着你不应该把 `/goal` 理解成不受控制的后台守护进程 daemon。

它更像一个带目标状态的 agent loop：**每次有机会继续时，Codex 会基于目标和当前状态选择下一步；如果没有可执行动作、缺少信息或需要人类判断，它应该停下或标记阻塞。**



这对实际使用有两个启发：

* 对纯规划任务，先用 `/plan`，等计划足够清晰再开 `/goal`；

* 对需要持续工具调用的任务，在 goal 中明确允许的命令、验证脚本和产物路径，否则 Codex 可能无从继续。



### 3.4 goal 是线程状态，不是全局记忆

Goal 的目标保存在当前线程状态中。

它不是全局偏好，也不是项目永久规则，因此：

* 不要指望另一个线程知道当前 goal；

* **需要跨线程复用时，把目标写进仓库文件，例如 `GOAL.md`、`PLAN.md`、`EXPERIMENTS.md`；**

* 如**果目标完成后要作为团队规范沉淀，转成 `AGENTS.md`、README、测试脚本或 CI 配置**



## 4. 什么时候应该用 `/goal`，什么时候不要用

### 4.1 适合 `/goal` 的任务

#### 任务 1：终点明确但路径未知

例如“把 checkout benchmark p95 降到 120ms 以下”。

你知道成功指标，但不知道该优化数据库、缓存、并发、序列化还是前端渲染。

Codex 可以探索、测试、比较、继续。



#### 任务 2：需要多轮工具调用

例如“修复所有 CI 失败并打开 PR”。

这可能涉及运行测试、读日志、改代码、再跑测试、处理 flaky test、更新 snapshot。

普通 prompt 往往一轮不够，`/goal` 更合适。



#### 任务 3：需要自己发现工作清单

例如“把项目从 JavaScript 迁移到 TypeScript strict mode”。

Codex 需要扫描仓库、识别 tsconfig、逐步修错、跑 typecheck、处理测试。



#### 任务 4：有可机读验证面

例如测试、lint、benchmark、coverage、eval script、数据校验、报告生成脚本。

**可机读验证越强，`/goal` 越可靠。**



#### 任务 5：需要长时间但仍可审计



官方提到 Goal mode 可驱动数小时甚至数天的工作。

这个能力适合迁移、研究复现、长期实验、错误清理、数据清洗等。



**但“可运行很久”不是使用理由。真正理由是“持续运行仍能被证据约束”。**



### 4.2 不适合 `/goal` 的任务

#### 一句话修改

例如“把按钮文案从 Submit 改成 Save”。这类任务直接 prompt 更快。



#### 简单解释或阅读

例如“解释这个函数做什么”。不需要持久目标。



#### 完成条件模糊

例如“让代码更优雅”“把产品体验做好”“帮我想一个增长策略”。

除非你先把它转成可验证目标，否则不适合。



#### 主要依赖人类审美或商业判断

例如“设计最好的定价策略”“决定下一季度战略”。

Codex 可以生成分析、方案和对比表，但不应该自动“完成”需要负责人拍板的决策。



#### 高风险生产操作

例如删除生产数据、改权限、发邮件给大量用户、关闭告警、合并 PR、部署到生产。

可以让 Codex 准备草稿、报告、PR 或命令建议，但应明确“不得执行，必须等待人工批准”。



## 5. 官方与社区案例

### 5.1 官方：Deep Hedging 研究复现



OpenAI Cookbook 记录了一个研究复现案例：目标是让 Codex 重现或近似复现 Deep Hedging 相关论文结果。

Codex 的做法不是简单声称复现成功，而是把 claims 分成 headline claims 与 supporting claims，重建可测试部分。

对无法验证或缺少信息的 claim 标记 blocked，并在最终报告中区分“近似复现成功”的部分与“仍有不确定性/阻塞”的部分。



这个案例说明 `/goal` 不只适合写代码，也适合研究型、证据型任务。

关键是 goal 中要允许 Codex：

* 阅读论文与现有代码；

* 建立可运行实验；

* 区分可验证结论与无法验证结论；

* 记录实验命令、参数、输出；

* 在缺少数据、训练成本过高、指标不可比时停止并说明原因。



一个适合研究复现的 goal 不是“复现这篇论文”，而是：

```plain&#x20;text
/goal Reproduce the main quantitative claims in `paper.pdf` as far as this workspace allows.
Create a claim checklist that separates headline claims, supporting claims, and blocked claims.
For each claim, identify the required data/code/metric, implement the smallest runnable reproduction, run it, and record evidence in `reproduction_report.md`.
Do not claim a result is reproduced unless the report includes the command, parameters, output, and comparison against the paper.
If a claim depends on unavailable data, excessive compute, or ambiguous methodology, mark it blocked with the exact reason.
```



### 5.2 社区：Claire Vo 的长任务案例

Lenny’s Podcast 与相关总结记录了 OpenAI 的 Claire Vo 分享的多个 `/goal` 使用案例：

一次编码任务运行约 5 小时 45 分钟；清理 Sentry/Vercel API 错误；把约 3,900 封邮件清理到 68 封；整理 Linear 任务。



这些例子跨越工程与知识工作，说明 `/goal` 的价值不是“代码生成”，而是“长流程清理与收敛”。

#### Sentry 错误清理

场景：生产系统中存在大量 Sentry 错误。

普通 prompt 可以让 Codex 看一个错误并修一个点，但 `/goal` 可以把它变成批处理闭环：

1. 拉取错误列表；

2. 按根因聚类；

3) 找到对应代码路径；

4) 先修最高频/最高影响错误；

5. 运行测试；

6. 回放历史事件或复现脚本；

7) 直到错误归零或剩余错误被标记为需人工处理。



这个案例的启发是：不要把 goal 写成“修复 Sentry 错误”，而要写成“用 Sentry issue list 作为输入、用每个 issue 的状态/事件回放/测试通过作为输出证据”。



#### 邮件清理

场景：把 3,900 封邮件清理到 68 封。这个案例不是写代码，而是“信息整理”。

可迁移到产品经理的 inbox triage、客户反馈清理、需求池去重、Slack thread 归档等。



好的 goal 要写清楚：

* 哪些邮件可以归档；

* 哪些必须保留；

* 哪些需要草拟回复但不能发送；

* 哪些要打标签；

* 哪些需要人工确认；

* 最终报告要列出保留原因。



#### Linear 任务整理

场景：清理 Linear backlog，把旧任务关闭、把未来仍有效的任务保留或重写。

这里最容易出错的是“自动关闭仍然重要的任务”。

因此 goal 要强调：只做草案、保留未来相关任务、标记不确定项、不要未经批准关闭真实 issue，除非用户明确授权。



### 5.3 社区：Chris Hayduk 的 checklist 和实验记录技巧



一篇 LinkedIn 经验贴强调了两个实用技巧：

1. **把复杂目标变成 Checklist，例如论文格式转换时使用 200+ 条规则清单；**

2. 对实验类任务使用 `PLAN.md`、`EXPERIMENTS.md`、`EXPERIMENT_NOTES.md` 等持久文件记录计划、尝试、结果和未解问题。



**对于 `/goal`，外部文件比聊天上下文更稳定：上下文可能压缩，线程可能变长，但 `EXPERIMENTS.md` 是可复查、可 diff、可交接的。**



### 5.4 社区：J.D. Hodges 的 goal 质量五点



一篇社区实践文章给出一个简洁判断法：好的 goal 要包含可度量 artifact、验证命令、允许写入范围、停止条件、暂停条件。



这个框架非常适合团队培训，因为它可以被做成 code review 前的检查表。

例如差 goal：

```plain&#x20;text
/goal improve auth
```



好 goal：

```plain&#x20;text
/goal Increase backend auth package test coverage to at least 85%.
Verification: `npm run test:coverage -- packages/auth`.
Allowed writes: `packages/auth/**`, `test/**`, and coverage-related config only.
Do not change public auth behavior or token formats.
Stop when coverage output shows >=85% and all auth tests pass.
Pause if a behavior change seems required or if 3 attempts fail to improve coverage.
```



## 6. 高质量 goal 的六要素

OpenAI 明确提出，最强的 goals 往往定义六件事：Outcome、Verification surface、Constraints、Boundaries、Iteration policy、Blocked stop condition。



下面把这六要素转成中文可执行框架。

### 6.1 Outcome：结果

Outcome 是“最终世界状态”，不是“做事动作”。 &#x20;

差写法：

```plain&#x20;text
/goal Look into performance.
```

好写法：

```plain&#x20;text
/goal Reduce checkout benchmark p95 latency below 120 ms.
```

区别在于：前者是探索动作，后者是目标状态。

**`/goal` 可以包含探索，但必须服务于目标状态。**



### 6.2 Verification surface：验证面



验证面是“如何证明完成”。

它可以是命令、脚本、报告、数据、界面检查或外部系统状态。



常见验证面：

```plain&#x20;text
npm test
npm run typecheck
npm run lint
npm run bench:checkout
pytest tests/payments
cargo test
go test ./...
pnpm build
python scripts/evaluate.py --json
coverage/lcov-report/index.html
reports/analysis.md
```



验证面最好满足三点：

1. Codex 能运行或读取；

2. 输出足够明确；

3) 人类能复核。



如果验证面不存在，可以先让 Codex 创建验证脚本，但 goal 要写清楚脚本的标准。例如：

```plain&#x20;text
Before changing production code, create `scripts/evaluate_recommendations.py` that computes precision, recall, and coverage on `fixtures/reco_eval.csv`.
Use that script as the stopping rule for subsequent iterations.
```



### 6.3 Constraints：约束

约束说明“不能为了达成指标而破坏什么”。

常见约束包括：

* 不改变公开 API；

* 不改变数据库 schema；

* 不降低测试覆盖率；

* 不绕过安全校验；

* 不禁用失败测试；

* 不修改生成文件；

* 不引入新依赖；

* 不访问生产系统；

* 不发送邮件或外部消息；

* 不关闭真实 issue；

* 不进行 destructive operation。



**没有约束的 goal 会诱导“投机取巧”。**

例如性能优化中，Codex 可能删除耗时代码；测试修复中，Codex 可能跳过测试；coverage 提升中，Codex 可能写无意义测试。

约束就是防止这些捷径。

### 6.4 Boundaries：边界



边界说明“可以动哪里、不能动哪里”，它比约束更具体。

例如：

```plain&#x20;text
Allowed writes:
- `packages/checkout/**`
- `tests/checkout/**`
- `scripts/bench/**`

Do not edit:
- `packages/payments/contracts/**`
- database migrations
- generated API clients
- production deployment configs
```



边界对大型仓库尤其重要。

没有边界，Codex 可能为了让测试通过而修改共享模块，引入更大风险。

### 6.5 Iteration policy：迭代策略



Iteration policy 说明“每轮怎么做”。这对长任务非常关键。

好的迭代策略示例：

```plain&#x20;text
Make one focused change at a time.
After each meaningful change, run the smallest relevant test first, then the full verification command.
Log each attempt in `GOAL_PROGRESS.md` with:
- hypothesis
- files changed
- command run
- result
- next step
Do not repeat an identical failed approach.
```



对于实验类任务，可进一步要求：

```plain&#x20;text
Keep `EXPERIMENTS.md` updated after every run.
Track parameters, seed, metric, artifact path, and interpretation.
Prefer small sample data for rapid iteration; only run full data after the small loop passes.
```

### 6.6 Blocked stop condition：阻塞停止条件



Blocked stop condition 说明“什么时候不要继续猜”。

这能显著降低浪费预算和误操作风险。

例子：

```plain&#x20;text
Pause and report if:
- required credentials are missing;
- a production write would be needed;
- the target requires a business decision;
- more than 3 focused attempts fail with no improvement;
- tests are blocked by external services;
- deleting files, closing tickets, sending messages, or deploying would be required.
```

阻塞不是失败。

好的 `/goal` 会把“无法继续”变成高质量的交接报告。



## 7. 使用场景地图：工程、数据、知识工作、产品管理

### 7.1 性能优化

#### 场景

* 降低 API p95/p99；

* 降低页面 TTI/LCP；

* 降低数据库查询次数；

* 降低内存占用；

* 缩短 CI 时间；

* 优化批处理任务耗时。



#### 为什么适合 `/goal`

性能优化通常路径不确定，但验证面明确。

Codex 可以提出假设、改一处、跑 benchmark、比较结果、继续。目标必须有数字阈值和测量命令。



#### 注意事项

* 明确 baseline；

* 固定测试数据；

* 避免只看一次 benchmark；

* 防止通过删除功能“优化”；

* 要求保留性能日志；

* 如果波动大，要求多次运行取中位数或均值。



### 7.2 测试修复与 flaky test 消除

#### 场景

* CI 红了但原因分散；

* 多个 snapshot 失败；

* flaky test 影响发布；

* 端到端测试偶发失败；

* 升级依赖后测试大面积失败。

#### 为什么适合 `/goal`

Codex 可以读取 CI 日志、定位最小失败集、修复、重跑、记录。

goal 应要求“不能跳过测试、不能降低断言强度、不能隐藏错误”。



#### 验证面

```plain&#x20;text
npm test
pytest -q
pnpm test:e2e --grep checkout
gh run view --log-failed
```

### 7.3 迁移与重构

#### 场景

* JavaScript 到 TypeScript strict；

* CommonJS 到 ESM；

* callbacks 到 async/await；

* React class components 到 hooks；

* 旧 API client 到新 SDK；

* CSS 方案迁移；

* monorepo 包结构调整。



#### 为什么适合 `/goal`

迁移任务通常由很多小错误组成，每一步都能通过 typecheck、lint、test 验证。

`/goal` 可以逐步扫清错误，而不是一次性生成大 patch。



#### 注意事项

* 强制小批量；

* 每轮运行最相关命令；

* 不要同时重构业务逻辑；

* 对公开 API 和数据结构设边界；

* 要求生成 migration notes。



### 7.4 覆盖率提升

#### 场景

* 某模块覆盖率低于团队阈值；

* 新功能缺少测试；

* 关键路径需要回归测试；

* 需要生成 contract tests。



#### 为什么适合 `/goal`

覆盖率有明确数字，但容易被“无意义测试”刷指标。

因此 goal 需要强调行为覆盖、边界条件、错误路径，以及不得修改生产代码以迎合测试。



### 7.5 Bug triage 与告警清理

OpenAI 官方“Automate bug triage”用例建议让 Codex 检查 Sentry、Slack、Linear、GitHub、PR checks、support tickets、logs 等来源，输出按 P0-P3 排序的 bug 列表，并把观察证据和猜测分开。



这类任务可以先用普通线程调优报告格式，再转成 automation。若需要从“triage”升级到“修复”，`/goal` 可以承接高优先级 bug 的修复闭环。



### 7.6 研究复现与实验循环

#### 场景

* 复现论文结果；

* 改进模型或算法；

* 运行 eval-driven loop；

* 比较多个实现；

* 生成实验报告。



OpenAI 官方“Iterate on difficult problems”用例强调：难题需要 tight evaluation loop，最好有 deterministic checks 与 LLM-as-a-judge 补充；每轮记录分数、变化、变好/变差、下一步。

`/goal` 很适合把这种流程持久化。



#### 关键技巧

* 先建立 eval 脚本；

* 指标机读化；

* 每轮只改一个变量；

* 保留 artifact；

* 不只看日志，要检查产物；

* 不达到阈值不停止，除非明确阻塞。

### 7.7 数据清洗与报告产出

OpenAI 官方“Analyze datasets and ship reports”用例建议 Codex 清洗数据、join sources、探索假设、建模并打包成可复用 artifact。

对产品经理和分析师来说，这类 goal 非常实用：

```plain&#x20;text
/goal Produce a reproducible analysis report answering whether activation rate dropped after the onboarding change.
Inputs: `data/events_may.csv`, `data/events_june.csv`, and `docs/onboarding_release_notes.md`.
Verification: create `analysis/activation_report.md`, `analysis/activation_charts/`, and a runnable script `analysis/run_activation_analysis.py`.
Constraints: do not invent missing values; document data quality issues; separate correlation from causation; include SQL/Python commands used.
Pause if required data is missing or join keys are ambiguous.
```

### 7.8 文档与规范同步

#### 场景

* API 变化后同步 README；

* 生成 migration guide；

* 检查 docs 与代码是否一致；

* 更新 OpenAPI examples；

* 给新服务补充 runbook。



适合 `/goal` 的前提是可验证：文档链接是否存在、示例是否能运行、命令是否正确、文档覆盖哪些 API。



### 7.9 需求池、邮件、任务管理



社区案例已经显示 `/goal` 可用于 Gmail/Linear 类知识工作。

产品经理可以借鉴：

* 清理 6 个月未更新的 backlog；

* 合并重复需求；

* 标记“不会做/需要验证/已在路线图/需要销售确认”；

* 为每个候选需求生成证据摘要；

* 草拟用户回复或内部说明，但不自动发送；

* 输出最终表格供人 review。



这类任务的关键是权限与动作策略。

默认应让 Codex“只读、草拟、标记建议”，而不是直接关闭、删除、发送或变更真实系统。



## 8. 可直接复制的 `/goal` 模板库



以下模板可以直接复制。建议把方括号替换成项目真实命令、路径、系统名、阈值。

对于代码仓库，英文路径和命令保持原样；业务说明可用中文。

### 8.1 性能优化模板

```plain&#x20;text
/goal Reduce [service/page/job] p95 latency from the current baseline to below [target] using [benchmark command].
Before changing code, run the benchmark once and record the baseline in `GOAL_PROGRESS.md`.
Allowed writes: [paths].
Do not change public API contracts, database schema, auth behavior, or user-visible semantics.
Make one focused change at a time. After each meaningful change, rerun the smallest relevant test and then the benchmark.
Stop only when:
1. benchmark output shows p95 < [target] for [N] runs or a stable median;
2. `npm test` and `npm run typecheck` pass;
3. `GOAL_PROGRESS.md` records baseline, attempts, final evidence, and risks.
Pause if 5 focused attempts fail to improve p95 or if production-only credentials are required.
```

### 8.2 TypeScript strict 迁移模板

```plain&#x20;text
/goal Migrate [package/app] to TypeScript strict mode.
Outcome: `tsconfig.json` has `"strict": true` for [scope], and `npm run typecheck -- [scope]` passes.
Allowed writes: [src paths], [test paths], tsconfig files, and minimal type declarations.
Do not change runtime behavior, public API contracts, generated clients, or database migrations.
Process:
1. run current typecheck and list error categories;
2. fix errors in small batches;
3. after each batch, rerun typecheck;
4. run unit tests before completion;
5. update `migration_notes.md` with major decisions.
Pause if a type error reveals ambiguous business semantics requiring human decision.
```

### 8.3 flaky test 修复模板

```plain&#x20;text
/goal Identify and fix flaky tests in [suite] so that `[command]` passes [N] consecutive runs locally.
Do not skip, delete, weaken, or mark tests flaky unless explicitly justified and approved.
Allowed writes: tests, test helpers, deterministic seeding/time mocks, and code directly responsible for nondeterminism.
First reproduce the failure by running `[command]` repeatedly or using the provided CI logs.
For each suspected flaky test, record:
- failure signature;
- root cause hypothesis;
- fix;
- verification command and output.
Stop only after [N] consecutive successful runs and a summary in `flaky_test_report.md`.
Pause if the failure depends on external services or credentials not available locally.
```

### 8.4 Sentry 错误清理模板

```plain&#x20;text
/goal Burn down the current high-volume Sentry issues for [project/service] without changing production configuration.
Inputs: [Sentry project/link/export], [repo path], [time window].
Outcome: every issue in the selected list is either fixed with evidence, deduplicated under a fixed root cause, or marked blocked with reason.
Verification:
- relevant tests pass;
- each fixed issue has code reference, test/command output, and Sentry issue link or event example;
- `sentry_burndown_report.md` lists before/after status.
Constraints:
- do not deploy, close, ignore, or resolve Sentry issues without explicit approval;
- do not silence errors by swallowing exceptions unless behavior is documented and tested.
Pause if production credentials, deployment, or business judgment is required.
```

### 8.5 覆盖率提升模板

```plain&#x20;text
/goal Increase test coverage for [module] to at least [threshold]% while adding meaningful behavior tests.
Verification: `[coverage command]` shows [threshold]%+ for [module], and all existing tests pass.
Allowed writes: tests under [paths], test fixtures, and minimal test utilities.
Do not change production behavior merely to improve coverage.
Prioritize tests for:
1. successful path;
2. error path;
3. boundary cases;
4. permission/auth cases;
5. regression cases from recent bugs.
Stop only when coverage report and test output prove completion.
Pause if coverage tooling is broken or if required behavior is ambiguous.
```

### 8.6 依赖升级模板

```plain&#x20;text
/goal Upgrade [dependency] from [current version] to [target version] in [repo/package].
Outcome: dependency is updated, lockfile is consistent, build/test/typecheck pass, and migration notes are written.
Allowed writes: package manifests, lockfiles, code required by documented breaking changes, tests, and `upgrade_notes.md`.
Do not upgrade unrelated dependencies.
Process:
1. inspect release notes/changelog if available;
2. update dependency;
3. run install;
4. fix compilation/test failures in focused batches;
5. record breaking changes and code changes.
Pause if the upgrade requires product/API decisions or external service credentials.
```

### 8.7 安全审计模板

```plain&#x20;text
/goal Audit [repo/package] for exposure to [advisory/CVE/package incident] and produce a read-only risk report.
Do not modify code, dependencies, tickets, or production systems unless I explicitly approve later.
Inputs: [advisory link], [lockfile paths], [deployment/service inventory].
Output: `security_audit_report.md` with:
- affected packages and versions;
- reachable usage paths;
- severity and exploitability assessment;
- recommended remediation;
- evidence links and commands used;
- unknowns or blocked checks.
Pause if private registry access or production inventory is required.
```

### 8.8 文档同步模板

```plain&#x20;text
/goal Bring docs for [feature/API] up to date with the current implementation.
Inputs: [source paths], [docs paths], [OpenAPI/schema paths].
Outcome:
- README/docs describe the current behavior;
- examples compile or pass documented smoke checks;
- broken links are fixed;
- `docs_update_summary.md` lists changed sections and verification.
Constraints:
- do not change runtime code unless a doc example cannot work due to an obvious typo in sample code;
- do not invent behavior not present in code.
Verification: run [docs build command], [example test command], and link checker if available.
Pause if product behavior is ambiguous or undocumented.
```

### 8.9 研究复现模板

```plain&#x20;text
/goal Reproduce the key claims in [paper/report] as far as this workspace allows.
Create `CLAIMS.md` with headline claims, supporting claims, required data/code/metric, and status.
For each claim:
- identify the closest runnable experiment;
- implement the smallest reproduction;
- run it;
- save commands, parameters, outputs, and artifacts;
- compare against the source claim.
Output `reproduction_report.md` distinguishing reproduced, approximate, contradicted, and blocked claims.
Constraints:
- do not overstate results;
- do not treat missing data as success;
- record compute limits and random seeds.
Pause if required data or compute is unavailable.
```

### 8.10 数据分析报告模板

```plain&#x20;text
/goal Produce a reproducible analysis answering: [business question].
Inputs: [CSV/warehouse export/notebook paths].
Outcome:
- `analysis/run.py` or notebook with reproducible steps;
- `analysis/report.md` with executive summary, methods, charts, caveats, and recommendations;
- chart files under `analysis/figures/`;
- data quality notes.
Constraints:
- do not invent missing values or join keys;
- separate observed evidence from causal claims;
- prefer saved scripts/artifacts over one-off notebook state.
Verification: rerun the analysis from a clean state and confirm outputs are regenerated.
Pause if key columns, definitions, or business rules are ambiguous.
```

### 8.11 邮件清理模板

```plain&#x20;text
/goal Triage my inbox for [scope/time window] and reduce it to only messages requiring human action.
Action policy:
- You may label/archive only if explicitly allowed below.
- Do not send emails.
- Draft replies only.
Classification:
1. Needs my reply;
2. Waiting on someone else;
3. FYI/archive;
4. Newsletter/promo/archive;
5. Unclear, ask me.
Outcome:
- inbox count reduced to [target] or report why not;
- `inbox_triage_report.md` lists retained messages and reasons;
- draft replies are prepared but not sent.
Pause before deleting, unsubscribing, sending, or making irreversible changes.
```

### 8.12 Linear/Jira backlog 清理模板

```plain&#x20;text
/goal Triage [Linear/Jira] backlog for [team/project/view] and prepare a reviewable cleanup plan.
Do not close, delete, assign, or change status unless I approve.
For each issue, classify:
- keep and clarify;
- duplicate;
- obsolete / recommend close;
- needs PM decision;
- needs engineering estimate;
- already solved.
Output:
- prioritized list of future-relevant issues;
- proposed closures with evidence;
- duplicates grouped under canonical issue;
- draft comments for issues that need clarification.
Pause if product strategy or customer commitment is unclear.
```

### 8.13 产品需求证据整理模板

```plain&#x20;text
/goal Consolidate customer feedback about [theme] from [sources] into a product evidence brief.
Read-only unless I approve writes.
Output `product_evidence_brief.md` with:
- top themes;
- representative customer quotes or summaries;
- affected segments;
- frequency/severity estimate;
- linked evidence;
- open questions;
- suggested next product decisions.
Do not merge unrelated requests.
Do not claim statistical significance unless the data supports it.
Pause if source access is missing or privacy-sensitive data needs special handling.
```

### 8.14 PR 准备模板

```plain&#x20;text
/goal Prepare a reviewable PR for [task] on a fresh branch.
Outcome:
- code changes satisfy [requirements];
- tests/lint/typecheck pass;
- `PR_DESCRIPTION.md` includes summary, test plan, risks, screenshots if relevant;
- no unrelated files changed.
Allowed writes: [paths].
Do not push, open PR, or request reviews unless I explicitly ask.
Pause if requirements conflict or if a destructive migration is needed.
```



## 9. 操作手册：启动前、运行中、完成后

### 9.1 启动前：把环境整理成可审计状态

#### 1. 更新 Codex

确认版本支持 Goal mode。CLI 侧至少应在 0.128.0 之后；

如果 `/goal` 不显示，尝试升级和启用 features。

```bash
codex --version
codex features list
codex features enable goals
```

#### 2. 清理 git 状态



`/goal` 可能改很多文件。

强烈建议：

```bash
git status
git checkout -b codex-goal/<task-name>
# 或者使用 worktree
git worktree add ../repo-goal-task -b codex-goal/<task-name>
```

避免在 dirty repo 上运行长目标。

社区实践也反复提醒：dirty repo 会让 diff review 和回滚变复杂。



#### 3. 明确验证命令

在 goal 里写明：

```plain&#x20;text
Verification:
- npm run lint
- npm run typecheck
- npm test
- npm run bench:checkout
```

如果命令很慢，可以写两层：

```plain&#x20;text
During iteration, run the smallest relevant test first.
Before completion, run the full verification suite.
```

#### 4. 设置写入边界

推荐写法：

```plain&#x20;text
Allowed writes:
- `src/checkout/**`
- `tests/checkout/**`
- `scripts/bench/**`
- `GOAL_PROGRESS.md`

Do not edit:
- `src/payments/contracts/**`
- database migrations
- generated clients
- deployment configs
```

#### 5. 准备持久日志文件

长任务不要只依赖聊天上下文。

建议让 Codex 创建：

* `GOAL_PROGRESS.md`：目标、baseline、尝试、结果、最终证据；

* `PLAN.md`：阶段计划；

* `EXPERIMENTS.md`：实验参数、指标、产物路径；

* `DECISIONS.md`：需要人类确认或已经做出的选择；

* `BLOCKERS.md`：阻塞原因和解法；

* `PR_DESCRIPTION.md`：提交说明。

#### 6. 设置权限与 sandbox

官方 sandbox 文档说明，Codex 的命令会继承 sandbox 与 approval policy。

安全默认值应该是：本地工作区可写、网络和危险操作受限、必要时逐步批准。

不要为了省事直接开最大权限，尤其不要在生产仓库、真实数据、真实外部系统上启用“无人值守可写”。



### 9.2 运行中：监督的是“证据链”，不是每一行代码

运行 `/goal` 后，你的工作不是每一步都插手，而是监督关键边界：

* 它是否在按照目标推进；

* 是否跑了正确命令；

* 是否开始修改不该改的文件；

* 是否重复失败路线；

* 是否把错误隐藏掉；

* 是否保留了进度记录；

* 是否在遇到权限/业务判断时暂停。

可以用轻量 follow-up 调整方向，例如：

```plain&#x20;text
Pause after the next test run and summarize the current diff before more edits.
```

```plain&#x20;text
Narrow the scope to `packages/auth/**`; do not touch shared UI components.
```

```plain&#x20;text
Add a checklist to `GOAL_PROGRESS.md` mapping every requirement to evidence.
```

```plain&#x20;text
Before marking complete, rerun the full verification commands and quote the exact outputs in the final summary.
```



### 9.3 完成后：把“模型完成”转成“人类可合并”

Codex 标记 complete 不代表你应该无审查合并。

完成后建议做：

1. `git diff` 全量审查；

2. 查看 `GOAL_PROGRESS.md` 或报告；

3) 重新运行关键命令；

4) 对高风险代码做人工 review；

5. 检查是否引入新依赖、权限、网络调用；

6. 检查是否修改了不在边界内的文件；

7) 要求 Codex 生成 PR 描述和测试计划；

8) 合并前让 CI 再跑一次。



## 10. 进阶技巧

### 10.1 先 `/plan` 再 `/goal`

如果你无法一次写出好 goal，不要直接 `/goal make this better`。先问：

```plain&#x20;text
/plan Help me turn this vague task into a strong Codex goal.
Interview me for missing success criteria, verification commands, constraints, boundaries, iteration policy, and blocked stop conditions.
Then draft a final `/goal ...` command.
```

等 Codex 问完你，再把 final goal 粘回 `/goal`。

**官方文档也建议：当目标不好定义时先 `/plan`。**

### 10.2 把 checklist 写到文件里

长目标最怕上下文压缩后遗忘细节。

可要求：

```plain&#x20;text
Create `GOAL_CHECKLIST.md` before implementation.
Every requirement must map to one or more evidence items.
Before marking complete, audit the checklist and mark each item as pass/fail/blocked with evidence.
```

Checklist 适合：

* 论文格式规则；

* API migration checklist；

* 安全要求；

* 产品验收标准；

* 设计走查；

* 文档覆盖清单；

* 数据质量清单。

### 10.3 使用“最小反馈循环”

慢反馈会拖垮 goal。官方难题迭代用例强调 tight evaluation loop。

实践中可以写：

```plain&#x20;text
Use the smallest fast verification command during iteration.
Only run the full suite before claiming completion or after changes that affect shared code.
```

例子：

* 先跑单个 test file，再跑全量；

* 先用 1% sample data，再跑全量；

* 先跑 local benchmark，再跑 CI benchmark；

* 先跑 mock Sentry event replay，再检查真实告警；

* 先生成小图/小报告，再渲染完整报告。

### 10.4 每轮只改一个假设

难题优化最怕“同时改十处”。

写进 goal：

```plain&#x20;text
Make one focused change per iteration.
Do not bundle unrelated hypotheses.
If a change worsens the metric, either revert it or explain why it must stay.
```

这让 Codex 能判断哪个动作有效。



### 10.5 让 Codex 保留“最佳版本”

实验类目标可以要求：

```plain&#x20;text
Track current best result in `EXPERIMENTS.md`.
If a new attempt worsens the score, do not overwrite the best artifact.
Keep best artifact under `artifacts/best/` and latest attempt under `artifacts/latest/`.
```

### 10.6 给 goal 加预算阈值



官方 App Server 支持 tokenBudget 一类概念；CLI/界面层的具体控件可能随版本变化。

无论是否能设置系统级预算，都可以在 goal 文本里写行为预算：

```plain&#x20;text
After 5 focused attempts without measurable improvement, pause and report.
Do not start a new broad refactor if the previous two attempts did not improve the target metric.
```

这不是硬性系统预算，但能减少无意义循环。

### 10.7 把“不得执行”写得比“要做什么”更清楚

对外部系统类任务，必须显式写 action policy：

```plain&#x20;text
Read-only unless explicitly approved.
Do not send, post, close, resolve, merge, deploy, delete, unsubscribe, or change permissions.
Draft proposed actions and wait.
```

这类约束对 Gmail、Slack、Linear、GitHub、Sentry、生产环境尤其重要。



### 10.8 使用“证据矩阵”

在最终报告中要求一张表：

| Requirement | Evidence | Command / Link | Status | Notes |
| ----------- | -------- | -------------- | ------ | ----- |

这能强制 Codex 把每个目标映射到证据，减少“整体看起来完成”的错觉。



### 10.9 分解多个 goal，而不是一个超级 goal

差写法：

```plain&#x20;text
/goal Rewrite the whole app, improve performance, add tests, update docs, fix all bugs.
```

更好：

1. `/goal` 修 CI；

2. `/goal` 完成 TypeScript strict；

3) `/goal` 提高 coverage；

4) `/goal` 优化 checkout p95；

5. `/goal` 更新 docs。



**一个 goal 应该大于一个 prompt，小于一个开放 backlog。**

官方 Cookbook 也强调：**好的 goal 比一个 prompt 大，但比开放式 backlog 小。**



### 10.10 用 worktree 并行，但不要让目标互相踩

如果团队想并行跑多个 goal，建议每个 goal 一个 worktree/branch，并明确边界。

不要让两个 goal 修改同一模块，否则合并冲突和测试归因会非常困难。

## 11. 失败模式与排障

### 11.1 `/goal` 不显示



可能原因：

* Codex 版本过旧；

* features 未启用；

* App/IDE/CLI 版本不一致；

* 平台 bug；

* 配置文件不在生效路径；

* slash command picker UI 未刷新。



处理：

```bash
codex --version
codex features list
codex features enable goals
```



检查：

```toml
[features]
goals = true
```



如果仍不显示，重启 App/IDE/CLI，确认配置路径。

公开 GitHub Issues 中也能看到 Windows Desktop 下 `/goal` 缺失或 slash command picker 显示 No commands 的报告；这说明 Goal mode 虽已进入稳定功能，但具体平台 UI 仍可能存在版本差异或 bug。



遇到这类问题时，可尝试 CLI 入口、更新版本、使用“Set as goal”类 UI 操作，或回退到普通 prompt + 手动循环。

### 11.2 goal 总是失败或设置失败



公开 issue 中有用户报告 App 版本下 `/Goal Always Fails`。

这类问题未必是 prompt 写法错误，也可能是版本、平台、app-server、附件、线程状态导致。

建议：

* 用最短 goal 测试功能是否可用；

* 不要第一次就粘贴超长目标；

* 避免把大段附件当作 objective；

* 重启应用；

* 清除当前 goal 后重设；

* 尝试 CLI；

* 确认官方文档中的 objective 长度限制。



### 11.3 goal 不停循环

常见原因：

* 目标没有停止条件；

* 验证命令不稳定；

* 外部服务一直失败；

* Codex 遇到需要人工确认的危险操作但没有正确停下；

* 上下文压缩或 compact 失败导致重复；

* 它把“继续尝试”理解成“永远不要停”。

预防：

```plain&#x20;text
Pause after 5 focused attempts without measurable improvement.
If a command fails for the same infrastructure reason twice, stop and report.
If confirmation is required for delete/deploy/send/close/merge, stop and wait for me.
```

公开 GitHub issue 中有用户报告 `/goal` 因 compact 错误循环并快速消耗 token，也有 issue 报告危险删除确认提示重复出现并消耗 quota。

这些问题说明：长任务必须设置预算、暂停条件和危险操作边界。

### 11.4 goal 过早宣布完成

常见原因：

* goal 只写了“完成任务”，没写证据；

* Codex 改了代码但没跑全量测试；

* 它把局部成功当全局完成；

* 它没有检查所有 acceptance criteria；

* 报告缺少命令输出。



预防：

```plain&#x20;text
Do not mark the goal complete until every item in `GOAL_CHECKLIST.md` is pass or explicitly blocked.
Before completion, run the full verification commands and include exact command outputs in the final summary.
Treat uncertainty as not complete.
```

### 11.5 为了通过测试而破坏真实行为

常见表现：

* skip test；

* 降低断言；

* 删除失败测试；

* mock 掉真正问题；

* 修改业务逻辑绕过边界；

* 捕获异常但不处理；

* 移除日志或告警。



预防：

```plain&#x20;text
Do not skip, delete, weaken, or silence tests.
Do not swallow errors merely to pass tests.
Preserve public behavior.
If a test appears wrong, pause and explain instead of changing it unilaterally.
```

### 11.6 修改范围失控

预防方式是“允许写入路径 + 禁止路径 + diff 审查”三件套。

goal 中必须写 allowed writes，并在完成后检查：

```bash
git diff --name-only
```

如果出现不相关文件，让 Codex 解释原因或回滚。



### 11.7 权限与 sandbox 问题

如果 Codex 需要安装依赖、访问网络、运行数据库、调用外部 API，可能被 sandbox 或 approval policy 拦住。

不要立刻放宽到全权限。先判断：

* 这个操作是否真的必要；

* 是否可以用 fixture/mock/export 替代；

* 是否只需要读权限；

* 是否可以手动提供日志；

* 是否可以在临时环境运行；

* 是否会产生生产副作用。

### 11.8 目标太大

如果一个 goal 超过一天仍没有收敛，通常需要拆分。拆分方法：

* 先修验证命令；

* 再修最小失败集；

* 再迁移一个 package；

* 再扩展到全仓库；

* 最后更新文档和 PR。



### 11.9 数据/知识工作中的误操作



邮件、Linear、Jira、Slack、Sentry、GitHub 等外部系统通常包含不可逆或高影响动作。

默认写：

```plain&#x20;text
Draft-only. Read-only. No external writes without explicit approval.
```

即使工具支持写入，也不要让 goal 自动发送、关闭、删除、合并、部署、退款、修改客户数据。



## 12. 面向产品经理的落地方法



产品经理使用 `/goal` 的关键，是把“模糊的产品愿望”转成“可验证的工作闭环”。

PM 不一定需要写代码，但需要定义 outcome、证据、约束和决策边界。

### 12.1 从需求到 goal 的转换

模糊需求：

```plain&#x20;text
帮我整理一下用户反馈，看看要不要做导出功能。
```

更好的 `/goal`：

```plain&#x20;text
/goal Consolidate user feedback about export functionality from [sources] into `export_feature_evidence.md`.
Read-only only. Do not send messages or edit tickets.
Classify each feedback item by user segment, use case, pain severity, workaround, revenue/account signal, and linked evidence.
Group duplicates and separate direct user evidence from internal guesses.
Output:
1. top 5 use cases;
2. evidence table;
3. opportunity sizing caveats;
4. product decision options;
5. questions requiring PM judgment.
Pause if source access is missing or if privacy-sensitive data needs approval.
```

### 12.2 PM 的 `/goal` 应避免“替你做决策”

Codex 可以整理证据、生成方案、跑分析、清理 backlog，但不应该替 PM 做不可逆决策。

goal 中应写：

```plain&#x20;text
Do not decide roadmap priority.
Do not close customer commitments.
Do not message customers.
Do not change public docs or pricing.
Prepare recommendations and evidence for human review.
```

### 12.3 PM 常用场景

#### 场景 A：需求池去重

```plain&#x20;text
/goal Deduplicate backlog items related to [theme] and produce a reviewable merge plan.
Do not close or edit issues.
Group duplicates under canonical issues, preserve customer evidence, and identify items that should remain separate.
Output `backlog_dedup_plan.md` with issue links, rationale, and proposed actions.
```

#### 场景 B：发布前验收清单

```plain&#x20;text
/goal Audit release readiness for [feature] against `launch_checklist.md`.
Read code, docs, tests, analytics events, and known issues.
Output pass/fail/blocked for each checklist item with evidence.
Do not deploy or change external systems.
Pause if an item requires PM/Legal/Support approval.
```

#### 场景 C：指标异常分析

```plain&#x20;text
/goal Investigate why [metric] changed during [time window] and produce a reproducible analysis report.
Inputs: [dashboard export], [event logs], [release notes].
Output `metric_investigation.md` with timeline, hypotheses, supporting/refuting evidence, caveats, and recommended next checks.
Do not claim causality unless supported by controlled comparison.
Pause if required data definitions are missing.
```

#### 场景 D：竞品资料整理

```plain&#x20;text
/goal Create a competitive evidence brief for [competitor/feature] using the provided sources and public docs.
Output `competitive_brief.md` with feature comparison, pricing/packaging notes, screenshots/links if available, positioning implications, and uncertainties.
Do not scrape behind login or bypass access controls.
Separate sourced facts from interpretation.
```



### 12.4 PM 如何验收 Codex 的结果

PM 验收时不要只看“总结写得像不像”。

要检查：

* 证据链接是否真实；

* 是否混淆事实和推测；

* 是否遗漏关键用户群；

* 是否把少数声音夸大成趋势；

* 是否给出了不可验证的因果判断；

* 是否有隐私/权限问题；

* 是否明确列出需要人工决策的点。

## 13. 团队治理与安全边界

### 13.1 为团队写一份 `AGENTS.md`

`AGENTS.md` 可以告诉 Codex 项目规则。建议包括：

```markdown
# Agent Rules

## Verification
- Run `npm run lint`, `npm run typecheck`, and `npm test` before claiming completion.
- For checkout performance work, run `npm run bench:checkout`.

## Safety
- Do not deploy, merge, push, delete data, rotate secrets, or change production config.
- Do not skip or weaken tests without explicit approval.
- Do not edit generated clients; regenerate them using documented commands.

## Scope
- Prefer small focused changes.
- Keep progress notes in `GOAL_PROGRESS.md` for long-running tasks.

## Dangerous operations
- Ask for explicit confirmation before deleting files, running destructive migrations, or modifying external systems.
```

### 13.2 设定权限默认值

团队可以按风险分层：

| 风险层级 | 允许动作                    | 是否适合 `/goal` 自主执行 |
| ---- | ----------------------- | ----------------- |
| 低风险  | 本地读文件、运行测试、生成报告         | 适合                |
| 中风险  | 修改代码、安装 dev 依赖、生成 PR 草稿 | 适合但需 review       |
| 高风险  | 写外部系统、关闭 issue、发送邮件、部署  | 默认不适合自主执行         |
| 极高风险 | 删除生产数据、修改权限、支付/退款       | 不应自动执行            |

### 13.3 把 goal 产物纳入代码评审

团队可以要求每个长 goal PR 附带：

* 原始 goal；

* `GOAL_PROGRESS.md`；

* 测试命令和输出；

* 风险说明；

* 未完成/blocked 项；

* 人工 review checklist。



### 13.4 指标化管理 `/goal` 使用

对于研发效能团队，可以记录：

* goal 类型；

* 运行时长；

* token/budget；

* 成功/阻塞/失败；

* 改动文件数；

* 测试通过率；

* 人工 review 发现的问题；

* 回滚率；

* 产出 PR 合并率；

* 节省时间估计。



**但不要只追求“运行时间越长越好”。**

**长时间运行只在产生高质量、可审计产物时才有价值。**



## 14. 速查清单

### 14.1 启动 `/goal` 前 10 问

1. 目标是否是最终状态，而不是模糊动作？

2. 是否有明确验证命令或产物？

3) 是否有量化阈值？

4) 是否写了不能改变的业务/安全约束？

5. 是否写了允许写入路径？

6. 是否写了禁止路径？

7) 是否写了每轮迭代方式？

8) 是否写了停止/暂停条件？

9. 是否要求保留进度日志？

10. 是否在 clean branch/worktree 上运行？

### 14.2 好 goal 的最小模板

```plain&#x20;text
/goal [Outcome].
Verification: [commands/artifacts/evidence].
Constraints: [what must not change].
Boundaries: [allowed writes / forbidden paths].
Iteration policy: [one focused change, rerun checks, log progress].
Stop when: [evidence proves completion].
Pause if: [blocked conditions / human decisions / budget cap].
```

### 14.3 不要这样写

```plain&#x20;text
/goal Make the app better.
```

```plain&#x20;text
/goal Fix all bugs.
```

```plain&#x20;text
/goal Refactor everything.
```

```plain&#x20;text
/goal Clean up my work stuff.
```

这些目标都缺少边界、证据和停止条件。



### 14.4 可以这样改写

```plain&#x20;text
/goal Reduce P1 production errors in Sentry project [X] for release [Y] to zero open untriaged issues.
Read-only for Sentry unless I approve.
For each issue, either produce a tested code fix, group it under a duplicate root cause, or mark blocked with reason.
Run [test commands].
Output `sentry_burndown_report.md`.
Pause before resolving/closing/deploying anything.
```

```plain&#x20;text
/goal Convert package `[name]` to TypeScript strict mode.
Verification: `pnpm typecheck --filter [name]` and `pnpm test --filter [name]` pass.
Allowed writes: `[package path]/**`, tests, and tsconfig only.
Do not change runtime behavior or public exports.
Log errors fixed by category in `ts_migration_notes.md`.
Pause if runtime semantics are ambiguous.
```



## 15. 参考来源

### OpenAI 官方文档与代码



1. OpenAI Developers — Follow a goal / Codex use case

https://developers.openai.com/codex/use-cases/follow-a-goal



2. OpenAI Cookbook — Using Goals in Codex

https://cookbook.openai.com/articles/using\_goals\_in\_codex



3. OpenAI Developers — Codex CLI slash commands

https://developers.openai.com/codex/cli/slash-commands



4. OpenAI Developers — Prompting Codex / Goal mode

https://developers.openai.com/codex/prompting



5. OpenAI Developers — Codex changelog

https://developers.openai.com/codex/changelog



6. OpenAI Developers — Codex CLI config

https://developers.openai.com/codex/cli/config



7. OpenAI Developers — Codex CLI sandbox

https://developers.openai.com/codex/cli/sandbox



8. OpenAI Developers — Automate bug triage

https://developers.openai.com/codex/use-cases/automation-bug-triage



9. OpenAI Developers — Iterate on difficult problems

https://developers.openai.com/codex/use-cases/iterate-on-difficult-problems



10. OpenAI Developers — Analyze datasets and ship reports

https://developers.openai.com/codex/use-cases/datasets-and-reports



11. GitHub — openai/codex release `rust-v0.128.0`

https://github.com/openai/codex/releases/tag/rust-v0.128.0



12. GitHub — openai/codex `goals/continuation.md`

https://github.com/openai/codex/blob/main/codex-rs/core/src/goals/continuation.md



13. GitHub — openai/codex `goals/budget_limit.md`

https://github.com/openai/codex/blob/main/codex-rs/core/src/goals/budget\_limit.md



14. GitHub — openai/codex app-server README

https://github.com/openai/codex/blob/main/codex-rs/app-server/README.md



### 社区、播客与经验贴



15. Lenny’s Podcast — How to use OpenAI’s Codex agent, Claire Vo

https://lennyspodcast.com/how-to-use-openais-codex-agent-claire-vo-openai/



16. Lenny’s Newsletter — How to use OpenAI’s Codex agent

https://www.lennysnewsletter.com/p/how-to-use-openais-codex-agent-claire-vo



17. TL;DL transcript summary — How to use OpenAI’s Codex agent

https://tldl.dashsports.tv/podcast/062-195-how-to-use-openais-codex-agent-claire-vo-openai/



18. The Neuron — OpenAI’s Claire Vo on using Codex

https://www.theneuron.ai/newsletter/openai-s-claire-vo-on-using-codex



19. Simon Willison — Codex CLI 0.128.0

https://simonwillison.net/2026/Apr/30/codex-cli-01280/



20. MindStudio — OpenAI Codex CLI complete guide

https://mindstudio.ai/blog/openai-codex-cli-complete-guide



21. J.D. Hodges — How to use Codex Goal Mode

https://www.jd-hodges.com/blog/how-to-use-codex-goal-mode/



22. Chris Hayduk — Why Codex Goal Mode is more than a long-running agent

https://www.linkedin.com/pulse/why-codex-goal-mode-more-than-long-running-agent-its-chris-hayduk-vg52c



### 公开 Issues：限制与排障参考



23. GitHub Issue — Codex Windows Desktop: `/goal` slash command missing

https://github.com/openai/codex/issues/25812



24. GitHub Issue — `/Goal Always Fails`

https://github.com/openai/codex/issues/24269



25. GitHub Issue — All 5-hour Pro tokens consumed by `/goal` looping

https://github.com/openai/codex/issues/23003



26. GitHub Issue — `/goal` repeatedly emits dangerous-operation confirmation prompt

https://github.com/openai/codex/issues/22245



***



## 附录 A：把普通任务改写成 `/goal` 的方法



### A.1 三步改写法

第一步，把动词改成状态。 &#x20;

“优化 checkout”改成“checkout benchmark p95 低于 120ms”。



第二步，把感觉改成证据。 &#x20;

“明显更快”改成“`npm run bench:checkout` 三次运行中位数低于 120ms”。



第三步，把自由发挥改成边界。 &#x20;

“随便改”改成“只允许改 `packages/checkout/**` 和测试，不改 payment contract”。



### A.2 示例：从差到好

差：

```plain&#x20;text
/goal Clean up the repo.
```

中：

```plain&#x20;text
/goal Clean up unused code in the repo and make tests pass.
```

好：

```plain&#x20;text
/goal Remove unused code from `packages/legacy-ui` only.
Verification:
- `pnpm test --filter legacy-ui` passes;
- `pnpm build --filter legacy-ui` passes;
- `git diff --name-only` shows changes only under `packages/legacy-ui/**` and related tests.
Constraints:
- do not change public exports;
- do not delete files unless static search and tests show they are unused;
- do not edit generated files.
Iteration:
- identify candidates first;
- remove in small batches;
- rerun tests after each batch.
Pause if usage cannot be determined statically.
```

### A.3 产品需求示例

差：

```plain&#x20;text
/goal Help me decide whether to build feature X.
```

好：

```plain&#x20;text
/goal Prepare a decision brief for feature X; do not make the final decision.
Inputs: customer feedback exports, sales notes, support tags, and existing roadmap docs.
Output `feature_x_decision_brief.md` with:
- user segments requesting it;
- jobs-to-be-done;
- frequency/severity evidence;
- revenue/account impact where available;
- implementation unknowns;
- options with tradeoffs;
- recommendation confidence and caveats.
Do not contact customers, edit roadmap, or close tickets.
Pause if data access is missing or if evidence conflicts materially.
```



## 附录 B：常见任务的验证面设计



| 任务类型       | 推荐验证面                               | 补充证据                     |
| ---------- | ----------------------------------- | ------------------------ |
| 性能优化       | benchmark 命令、profiling 输出           | baseline/final 对比、火焰图    |
| 测试修复       | 单测、集成测试、CI 日志                       | failure signature、连续通过次数 |
| 迁移         | typecheck、build、test                | migration notes、错误分类     |
| 重构         | test、lint、public API snapshot       | diff summary、行为不变说明      |
| 覆盖率        | coverage report                     | 新增测试覆盖的行为列表              |
| 安全审计       | lockfile scan、静态搜索                  | 可达性分析、风险评级               |
| 数据分析       | 可复现脚本、输出文件                          | data quality notes、图表    |
| 文档同步       | docs build、link check、example tests | 更新摘要、截图                  |
| 邮件清理       | inbox count、label counts            | 保留原因、草拟回复列表              |
| backlog 清理 | issue 分类表                           | 证据链接、需人工确认项              |

## 附录 C：运行 `/goal` 时的监督提示



当你发现 Codex 偏离方向时，可以直接插入以下提示。

```plain&#x20;text
Pause after the current command and summarize progress against the original goal.
```

```plain&#x20;text
Do not make further code edits until you update `GOAL_PROGRESS.md` with the attempts so far.
```

```plain&#x20;text
You are touching files outside the allowed scope. Re-evaluate and either justify each file or revert unrelated changes.
```

```plain&#x20;text
Before continuing, create a checklist mapping each requirement to evidence.
```

```plain&#x20;text
The current approach is repeating. Try a different hypothesis or pause with blockers after one more attempt.
```

```plain&#x20;text
Do not mark complete yet. Run the full verification suite and include exact outputs.
```

```plain&#x20;text
This requires a product decision. Stop and list the decision options instead of choosing one.
```
---

> 📎 [[笔记/index|📒 返回笔记索引]]

