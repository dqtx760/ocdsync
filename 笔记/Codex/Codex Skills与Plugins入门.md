---
title: Codex Skills与Plugins入门
time: 2026-06-07
tags:
  - codex
---
# Skills 和 Plugins 入门

> 来源：CodexGuide - Skills 与 Plugins (https://codexguide.ai/guide/09-skills-plugins.html)

Codex 里的 Skill 和 Plugin 是两种不同层次的扩展能力。

---

## Skill 是什么

Skill 可以理解为一份让 Codex 稳定执行重复任务的操作手册。当某个工作流已经很固定，比如"审查 PR""整理文档""补案例索引"，就可以把它沉淀成一个 Skill，减少每次重复描述的成本。

一个 Skill 通常包含：

1. 一个 SKILL.md 文件：写清触发场景、执行步骤、输出格式和注意事项。
2. 必要时配套脚本、模板或参考文件：帮助 Codex 更稳定地完成任务。

---

## Plugin 是什么

Plugin 更像一种打包和分发机制，用来把可复用工作流、应用集成、MCP 服务配置等能力组合起来，方便在项目或团队中统一安装和使用。

简单理解：
- Skill 关注"这件事应该怎么做"
- Plugin 关注"把哪些能力打包起来，方便安装和复用"

---

## 它们的关系

你可以把两者想成：

- Skill 是"工作说明书"
- Plugin 是"装着说明书、工具和连接配置的工具箱"

有些插件里会包含一个或多个 Skills，也可能附带应用集成或 MCP 配置。这样团队在迁移环境时，不用手动一个个配置。

---

## 使用时的提醒

---

## 技能目录在哪里

Codex 的技能分布在两个目录下：

### 1. 系统内置技能

路径：

```
C:\Users\<你的用户名>\.codex\skills\
```

目录结构：

- `.system/` — 系统自带技能（不要手动删改）
  - `imagegen` — 图片生成
  - `openai-docs` — OpenAI 文档查询
  - `skill-creator` — 技能创建指南
  - `skill-installer` — 技能安装器
  - `plugin-creator` — 插件创建器
- `newtype` — 内容创作 CLI

### 2. 用户/插件安装的技能

路径：

```
C:\Users\<你的用户名>\.agents\skills\
```

典型内容包括：

- `agent-reach` — 网络搜索、社交平台集成
- `card` — 知识卡片生成
- `gsap` — GSAP 动画
- `hyperframes` / `hyperframes-cli` / `hyperframes-registry` — 视频合成
- `lark-im` / `lark-shared` — 飞书集成
- `remotion-to-hyperframes` — Remotion 转 HyperFrames
- `website-to-hyperframes` — 网站转视频

### 每个技能文件夹的典型结构

```
skill-name/
  SKILL.md          # 技能说明（核心文件）
  scripts/          # 配套脚本（可选）
  references/       # 参考文档（可选）
  assets/           # 模板、字体、图片等资源（可选）
```

其中 SKILL.md 是最关键的文件，Codex 启动技能时会优先读取它。

- 插件和技能的具体入口会随版本变化，不要把某个截图里的按钮位置当成永远不变。
- 如果插件涉及外部系统、浏览器、邮箱、知识库或项目管理工具，先确认它是只读还是可写。
- 涉及安装、写回外部系统或共享给团队时，最好保留人工复核。
---

> 📎 [[笔记/index|📒 返回笔记索引]]

