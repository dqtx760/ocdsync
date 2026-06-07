---
title: Codex接入国产API配置指南
time: 2026-06-07
tags:
  - codex
---
# Codex 桌面端接入国产 API 配置指南

## 核心问题

Codex 新版强制要求使用 **Responses API** 格式（`/v1/responses` 端点），但目前大多数国产 API 服务（DeepSeek、小米 MiMo、智谱等）只支持 **Chat Completions API** 格式（`/v1/chat/completions` 端点）。

**解决方案**：使用本地代理服务将 Responses API 请求转换为 Chat Completions API 格式。

---

## 配置文件位置

| 文件 | 路径 |
| --- | --- |
| config.toml | `C:\Users\Administrator\.codex\config.toml` |
| auth.json | `C:\Users\Administrator\.codex\auth.json` |

---

## 配置步骤

### 第一步：获取 API 信息

从你的 API 服务商获取以下信息：

- **API Key**：通常以 `sk-` 或 `tp-` 开头
- **Base URL**：例如 `https://api.deepseek.com` 或 `https://token-plan-sgp.xiaomimimo.com/v1`
- **模型名称**：例如 `deepseek-v4-pro`、`mimo-v2.5` 等

### 第二步：配置 auth.json

```json
{
  "OPENAI_API_KEY": "你的API密钥"
}
```

**示例**：

```json
{
  "OPENAI_API_KEY": "sk-xxx"
}
```

### 第三步：配置 config.toml

```toml
model = "模型名称"
model_provider = "custom"

[model_providers.custom]
name = "custom"
wire_api = "responses"
requires_openai_auth = true
base_url = "http://127.0.0.1:57321/v1"
```

**重要说明**：

- `model`：填写你的 API 支持的模型名称
- `wire_api`：必须为 `"responses"`，Codex 新版不支持 `"chat"`
- `base_url`：指向本地代理地址 `http://127.0.0.1:57321/v1`

---

## 本地代理配置（二选一）

由于国产 API 不支持 Responses API，需要进行格式转换。有两种方式：

### 方式一：使用 Codex++ 管理工具（推荐）

Codex++ 内置了协议转换功能，配置更简单：

1. 打开 Codex++ 管理工具
2. 进入「供应商配置」
3. 填写 API 信息：
   - **配置模型**：模型名称（如 `mimo-v2.5`）
   - **Base URL**：API 地址（如 `https://token-plan-sgp.xiaomimimo.com/v1`）
   - **Key**：API 密钥
   - **上游协议**：选择 `Chat Completions`
4. 点击「测试」验证配置
5. 保存并重启 Codex++

### 方式二：使用本地代理服务

```text
Codex → Responses API → 本地代理 → Chat Completions API → 国产 API 服务
```

确保本地代理服务运行在 `127.0.0.1:57321` 端口。

---

## 验证配置

### 1. 检查 API Key 是否有效

```bash
curl -s -X POST "你的API地址/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 你的API密钥" \
  -d '{"model":"模型名称","messages":[{"role":"user","content":"hi"}],"stream":false}' \
  --max-time 15
```

**成功响应示例**：

```json
{
  "choices": [{
    "message": {
      "role": "assistant",
      "content": "你好！有什么我可以帮你的吗？"
    }
  }]
}
```

### 2. 检查域名是否正确解析

```bash
nslookup 你的API域名
```

**注意**：域名中的点号不能遗漏，例如：

- ✅ 正确：`token-plan-sgp.xiaomimimo.com`
- ❌ 错误：`token-plan-sgp-xiaomimimo.com`

### 3. 检查本地代理是否运行

```bash
netstat -ano | findstr "57321"
```

应看到类似输出：

```text
TCP    127.0.0.1:57321        0.0.0.0:0        LISTENING        XXXX
```

---

## 常见错误及解决方法

### 错误 1：`stream disconnected before completion`

**原因**：API 地址错误或域名不存在  
**解决**：检查 base_url 是否正确，使用 nslookup 验证域名

### 错误 2：`HTTP 404 Not Found`

**原因**：API 端点不支持 Responses API 格式  
**解决**：确保本地代理已启动并正确配置

### 错误 3：`Method Not Allowed (405)`

**原因**：base_url 缺少 `/v1` 后缀  
**解决**：确认 base_url 以 `/v1` 结尾

### 错误 4：`Invalid API Key`

**原因**：auth.json 中的密钥不正确  
**解决**：检查并更新正确的 API Key

### 错误 5：`The supported API model names are ... but you passed gpt-5.5`

**原因**：config.toml 中未指定正确的 model  
**解决**：在 config.toml 顶部添加 `model = "正确的模型名称"`

---

## 各服务商配置示例

### DeepSeek

**config.toml**:

```toml
model = "deepseek-v4-pro"
model_provider = "custom"

[model_providers.custom]
name = "custom"
wire_api = "responses"
requires_openai_auth = true
base_url = "http://127.0.0.1:57321/v1"
```

**auth.json**:

```json
{
  "OPENAI_API_KEY": "sk-你的deepseek密钥"
}
```

### 小米 MiMo

**config.toml**:

```toml
model = "mimo-v2.5"
model_provider = "custom"

[model_providers.custom]
name = "custom"
wire_api = "responses"
requires_openai_auth = true
base_url = "http://127.0.0.1:57321/v1"
```

**auth.json**:

```json
{
  "OPENAI_API_KEY": "tp-你的mimo密钥"
}
```

---

## 快速配置检查清单

- [ ] 1\. 获取 API Key
- [ ] 2\. 确认 API 支持的模型名称
- [ ] 3\. 确认 API Base URL 格式正确
- [ ] 4\. 配置 auth.json 填入 API Key
- [ ] 5\. 配置 config.toml 指定 model 和 base_url
- [ ] 6\. 启动本地代理服务
- [ ] 7\. 验证 API Key 有效
- [ ] 8\. 重启 Codex 测试

---

## 常见问题（FAQ）

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

**注意区分**：
| 类型 | 端口 | 作用 |
|------|------|------|
| 本地协议代理 | 57321 | API 格式转换（Codex++ 内置） |
| 科学上网代理 | 7890 等 | 翻墙/绕网络限制（Clash/V2Ray） |

---

### Q3: 本地代理和科学上网代理有什么区别？

**答**：两者是完全不同的东西。

| | 本地协议代理 (57321) | 科学上网代理 (7890) |
|--|--|--|
| **作用** | 格式转换 | 翻墙/绕限制 |
| **来源** | Codex++ 内置 | Clash/V2Ray 等 |
| **处理内容** | API 请求格式 | 网络流量转发 |
| **运行方式** | 本地监听 | 本地或远程服务器 |

**本地协议代理的工作原理**：
```
Codex 发出: POST /v1/responses (Responses API 格式)
        ↓
代理接收: 127.0.0.1:57321
        ↓
代理转换: 把请求体转成 Chat Completions 格式
        ↓
代理转发: POST /v1/chat/completions → 实际 API 地址
```

简单说：**代理是 Codex++ 自带的"翻译器"**，不需要你手动配置，Codex++ 会自动处理。

---

## 注意事项

1. **API Key 安全**：不要将 API Key 分享给他人或上传到公开仓库
2. **代理服务**：确保本地代理持续运行，否则 Codex 无法正常工作
3. **模型名称**：不同服务商的模型名称不同，请查阅对应文档
4. **费用**：使用国产 API 通常比 OpenAI 官方更便宜，但请关注用量

---

## 参考资源

- Codex 官方文档：https://github.com/openai/codex
- DeepSeek API 文档：https://api-docs.deepseek.com
- 小米 MiMo 平台：https://xiaomimimo.com
---

> 📎 [[笔记/index|📒 返回笔记索引]]

