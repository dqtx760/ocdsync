---
title: 安装mcp
time: 2026-06-07
tags:
  - codex
---

# Codex MCP 服务安装与配置指南

> 本文档记录如何为 Codex 安装和配置 MCP（Model Context Protocol）服务，扩展 AI Agent 的能力边界。

---

## 一、配置文件说明

MCP 的配置文件格式为 config.toml，用于声明已安装的 MCP 服务及其连接参数。

---

## 二、安装常用 MCP 服务

### 1. Draw.io MCP

用于在 Codex 中绘制和编辑流程图、架构图等可视化图表。

- **仓库地址**：https://github.com/jgraph/drawio-mcp
- **安装命令**：

`ash
codex mcp add drawio npx @anthropic-ai/drawio-mcp@latest
`

### 2. Playwright MCP

为 Codex 提供浏览器自动化能力，可在 Headless 模式下访问网页、截图、交互等。

- **安装命令**：

`ash
codex mcp add playwright npx @playwright/mcp@latest
`

> **什么是 Headless 模式？**
> Playwright 在 Headless 模式下启动 Chromium 浏览器——浏览器像「隐身模式」一样在后台默默工作，没有可见窗口，但所有网页功能都正常运行。

---

## 三、查看已安装的 MCP 服务

进入 Codex 后，使用 /mcp 命令可以列出当前已安装的所有 MCP 服务列表，确认安装是否成功。

---

## 四、相关插件

- **HyperFrames** — 视频创作与动画插件，支持在 Codex 中构建 HTML 视频合成、GSAP 动画、字幕配音等。

---

## 五、关联连接

- [[LLM_Wiki_Methodology]] — LLM Wiki 方法论，本文所属的知识体系
- [[Codex_Platform]] — Codex 平台介绍（待创建）
---
---

> 📎 [[笔记/index|📒 返回笔记索引]]

