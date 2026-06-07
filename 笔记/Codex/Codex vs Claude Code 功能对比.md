---
title: Codex vs Claude Code 功能对比
time: 2026-06-07
tags:
  - codex
---
# Codex vs Claude Code：功能对比与优势分析

> 对比 Codex（Codex Desktop App）和 Claude Code（Anthropic CLI Agent）的核心能力差异。

---

## 一、Codex 的三大核心优势（你已经发现的）

### 1. 插件系统（Plugins）

- Codex 有插件生态，比如 GitHub、Chrome、Documents、Presentations、Spreadsheets 等插件，开箱即用
- Claude Code 没有插件市场，需要自己手动配置 MCP Server

### 2. 技能系统（Skills）

- Codex 支持 SKILL.md，可以封装特定领域知识和工作流（比如做卡片、生成视频、操作飞书等）
- Claude Code 没有原生的技能系统，需要通过 System Prompt 手动注入

### 3. 记忆系统（Memory）

- Codex 有 AGENTS.md、持久化的记忆文件，跨会话保持上下文
- Claude Code 依赖项目的 CLAUDE.md，但没有 Codex 这么结构化的多层记忆体系

---

## 二、你可能没想到的额外优势

### 4. 图形界面（桌面端）

- Codex 有**桌面应用**，可以直接看到输出、终端、文件预览、图片展示
- Claude Code 是纯终端 CLI，所有输出都是文本

### 5. 浏览器自动化内置

- Codex 内置了 **Browser 插件**（In-App Browser）和 **Chrome 插件**，可以直接操控浏览器
- Claude Code 没有浏览器能力，需要额外配置 Playwright MCP 等

### 6. 多 Agent 协作

- Codex 支持 spawn_agent **子 Agent 并行协作**，可以把任务分发给多个子 Agent 同时执行
- Claude Code 是单会话模式，没有内置的多 Agent 编排

### 7. App 连接器（Connectors）

- Codex 有 App 连接器概念，可以直接连接 Slack、Teams、Gmail、Notion、Google Calendar 等第三方服务
- Claude Code 需要自己搭建 MCP 集成

### 8. 自动化与定时任务（Automations）

- Codex 支持**循环自动化**（Cron）和**心跳唤醒**（Heartbeat），可以设置定时任务
- Claude Code 没有这个能力

### 9. 协作模式

- Codex 支持 **Default 模式** 和 **Plan 模式**，可以切换工作方式
- Claude Code 没有类似的模式切换机制

### 10. 工具丰富度

- Codex 开箱集成：画图（Draw.io）、PPT、Word、Excel、Node REPL、Playwright 等
- Claude Code 核心是终端+文件编辑，其他都要靠 MCP 插件自己接

---

## 三、完整对比表

| 能力 | Codex | Claude Code |
|------|-------|-------------|
| 图形界面 | ✅ 桌面 App | ❌ 纯 CLI |
| 插件生态 | ✅ 开箱即用 | ❌ 需自建 MCP |
| 技能系统 | ✅ SKILL.md | ❌ 手动 Prompt |
| 记忆系统 | ✅ 多层结构 | ⚠️ CLAUDE.md |
| 多 Agent | ✅ 子 Agent | ❌ 单会话 |
| 浏览器操作 | ✅ 内置 | ❌ 需配置 |
| 定时任务 | ✅ 自动化 | ❌ 无 |
| 第三方连接 | ✅ App 连接器 | ❌ 需自建 |

---

## 四、Claude Code 的优势

- 轻量级、终端原生，启动快、没有 GUI 开销
- Claude 模型本身的代码能力很强
- 适合习惯纯命令行、喜欢简洁工作流的开发者

---

## 五、总结

Codex 更像是一个**全功能的工作平台**，不只是写代码，还能搜索、做PPT、操作浏览器、连接各种服务，适合需要多场景协作的用户。

Claude Code 则是一个**轻量级终端工具**，专注代码，简洁高效。

---

*创建时间：2026-06-03*
*标签：#AI #Codex #Claude #对比分析*

---

## 六、各能力的实际使用方法

### 插件系统（Plugins）

插件可以通过 **@插件名** 在对话中直接调用：

- @GitHub — 操作 PR、Issue、仓库
- @Chrome — 操控你的 Chrome 浏览器
- @Documents — 创建/编辑 Word 文档
- @Presentations — 制作 PPT 演示文稿
- @Spreadsheets — 处理 Excel 表格

例如：\@GitHub 帮我看看这个 PR 的状态\

### 技能系统（Skills）

技能有多种触发方式：

- **斜杠命令**：在对话中输入 /技能名 直接调用，例如：
  - /imagegen 生成一张日落风景图
  - /card 把这段文字做成知识卡片
  - /agent-reach 搜索 xxx
- **自然语言触发**：直接说出你的需求，Codex 会自动识别并加载对应的技能
- **手动指定**：明确说出技能名称，例如 使用 imagegen 技能生成一张图片

技能本质是一套预定义的工作流和领域知识，封装在 SKILL.md 文件中。斜杠命令是最直接、最高效的调用方式，系统会立即加载对应的 SKILL.md 执行。

常用技能示例：
- **imagegen** — 生成或编辑图片
- **hyperframes** — 创建视频和动画
- **card** — 生成知识卡片
- **agent-reach** — 搜索网页和社交媒体
- **browser** — 浏览器自动化操作
- **documents** — 创建和编辑 Word 文档

### 记忆系统（Memory）

Codex 的记忆通过项目根目录的 **AGENTS.md** 文件实现：

- 在项目根目录放置 \AGENTS.md\，Codex 每次启动都会自动读取
- 可以在里面写：编码规范、项目说明、常用命令、注意事项等
- 支持**多层级**：每个子目录可以有自己的 \AGENTS.md\，越深层的越优先
- 效果：Codex 记住你的偏好，不用每次都重复说明

### 多 Agent 协作

通过 **spawn_agent** 工具分发任务给子 Agent：

- Codex 会自动判断是否需要拆分任务
- 你也可以手动要求：\请并行帮我分析这三个文件\
- 子 Agent 在后台执行，不阻塞主流程

### App 连接器（Connectors）

连接器通过 App 名称触发，支持的服务包括：

- **Slack** — 收发消息、管理频道
- **Gmail** — 读写邮件
- **Google Calendar** — 管理日程
- **Notion** — 读写文档和数据库
- **Teams** — 团队沟通

首次使用时 Codex 会引导你完成授权配置。

### 浏览器自动化

通过 **@Browser**（内置）或 **@Chrome**（你的浏览器）调用：

- \@Browser 打开 localhost:3000\ — 在内置浏览器中打开
- \@Chrome 搜索 xxx\ — 操控你登录状态下的 Chrome
- 支持截图、点击、填写表单等操作

### 自动化定时任务（Automations）

直接用自然语言告诉 Codex 你想定时做什么：

- \帮我每小时检查一次 GitHub Issue\
- \每天早上 9 点提醒我看日报\
- Codex 会自动创建 Cron 任务或 Heartbeat 心跳任务

---

*更新时间：2026-06-03*
---

> 📎 [[笔记/index|📒 返回笔记索引]]

