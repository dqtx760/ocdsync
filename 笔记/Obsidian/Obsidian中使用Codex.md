---
title: Obsidian 中使用 Codex
time: 2026-06-07
tags:
  - obsidian
  - codex
  - claudian
---

## 概述

Claudian 插件支持两个 provider：
| Provider | 说明 | 模型示例 |
|----------|------|---------|
| Claude | 调用本地 Claude Code CLI | Opus、Sonnet、Haiku |
| Codex | 调用本地 Codex CLI，兼容 OpenAI 兼容 API | mimo-v2.5、o4-mini 等 |

配置文件路径：`<vault>/.claudian/claudian-settings.json`

## 配置步骤

### 第一步：开启 Codex 开关
Claudian 设置 → **Codex** 标签页 → **Enable Codex provider** → 打开

不开这个开关，模型选择器里不会出现 Codex 模型。
### 第二步：填写 Codex CLI 路径

Claudian 设置 → **Codex** 标签页 → **Codex CLI path** → 填入 codex.exe 完整路径

**查找路径的命令：**
```bash
# Git Bash / CMD
where codex

# PowerShell
Get-Command codex | Select-Object -ExpandProperty Source
```

常见路径：
- Chocolatey 安装：`C:\Users\<用户名>\AppData\Local\UniGetUI\Chocolatey\bin\codex.exe`
- npm 全局安装：检查 `C:\Users\<用户名>\AppData\Roaming\npm\`

留空可自动从 PATH 检测，但手动指定更可靠。
### 第三步：配置自定义模型
**方式一：UI 配置（推荐）**

Claudian 设置 → Codex 标签页 → Custom models → 每行填一个模型名

**方式二：直接改配置文件**

编辑 `<vault>/.claudian/claudian-settings.json`：
```json
"providerConfigs": {
  "codex": {
    "customModels": "mimo-v2.5\nmimo-v2-pro"
  }
}
```

每行一个模型名，会**追加**到选择列表，不会替换内置默认模型。
### 第四步：验证

打开 Claudian 对话框 → 模型选择器 → 确认出现 Codex 分组和你添加的模型：

```
CLAUDE
  Opus
  Sonnet
  Haiku
CODEX
  mimo-v2-pro
  mimo-v2.5
  GPT-5.5          → 内置默认，不支持可忽略
  GPT-5.4 Mini     → 内置默认，不支持可忽略
```

选择你的模型（如 `mimo-v2.5`）即可开始对话。
**注意**：Claudian 默认使用 Claude provider。点 **+** 新建对话时才会弹出模型选择器，让你切换到 Codex。已有对话不能中途切换 provider。
## 常用配置项
### 默认模型

`savedProviderModel` 记住上次选择的模型：

```json
"savedProviderModel": {
  "claude": "sonnet",
  "codex": "mimo-v2.5"
}
```

### 思考预算与努力级别

```json
"savedProviderThinkingBudget": {
  "claude": "low",
  "codex": "low"
},
"savedProviderEffort": {
  "claude": "high",
  "codex": "medium"
}
```

### 新对话默认 Provider

```json
"settingsProvider": "claude"
```

设为 `"claude"` 则新对话默认用 Claude，设为 `"codex"` 则默认用 Codex。
## 已知限制

1. **内置默认模型无法删除**：Claudian 对 Codex 内置了 `GPT-5.5` 和 `GPT-5.4 Mini`，`customModels` 只能追加不能替换。API 不支持这些模型时选中会报错，忽略即可。
2. **UI 修改会覆盖手动编辑**：在 Claudian 设置界面改模型后，会覆盖 `savedProviderModel` 的值。如果被覆盖成不支持的模型，需要在 UI 重新选择正确的模型。
3. **`enabled` 字段可能被重置**：切换 provider 设置后，`codex.enabled` 可能变回 `false`，需要重新开启。
## 接入小米 MiMo 完整流程

1. Codex 桌面端先配置好小米 API 的 base URL 和 API key
2. Claudian 设置 → Codex 标签页 → 开启开关
3. 填写 Codex CLI path（`where codex` 查路径）
4. Custom models 填入：
   ```
   mimo-v2.5
   mimo-v2-pro
   ```
5. 模型选择器中选 `mimo-v2.5` 开始对话

---

> 📎 [[笔记/index|📒 返回笔记索引]]
