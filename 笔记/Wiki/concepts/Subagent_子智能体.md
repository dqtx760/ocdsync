---
title: Subagent 子智能体
type: concept
tags: [概念, 架构, Claude Code]
last_updated: 2026-06-07
confidence: high
---

# Subagent 子智能体

Claude Code 的并行任务处理架构。支持同时启动多个子智能体，各自专注不同任务，主智能体负责最终决策。

## 子智能体类型
- **Explore**：负责代码探索和信息扫描
- **Plan**：负责架构设计和规划
- **general-purpose**：处理复杂调研和通用任务

## 优势
- 任务拆分并行，1+1>2 协作效率
- 多角色分工，各司其职
- 主智能体专注核心决策，子智能体执行体力活

## 关联连接
- [[Claude_Code]] — 子智能体运行平台
- [[摘要-选择Claude-Code的10大理由]] — 能力介绍
- [[摘要-Claude-Code-vs-豆包]] — 与普通 AI 的对比
