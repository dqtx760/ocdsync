---
title: Codex++使用
time: 2026-06-07
tags:
  - codex
---
# Codex++ 配置教程：接入国产 API 完整指南

> 本文档记录了如何使用 Codex++ 桌面端接入国产 API 服务（如小米 MiMo、DeepSeek 等），包含完整配置步骤和常见问题解答。

---

## 目录

- [一、方案选择](#一方案选择)
- [二、核心问题：为什么需要代理](#二核心问题为什么需要代理)
- [三、安装 Codex++](#三安装-codex)
- [四、配置步骤详解](#四配置步骤详解)
- [五、实战案例](#五实战案例)
- [六、验证配置](#六验证配置)
- [七、常见错误及解决](#七常见错误及解决)
- [八、常见问题（FAQ）](#八常见问题faq)

---

## 一、方案选择

| 方案              | 适合谁              | 优点               | 需要注意                |
| --------------- | ---------------- | ---------------- | ------------------- |
| 手动配置            | 想理解底层原理的人        | 透明、可控、方便排障       | 要自己维护 `config.toml` |
| **Codex++**     | 用桌面 App，想图形化管理的人 | **有管理界面，配置一键写入** | 第三方工具，需保持更新         |
| CCX + CC Switch | 有多个供应商、需要协议转换的人  | 网关路由 + 一键切换供应商   | 组件多，需要理解端口和代理链路     |

**推荐方案**：如果你主要用 Codex 桌面 App，直接用 **Codex++** 最省心。

---

## 二、核心问题：为什么需要代理

### 问题根源

Codex 新版强制要求使用 **Responses API** 格式（`/v1/responses` 端点），但目前大多数国产 API 服务只支持 **Chat Completions API** 格式（`/v1/chat/completions` 端点）。

| API 格式                                    | Codex | 国产 API |
| ----------------------------------------- | ----- | ------ |
| Responses API (`/v1/responses`)           | ✅ 要求  | ❌ 不支持  |
| Chat Completions (`/v1/chat/completions`) | ❌ 不支持 | ✅ 支持   |

### 解决方案

使用 Codex++ 内置的协议转换代理，它会自动把 Responses API 请求转换为 Chat Completions 格式。

**请求流程**：
```
你 (Codex)
    ↓ 发送 Responses API 格式请求
本地代理 (127.0.0.1:57321)  ← Codex++ 内置
    ↓ 转换为 Chat Completions 格式
实际 API (如小米、DeepSeek)
```

---

## 三、安装 Codex++

### 1. 下载安装包

从 [Codex++ Releases](https://github.com/BigPizzaV3/CodexPlusPlus/releases) 下载：

- **Codex++ 管理工具**（`codex-plus-plus-manager.exe`）：管理界面
- **Codex++ App**（`codex-plus-plus.exe`）：启动 Codex 的入口

### 2. 安装步骤

1. 分别安装两个安装包
2. 首次打开「Codex++ 管理工具」，如果被系统拦截：
   - 去「系统设置」→「隐私与安全性」
   - 点「仍要打开」
3. 管理工具检测全绿表示安装成功

---

## 四、配置步骤详解

### 第一步：获取 API 信息

从你的 API 服务商获取以下信息：

| 信息 | 说明 | 示例 |
|------|------|------|
| **API Key** | 通常以 `sk-` 或 `tp-` 开头 | `sk-xxxxxxxx` 或 `tp-xxxxxxxx` |
| **Base URL** | API 地址，以 `/v1` 结尾 | `https://api.deepseek.com` |
| **模型名称** | 服务商支持的模型 | `deepseek-v4-pro`、`mimo-v2.5` |

### 第二步：打开 Codex++ 管理工具

1. 启动「Codex++ 管理工具」
2. 点击左侧「供应商配置」
3. 点击「添加供应商」

### 第三步：填写供应商信息

在配置界面填写以下信息：

| 字段 | 说明 | 示例 |
|------|------|------|
| **供应商名称** | 自定义名称 | `xiaomi`、`deepseek` |
| **配置模型** | 模型名称 | `mimo-v2.5`、`deepseek-v4-pro` |
| **Base URL** | API 地址 | 见下方各服务商示例 |
| **Key** | API 密钥 | 从服务商获取 |
| **上游协议** | 选择 `Chat Completions` | 必须选这个 |

> 配置界面截图已省略
### 第四步：保存并测试

1. 点击「保存」
2. 点击「测试」验证配置
3. 看到 HTTP 200 表示配置成功

> 测试结果截图已省略
### 第五步：重启 Codex++

1. 点击「重启 Codex++」
2. 或从 Codex++ 入口启动 Codex（不要直接点原版 Codex）

> 重启方式截图已省略
---

## 五、实战案例

### 案例一：小米 MiMo

#### 1. 获取信息

- **平台**：[小米 MiMo 平台](https://xiaomimimo.com)
- **模型**：`mimo-v2.5`（也可选 `mimo-v2-pro`、`mimo-v2-omni` 等）
- **Base URL**：`https://token-plan-sgp.xiaomimimo.com/v1`

#### 2. 配置 Codex++

| 字段 | 值 |
|------|-----|
| 供应商名称 | `xiaomi` |
| 配置模型 | `mimo-v2.5` |
| Base URL | `https://token-plan-sgp.xiaomimimo.com/v1` |
| Key | 你的小米 API Key（`tp-` 开头） |
| 上游协议 | `Chat Completions` |

#### 3. 验证

点击「测试」，看到类似以下响应表示成功：

```json
{
  "id": "3a9afb2b-xxxx",
  "choices": [{
    "finish_reason": "stop",
    "message": {
      "content": "你好！有什么我可以帮你的吗？",
      "role": "assistant"
    }
  }],
  "model": "mimo-v2.5"
}
```

---

### 案例二：DeepSeek

#### 1. 获取信息

- **平台**：[DeepSeek 平台](https://platform.deepseek.com)
- **模型**：`deepseek-v4-pro` 或 `deepseek-v4-flash`
- **Base URL**：`https://api.deepseek.com`

#### 2. 配置 Codex++

| 字段 | 值 |
|------|-----|
| 供应商名称 | `deepseek` |
| 配置模型 | `deepseek-v4-pro` |
| Base URL | `https://api.deepseek.com` |
| Key | 你的 DeepSeek API Key（`sk-` 开头） |
| 上游协议 | `Chat Completions` |

> 配置示例截图已省略
#### 3. 验证

点击「测试」，看到类似以下响应表示成功：

```json
{
  "id": "6f94664b-xxxx",
  "choices": [{
    "message": {
      "content": "你好！这是来自 DeepSeek 的问候 😊",
      "role": "assistant"
    }
  }],
  "model": "deepseek-v4-flash"
}
```

---

## 六、验证配置

### 1. 检查 API Key 是否有效

使用 curl 测试：

```bash
curl -s -X POST "你的API地址/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 你的API密钥" \
  -d '{"model":"模型名称","messages":[{"role":"user","content":"hi"}],"stream":false}' \
  --max-time 15
```

### 2. 检查域名是否正确解析

```bash
nslookup 你的API域名
```

**注意**：域名中的点号不能遗漏：
- ✅ 正确：`token-plan-sgp.xiaomimimo.com`
- ❌ 错误：`token-plan-sgp-xiaomimimo.com`

### 3. 检查本地代理是否运行

```bash
netstat -ano | findstr "57321"
```

应看到类似输出：
```
TCP    127.0.0.1:57321        0.0.0.0:0        LISTENING        XXXX
```

---

## 七、常见错误及解决

| 错误 | 原因 | 解决方法 |
|------|------|----------|
| `stream disconnected before completion` | API 地址错误或域名不存在 | 检查 base_url，用 nslookup 验证域名 |
| `HTTP 404 Not Found` | API 端点不支持 Responses API 格式 | 确保上游协议选了 `Chat Completions` |
| `Method Not Allowed (405)` | base_url 缺少 `/v1` 后缀 | 确认 base_url 以 `/v1` 结尾 |
| `Invalid API Key` | 密钥不正确 | 检查并更新正确的 API Key |
| `The supported API model names are ... but you passed gpt-5.5` | 未指定正确的 model | 在配置中指定正确的模型名称 |
| 测试通过但实际使用报错 | Codex 没有从 Codex++ 启动 | 必须从 Codex++ 入口启动 Codex |

---

## 八、常见问题（FAQ）

### Q1: 为什么请求走的是本地代理地址，而不是直接走 API 的 Base URL？

**答**：这是由 Codex 的技术限制决定的。

**请求流程**：
```
你 (Codex)
    ↓ 发送 Responses API 格式请求
本地代理 (127.0.0.1:57321)
    ↓ 转换为 Chat Completions 格式
实际 API (如 token-plan-sgp.xiaomimimo.com)
```

**原因**：
- Codex 新版强制要求使用 `wire_api = "responses"`（Responses API 格式）
- 国产 API 只支持 Chat Completions API 格式
- 本地代理的作用是做**格式转换**，把 Codex 的"语言"翻译成国产 API 能听懂的"语言"

**配置体现**：
```toml
# config.toml 中指向本地代理
base_url = "http://127.0.0.1:57321/v1"  # 走本地代理

# 而不是直接指向 API
base_url = "https://token-plan-sgp.xiaomimimo.com/v1"  # 直连会 404
```

---

### Q2: 本地代理端口 57321 是固定的吗？可以自定义吗？

**答**：57321 是 Codex++ 的**默认端口**，所有电脑默认一样。

| 项目 | 说明 |
|------|------|
| 默认端口 | 57321 |
| 是否可改 | 一般在 Codex++ GUI 设置里可以改 |
| 是否需要改 | 一般不需要 |

**为什么不需要改**：
- 这个端口是**本地回环地址**（127.0.0.1），只在你自己的电脑上使用
- 不会和其他程序冲突（除非你同时运行多个需要代理的工具）
- 不涉及网络安全问题，只是本地通信

---

### Q3: 本地代理和科学上网代理有什么区别？

**答**：两者是完全不同的东西。

| | 本地协议代理 (57321) | 科学上网代理 (7890) |
|--|--|--|
| **作用** | 格式转换 | 翻墙/绕限制 |
| **来源** | Codex++ 内置 | Clash/V2Ray 等 |
| **处理内容** | API 请求格式 | 网络流量转发 |
| **运行方式** | 本地监听 | 本地或远程服务器 |

**简单说**：代理是 Codex++ 自带的"翻译器"，不需要你手动配置，Codex++ 会自动处理。

---

### Q4: 可以同时配置多个供应商吗？

**答**：可以。在 Codex++ 管理工具中可以添加多个供应商，需要切换时选择不同供应商即可。

---

### Q5: 配置后插件功能还能用吗？

**答**：Codex++ 支持插件功能，这是手动配置（方案一）做不到的优势。配置好供应商后，插件可以正常使用。

---

## 附录：配置文件说明

Codex++ 会自动管理以下配置文件，一般不需要手动修改：

| 文件 | 路径 | 作用 |
|------|------|------|
| config.toml | `C:\Users\用户名\.codex\config.toml` | 模型和供应商配置 |
| auth.json | `C:\Users\用户名\.codex\auth.json` | API Key 存储 |

**config.toml 示例**（Codex++ 自动生成）：
```toml
model = "mimo-v2.5"
model_provider = "custom"

[model_providers.custom]
name = "custom"
wire_api = "responses"
requires_openai_auth = true
base_url = "http://127.0.0.1:57321/v1"
```

---

## 参考资源

- [Codex 官方文档](https://github.com/openai/codex)
- [Codex++ GitHub](https://github.com/nicepkg/codex-plus-plus)
- [DeepSeek API 文档](https://api-docs.deepseek.com)
- [小米 MiMo 平台](https://xiaomimimo.com)
---

> 📎 [[笔记/index|📒 返回笔记索引]]

