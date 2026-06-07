---
title: Claude Code
type: entity
tags: [实体, 工具, AI, Anthropic]
last_updated: 2026-06-07
confidence: high
---

# Claude Code

Claude Code 是 Anthropic 推出的 AI 原生命令行开发环境（CLI Agent），定位为"数字同事"而非普通的对话式 AI。

## 核心特性
- **Tool 生态**：内置 100+ 工具覆盖开发全场景
- **Skill 系统**：可扩展的技能体系，通过 /skill-name 激活
- **Subagent**：支持并行任务拆分处理
- **Memory**：跨会话持久记忆
- **Hooks**：事件驱动自动化
- **MCP 协议**：开放互联，对接飞书/钉钉/数据库
- **Git 集成**：深度集成版本控制
- **多模态**：支持图片、PDF、Markdown、Mermaid

## 使用方式
- 安装：`npm install -g @anthropic-ai/claude-code`
- 启动：`claude` 或 `claude --dangerously-skip-permissions`（YOLO 模式）
- 配置：`~/.claude/settings.json`

## 对比优势
与普通 AI（如豆包）的本质区别：Claude Code 是"合伙人"——出谋划策还直接干活；普通 AI 是"顾问"——只出主意。[[摘要-Claude-Code-vs-豆包]]

## 相关来源
- [[摘要-Claude-Code-安装]]
- [[摘要-API-Key-配置]]
- [[摘要-选择Claude-Code的10大理由]]
- [[摘要-Claude-Code-指令速查]]
- [[摘要-Claude-Code-命令与快捷键]]
