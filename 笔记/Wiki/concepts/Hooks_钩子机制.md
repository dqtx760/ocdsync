---
title: Hooks 钩子机制
type: concept
tags: [概念, 自动化, Claude Code]
last_updated: 2026-06-07
confidence: medium
---

# Hooks 钩子机制

Claude Code 的事件驱动自动化系统。支持在特定事件触发时自动执行自定义命令。

## 支持的事件
- 工具调用前/后
- 对话提交时
- 会话结束时
- 代码变更检测时

## 示例
- "每次提交代码前自动运行 lint"
- "Claude 停止时显示测试结果"

## 关联连接
- [[Claude_Code]] — 钩子系统载体
- [[摘要-选择Claude-Code的10大理由]] — 能力介绍
