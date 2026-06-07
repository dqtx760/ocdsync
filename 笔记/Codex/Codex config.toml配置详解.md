---
title: Codex config.toml配置详解
time: 2026-06-07
tags:
  - codex
---
# 配置文件 config.toml 详解

> 来源：CodexGuide - config.toml (https://codexguide.ai/configuration/config-file.html)

config.toml 用来保存 Codex CLI 的本地默认行为。你可以把它理解为"个人驾驶舱"：模型、审批、沙盒、profiles、MCP 服务等偏好都可以在这里集中管理。

---

## 配置文件放在哪里

通常位于：

~/.codex/config.toml

项目长期规则建议写到仓库内的 AGENTS.md，个人偏好放到本机 config.toml。这样团队成员能共享项目规则，又能保留自己的 CLI 使用习惯。

---

## 最小配置示例

```
model = "gpt-5.1-codex-max"
approval_policy = "on-request"
sandbox_mode = "workspace-write"

[profiles.readonly]
approval_policy = "on-request"
sandbox_mode = "read-only"

[profiles.build]
approval_policy = "on-request"
sandbox_mode = "workspace-write"
```

这个示例表达三件事：

- 默认允许在当前工作区写文件。
- 高风险命令仍需审批。
- 额外保留一个只读 profile，适合新仓库分析。

---

## 常见配置项用途

1. **模型**：速度、成本、推理深度的取舍。建议用默认配置起步，复杂任务再临时调整。
2. **沙盒**：Codex 能读写哪些位置。新手先只读或工作区写入。
3. **审批**：哪些命令需要你确认。涉及网络、删除、安装、发布时保留审批。
4. **profiles**：不同任务使用不同组合。建议准备 readonly、coding、review 三类 profile。
5. **MCP**：接入外部工具和知识源。只接可信服务，明确权限范围。
6. **环境**：传递必要变量或隔离敏感变量。凭证用最小权限，避免写进教程截图。

---

## 推荐 profiles

### 只读学习

适合打开陌生仓库、生成项目地图、梳理测试命令。

```
[profiles.readonly]
sandbox_mode = "read-only"
approval_policy = "on-request"
```

任务示例：请只读分析当前仓库。不要修改文件，不要运行会写入文件的命令。

### 日常编码

适合修测试、补文档、小范围实现。

```
[profiles.coding]
sandbox_mode = "workspace-write"
approval_policy = "on-request"
```

任务示例：请修复这个失败测试。修改范围限制在 src/parser 和对应测试文件，修复后运行 pnpm test parser。

### 审查与发布前检查

适合 PR review、发布前风险扫描、diff 检查。

```
[profiles.review]
sandbox_mode = "read-only"
approval_policy = "never"
```

任务示例：请审查最近一次改动，列出潜在风险、遗漏测试和建议改进点。不要修改任何文件。

---

## 团队配置建议

适合进仓库的内容：
- AGENTS.md
- 推荐测试命令
- 代码风格和目录说明
- PR 模板
- 文档截图规范

适合留在个人机器的内容：
- 默认模型偏好
- 本地路径
- 凭证、密钥、私有服务地址
- 个人 MCP 服务
- 私有 automation 配置

---

## 排障清单

- 配置没生效：检查文件路径、TOML 语法、CLI 版本、启动时是否选择 profile。
- Codex 权限超出预期：检查 sandbox_mode 和 approval_policy。
- 某个命令一直被拒绝：检查沙盒限制、网络权限和组织策略。
- MCP 无法连接：检查服务命令、环境变量、端口、认证方式。
---

> 📎 [[笔记/index|📒 返回笔记索引]]

