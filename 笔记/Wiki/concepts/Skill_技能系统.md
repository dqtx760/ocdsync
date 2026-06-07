---
title: Skill 技能系统
type: concept
tags: [概念, 框架, Claude Code]
last_updated: 2026-06-07
confidence: high
---

# Skill 技能系统

Claude Code 的可扩展技能体系。Skill 是预构建的能力模块，通过 `/skill-name` 一键激活，大幅扩展 Claude Code 的能力边界。

## 核心技能
- **内容创作**：khazix-writer（长文写作）、x-post（多平台分发）、huashu-slides（PPT 演示）
- **知识管理**：/ingest（资料编译）、/query（知识问答）、/lint（健康检查）
- **开发辅助**：code-review（代码评审）、find-skills（技能搜索）
- **AI 资讯**：aihot（AI 热点查询）

## 安装方式
- 从 GitHub 仓库 URL 安装
- 通过软链接统一管理到中央仓库 `%USERPROFILE%\.agents\skills`

## 关联连接
- [[Claude_Code]] — Skill 运行环境
- [[摘要-创建-Skill-软链接]] — 软链接管理方式
- [[摘要-安装-Skill]] — 安装流程
- [[摘要-技能与CLI合集]] — Skill 生态总览
