---
title: 01-API key配置
time: 2026-06-07
tags:
  - claude
---

先理清核心逻辑：想要借助智能体解放双手，用 AI 搞定九成重复工作，Claude Code 是目前口碑与实用性顶尖的选择。但想把它用出实效，关键不在于盲目订阅官方服务，而是搭配适配的优质模型、配齐实用工具。

无论是 OpenClaw 龙虾、Claude Code，还是近期热门的 Hermes 这类智能体工具，本质都只是功能载体与运行壳子。真心不建议大家直接开通 Claude 官方付费订阅，日常办公、代码编写、内容创作等绝大多数场景，选用 Kimi K2.6、DeepSeek V4-Flash 这类平替模型就足以轻松胜任。


这类高性价比模型，使用成本还不到 Claude 官方模型的十分之一，性价比拉满。当然这是综合实用需求与预算做出的最优选择；若是不考虑成本、追求极致顶尖算力与推理能力，也可直接选用 Anthropic 顶级模型 Claude-opus-4.7，只是其调用价格偏高，普通日常使用并不划算。


- [大模型排行榜](https://pinchbench.com/)
- [全球大模型稳定性监测](https://relaypulse.top/)


### 付费
----

| Api供应商                                                         | API Keys                                                                              | 使用说明                                                                                                                                                                    | 说明                |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| [Deekseek](https://platform.deepseek.com/usage)                | [点此获取](https://platform.deepseek.com/api_keys)                                        | [接口文档](https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/claude_code)                                                                                  |                   |
| [Kimi K2](https://www.kimi.com/code)                           | 点此获取                                                                                  | [点此查看](https://www.kimi.com/code/docs/third-party-tools/other-coding-agents.html)                                                                                       |                   |
| [Apimart](https://apimart.ai/register?aff=QVui)                | [点此获取]()                                                                              |                                                                                                                                                                         | 生图建议使用GPT Image 2 |
| [智谱](https://www.bigmodel.cn/glm-coding?ic=PUCQNADSPM)         | [点此获取](https://bigmodel.cn/usercenter/proj-mgmt/apikeys)                              | [点此查看](https://docs.bigmodel.cn/cn/guide/develop/claude)                                                                                                                |                   |
| [火山](https://volcengine.com/L/HKZkyHHHJ0k/)                    | [点此获取](https://console.volcengine.com/ark/region:ark+cn-beijing/apikey?apikey=%7B%7D) | [点此查看](https://www.volcengine.com/docs/82379/1928261?lang=zh)                                                                                                           |                   |
| [MiniMax](https://platform.minimaxi.com/subscribe/coding-plan) | [点此获取](https://platform.minimaxi.com/user-center/basic-information/interface-key)     | [点此查看](https://platform.minimaxi.com/docs/guides/text-ai-coding-tools#%E5%9C%A8-claude-code-%E4%B8%AD%E4%BD%BF%E7%94%A8-minimax-m2%EF%BC%88%E6%8E%A8%E8%8D%90%EF%BC%89) |                   |
| [OpenRouter](https://openrouter.ai/)                           | [点此获取](https://openrouter.ai/workspaces/default/keys)                                 | 点此查看                                                                                                                                                                    |                   |
| [XiaomiMIMO](https://platform.xiaomimimo.com/token-plan)       | [点击获取](https://platform.xiaomimimo.com/console/api-keys)                              | [点此查看](https://platform.xiaomimimo.com/docs/zh-CN/integration/tools-overview)                                                                                           |                   |
| [Apimart](https://apimart.ai/register?aff=QVui)                | [点此获取](https://apimart.ai/zh/keys)                                                    | [接口文档](https://docs.apimart.ai/cn)                                                                                                                                      |                   |


### 免费
---

- [NVIDIA免费token计划，有效期1年](https://mp.weixin.qq.com/s/nNCHartd3Ty2nJ-g2TIAQg)
- [OpenRouter&蚂蚁百灵活动，最高100次/天](https://mp.weixin.qq.com/s/rsgqmR2al0P2Tbv6a8eEPQ)
- [魔搭社区免费token活动](https://mp.weixin.qq.com/s/CmXJIByH6raoayXhxXrMGg)
- [讯飞星辰Maas活动，3.9元30天不限量](https://mp.weixin.qq.com/s/0aZgDuTYqu5uUUYmqTueA)
- [Xiaomi MiMo百亿token计划，30天最高可申请16亿](https://mp.weixin.qq.com/s/uZ-NlBmM5jNzd9VwNNxSlQ)
- [小米 MiMo V2.5邀请活动](https://mp.weixin.qq.com/s/OWuUjynd9QUL71RVVsInxg)
- [PrintCap](https://printcap.ai/register?aff=X3WYF22EDRJ6)  注册送 20刀额度  



### 参考：

----



一键创建 `~/.claude/settings.json` 文件

CMD 创建文件命令

```
mkdir "%USERPROFILE%\.claude" 2>nul & type nul > "%USERPROFILE%\.claude\settings.json"
```

直接打开这个文件（用记事本编辑）

```
mkdir "%USERPROFILE%\.claude" 2>nul & type nul > "%USERPROFILE%\.claude\settings.json"
```


粘贴替换自己的API

```
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "你的API",
    "ANTHROPIC_MODEL": "deepseek-v4-flash",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-v4-pro",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-v4-pro",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-v4-flash"
  },
  "includeCoAuthoredBy": false,
  "skipDangerousModePermissionPrompt": true
}
```
---

> 📎 [[笔记/index|📒 返回笔记索引]]

