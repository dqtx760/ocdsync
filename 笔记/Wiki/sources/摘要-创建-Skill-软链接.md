---
title: "摘要-创建 Skill 软链接"
type: source
tags: [来源, 笔记]
sources: [笔记/Claude code/02-创建skill软链接.md]
last_updated: 2026-06-07
confidence: high
---

## 核心摘要
通过软链接将 Claude Code、WorkBuddy 等工具的 Skill 目录统一指向中央仓库 `%USERPROFILE%\.agents\skills`，实现一处修改多处生效的集中管理方案。使用 Windows `mklink /D` 命令创建目录软链接，确保三个工具的 Skill 完全同步。

## 关键数据
- 中央仓库：`%USERPROFILE%\.agents\skills`
- 命令：`mklink /D <target> <source>`
- 涉及工具：Claude Code、WorkBuddy

## 关联连接
- [[Claude_Code]] — 技能系统目标目录
- [[Skill_技能系统]] — 软链接管理的技能体系
- [[WorkBuddy]] — 腾讯云 AI 工作台
