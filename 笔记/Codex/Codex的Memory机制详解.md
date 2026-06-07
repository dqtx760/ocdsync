---
title: Codex的Memory机制详解
time: 2026-06-07
tags:
  - codex
---
# Codex 的 Memory 机制详解

---

## 什么是 Memory

Codex 的 Memory（记忆）是一种跨会话的持久化记忆系统。它可以把你在对话中强调的重要信息保存下来，在以后的新对话中自动加载，让 Codex 记住你的偏好和项目规则。

简单说：Memory = 让 Codex 在新对话中也记得「你是谁」「你在意什么」「你的项目有什么规矩」。

---

## Memory 的存储位置

Memory 文件存放在：

```
C:\Users\<你的用户名>\.codex\memories\
```

这是一个目录，里面存放 Codex 自动或手动保存的记忆条目。

---

## 如何开启和使用 Memory

### 方法一：通过 /memories 斜杠命令

在 Codex CLI 或桌面 App 的对话输入框中，输入：

```
/memories
```

这会打开 Memory 配置界面，你可以：
- 查看当前已有的记忆条目
- 配置记忆的使用方式和生成方式
- 管理记忆内容

### 方法二：在对话中自然触发

在对话过程中，Codex 会根据对话内容自动判断是否需要保存记忆。你也可以主动告诉它：

- 「请记住：我习惯用 pnpm 而不是 npm」
- 「请记住：我的项目用中文注释」
- 「请记住：不要自动运行 git commit」

Codex 会把这些信息保存到 Memory 中，后续新对话会自动加载。

### 方法三：通过全局 AGENTS.md 替代

Memory 的另一种实现方式是在全局 AGENTS.md 中写入持久规则：

```
C:\Users\<你的用户名>\.codex\AGENTS.md
```

这个文件里的内容会在所有项目的所有对话中生效，效果类似 Memory，但更显式、更可控。

---

## Memory vs AGENTS.md vs config.toml

| 维度 | Memory | 全局 AGENTS.md | config.toml |
| --- | --- | --- | --- |
| 存放位置 | .codex/memories/ | .codex/AGENTS.md | .codex/config.toml |
| 适合写什么 | 个人偏好、沟通习惯、通用规则 | 通用指令、语言偏好、行为约束 | 模型、沙盒、审批、MCP 等技术配置 |
| 谁管理 | Codex 自动 + 手动 /memories | 你手动编辑 | 你手动编辑 |
| 作用范围 | 所有对话 | 所有对话 | 所有对话 |
| 可见性 | 隐式，Codex 自动加载 | 显式，你直接看到和编辑 | 显式，你直接看到和编辑 |

推荐组合：
- 个人偏好和沟通习惯 → 写进 Memory 或全局 AGENTS.md
- 技术配置（模型、沙盒、MCP）→ 写进 config.toml
- 项目特定规则 → 写进项目根目录的 AGENTS.md

---

## Memory 的工作原理

1. Codex 在对话过程中，根据你的指令或对话内容判断需要保存什么。
2. 保存的条目写入 .codex/memories/ 目录。
3. 下次新开对话时，Codex 会自动读取 memories 目录中的所有条目，作为对话的初始上下文。
4. 你不需要每次重新告诉 Codex 你的偏好。

---

## 调试命令（进阶）

Codex CLI 中有两个调试用的 Memory 命令：

- /debug-m-drop — 删除 Memory 条目（谨慎使用）
- /debug-m-update — 更新 Memory 条目（谨慎使用）

这两个命令在正常对话中不建议使用，仅供调试排查。

---

## 实用建议

1. **不要把 Memory 当垃圾桶**：只保存真正重要的、跨对话都需要的偏好和规则。
2. **敏感信息不要存**：密码、token、API Key 等不要保存到 Memory 中。
3. **定期检查**：用 /memories 查看当前保存了什么，删除过时或错误的条目。
4. **配合 AGENTS.md 使用**：如果规则是团队共享的，写进项目 AGENTS.md 而不是个人 Memory。
5. **沟通偏好最值得存**：比如「用中文回答」「不要自动 git commit」「代码用驼峰命名」等。

---

## 小结

- Memory 让 Codex 在新对话中也记得你的偏好。
- 通过 /memories 命令管理，或在对话中自然触发保存。
- 敏感信息不要存，只保存真正重要的通用偏好。
- 配合项目 AGENTS.md 和 config.toml 一起使用，效果最好。
---

> 📎 [[笔记/index|📒 返回笔记索引]]

