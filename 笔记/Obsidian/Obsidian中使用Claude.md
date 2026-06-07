---
title: Obsidian 中使用 Claude
time: 2026-06-07
tags:
  - obsidian
  - claudian
  - troubleshooting
---

## 使用方法

1. 让客户截图发来报错信息
2. 根据报错类型选择对应的话术模板
3. 让客户在终端启动 Claude Code，粘贴话术发送即可

---

## 一、启动 Claude Code

win+R 输入 cmd

粘贴下面命令启动 Claude Code

```
claude --dangerously-skip-permissions
```

> 注意：客户是 npm 安装的 Claude Code，用 cli.js 路径（不是 claude.cmd）
---

## 二、Claude Provider 配置

Claudian 设置 → **Claude** 标签页 → **Claude CLI path** → 填入 claude.exe 完整路径

**查找路径的方法**（让客户在终端执行）：
```bash
for %I in ("%APPDATA%\npm\node_modules\@anthropic-ai\claude-code\bin\claude.exe") do @echo %~fI
```

会输出完整路径，直接复制粘贴到 Claudian 设置中即可。
常见路径：
- npm 全局安装（最常见）：`C:\Users\<用户名>\AppData\Roaming\npm\node_modules\@anthropic-ai\claude-code\bin\claude.exe`

> ⚠️ `where claude` 查到的是启动脚本（.cmd），不是实际的 exe。配置文件需要填 exe 的完整路径。
---

## 三、Claude Provider 报错话术

适用于：模型选择器只有 Claude 选项，对话时报错。
```
Claude Code 终端使用正常，但在 Obsidian 的 Claudian 插件中对话报错，帮我检查并修复 claudian-settings.json 配置文件。
我是 npm 安装的 Claude Code，cli 路径是：C:\Users\<用户名>\AppData\Roaming\npm\node_modules\@anthropic-ai\claude-code\bin\claude.exe

报错信息如下：```

（让客户粘贴实际报错截图或文字，并替换路径为自己的实际路径）

---

## 四、Codex Provider 报错话术

适用于：使用 Codex 模型（如小米 MiMo）时报错。
```
Codex 桌面端使用正常，但在 Obsidian 的 Claudian 插件中对话报错，帮我检查并修复 claudian-settings.json 配置文件。
我的 Codex CLI 路径是：C:\Users\<用户名>\AppData\Local\UniGetUI\Chocolatey\bin\codex.exe
我使用的模型是：mimo-v2.5

报错信息如下：```

（让客户粘贴实际报错截图或文字，并替换路径和模型名为自己的实际值）

### 常见 Codex 报错

**模型不支持**：
```
✖ Error: {"error":{"message":"Param Incorrect","type":"upstream_error","code":"400","param":"Not supported model gpt-5.5"}}
```

原因：`savedProviderModel.codex` 被设成了不支持的模型名。修复：改为 API 实际支持的模型名（如 `mimo-v2.5`）。
**Codex 开关未开启**：模型选择器中看不到 Codex 分组。
原因：`providerConfigs.codex.enabled` 为 `false`。修复：在 Claudian 设置 → Codex 标签页打开开关。
---

## 五、跳过终端信任提示
客户每次启动 Claude Code 都会看到安全确认提示，帮忙配置跳过：

```
每次启动 Claude Code 都要手动确认信任文件夹，很麻烦，帮我配置跳过这个提示。
终端显示的内容是：
Accessing workspace:
C:\Users\Running\Desktop

Quick safety check: Is this a project you created or one you trust?
```

---

## 六、配置文件关键字段速查

给 Claude Code 参考，快速定位问题字段：

| 字段 | 作用 | 常见问题 |
|------|------|---------|
| `providerConfigs.claude.cliPath` | Claude CLI 路径 | npm 安装注意用 cli.js 路径，不是 claude.cmd |
| `providerConfigs.claude.customModels` | Claude 自定义模型 | 一般不需要改 |
| `providerConfigs.codex.enabled` | Codex 开关 | 为 `false` 时看不到 Codex 模型 |
| `providerConfigs.codex.customModels` | Codex 自定义模型列表 | 追加而非替换，内置 GPT 模型删不掉 |
| `providerConfigs.codex.cliPathsByHost` | Codex CLI 路径 | 路径错误会导致无法启动 |
| `savedProviderModel` | 各 provider 默认模型 | 填了不支持的模型名会报 400 |
| `settingsProvider` | 新对话默认 provider | `"claude"` 或 `"codex"` |
---

> 📎 [[笔记/index|📒 返回笔记索引]]
