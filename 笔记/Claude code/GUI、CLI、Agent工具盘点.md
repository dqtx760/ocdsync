---
title: GUI、CLI、Agent工具盘点
time: 2026-06-07
tags:
  - claude
---


## AI IDE（GUI，带完整编辑/管理/调试）
- [**Cursor**](https://cursor.sh/)（最火，综合最强，个人首选）
- [**Windsurf**](https://codeium.com/windsurf)（原Codeium，体验好、多模型）
- [**Trae**](https://www.trae.ai/)（字节，中文适配最强、免费）
- [**Zed**](https://zed.dev/)（高性能编辑器+AI，速度极快）
- [**Antigravity**](https://antigravity.dev/)（新兴AI IDE，轻量智能）
- [**阿里Qoder**](https://qoder.aliyun.com/)（阿里系，中文项目友好）

## 传统 IDE + AI 插件
- [**VS Code**](https://code.visualstudio.com/) + [**Copilot**](https://github.com/features/copilot)（生态最稳、企业标配）
- [**IntelliJ IDEA 2026**](https://www.jetbrains.com/idea/) + JetBrains AI（Java/Kotlin 最强）
- [**VS Code**](https://code.visualstudio.com/) + [**通义灵码**](https://lingma.aliyun.com/) / [**文心快码**](https://smartcode.baidu.com/)（国产、中文强）

## 其他 GUI 形态（非完整 IDE，AI 助手类）
- [**CodePilot**](https://codepilot.dev/)（桌面端AI编程助手）
- [**WorkBuddy**](https://workbuddy.cloud.tencent.com/)（腾讯云 全场景 AI 智能体工作台）
- [**WorkAny**](https://workany.ai/)（多场景AI工作台）
- [**Craft Agents**](https://craftagents.com/)（可视化Agent编排）
- [**oh-my-openagent**](https://github.com/open-agent/oh-my-openagent)（GUI 管理 OpenClaw 系）
- [**claude-desktop-cn**](https://github.com/claude-desktop/claude-desktop-cn)（Claude 桌面版汉化）
- [**Claude Desktop**](https://claude.ai/download)（官方桌面客户端）

## 纯 CLI 命令行 AI Agent
### 海外版
- [**Claude Code**](https://docs.anthropic.com/claude/code)（Anthropic，代码能力最强）
- [**Codex CLI**](https://github.com/openai/codex-cli)（OpenAI，工程化稳）
- [**Gemini CLI**](https://ai.google.dev/docs/gemini_cli)（Google，多模态强）
- [**GitHub Copilot CLI**](https://github.com/github/copilot-cli)（GitHub/Microsoft，生态无缝）
- [**Aider**](https://aider.chat/)（独立开源，轻量好用）
- [**Hermes Agent**](https://github.com/nousresearch/hermes)（Nous Research，开源）
- [**OpenClaw**](https://github.com/openclaw/openclaw)（社区开源生态）
- [**OpenCode**](https://github.com/opencodeai/opencode)（OpenCode AI，开源）

### 国产版
- [**Qwen Code**](https://dashscope.console.aliyun.com/code)（通义千问/阿里云）
- [**iFlow CLI**](https://flow.aliyun.com/)（阿里心流）
- [**CodeBuddy Code**](https://codebuddy.tencent.com/)（腾讯）
- [**CodeGeeX CLI**](https://codegeex.cn/)（智谱AI/腾讯云）
- [**Kimi CLI**](https://kimi.moonshot.cn/)（月之暗面 Moonshot）
- [**KimiClaw**](https://github.com/moonshotai/kimiclaw)（月之暗面，OpenClaw 系）
- [**DeepSeek-TUI**](https://www.deepseek.com/)（深度求索 DeepSeek）
- [**SolonCode CLI**](https://soloncode.com/)（无耳科技）
- [**AtomCode**](https://github.com/atomcodeai)（原子系）
- [**ArkClaw**](https://www.volcengine.com/)（字节火山引擎，OpenClaw 系）
- [**QClaw**](https://cloud.tencent.com/)（腾讯，OpenClaw 系）
- [**LangCLI**](https://github.com/langcli/langcli)（社区开源）

### 其他魔改工具
- [**Newtype-os**](https://github.com/newtypeai/newtype-os)

## 桥梁联动型 CLI
自身无独立 AI 推理能力、不能单独运行，依附主流 AI Agent 调用，充当中间桥梁，让 AI 通过它调用第三方软件 / 平台 / 系统能力，实现跨生态操控。

**社交内容发布互动类**
- [**twitter**](https://twitter.com/) X 平台 CLI
- [**jike**](https://jike.app/) 即刻 CLI
- [**xhs**](https://www.xiaohongshu.com/) 小红书 CLI
- [**weibo-cli**](https://weibo.com/) 微博 CLI
- [**bilibili-cli**](https://www.bilibili.com/) B 站 CLI
- [**yt-dlp**](https://github.com/yt-dlp/yt-dlp) 油管/视频工具
- [**discord-cli**](https://discord.com/) 社群社交 CLI
- [**tg-cli**](https://telegram.org/) 电报 CLI
- [**v2ex-cli**](https://www.v2ex.com/) 论坛社区 CLI
- [**rdt-cli**](https://www.reddit.com/) 海外社区 CLI
- [**xiaoyuzhou-cli**](https://www.xiaoyuzhoufm.com/) 播客平台 CLI

**文档协作办公载体类**
- [**lark-cli**](https://www.feishu.cn/) 飞书 CLI
- [**notion-cli**](https://www.notion.so/) 知识库文档 CLI
- [**ticktick-cli**](https://www.dida365.com/) 滴答清单任务 CLI
- [**gmail-cli**](https://mail.google.com/) 谷歌邮箱 CLI
- [**cc-weixin**](https://mp.weixin.qq.com/) 微信公众号 CLI
- [**wechat-ai**](https://weixin.qq.com/) 微信 AI 工具

**MCP 协议对接类**
- [**lark-mcp**](https://www.feishu.cn/) 飞书 MCP
- [**douyin-mcp-server**](https://www.douyin.com/) 抖音 MCP 服务端
- [**linkedin-scraper-mcp**](https://www.linkedin.com/) 领英抓取 MCP
- [**chrome-devtools-mcp**](https://developer.chrome.com/) 浏览器调试 MCP

**通用检索抓取工具类**
- [**gh**](https://cli.github.com/) GitHub CLI
- [**git**](https://git-scm.com/) 版本控制
- [**gsearch**](https://github.com/gsearch/gsearch) 谷歌搜索
- [**xreach**](https://github.com/agent-reach/xreach) 多平台抓取
- [**xfetch**](https://github.com/agent-reach/xfetch) 网页内容抓取
- [**mcporter**](https://exa.ai/) Exa 全网 AI 搜索

## 工具选型总结
- **GUI IDE 第一梯队**：Cursor、Trae、Windsurf
- **CLI Agent 第一梯队**：Claude Code、Qwen Code、Aider
- **企业团队使用**：VS Code+Copilot、IntelliJ+JetBrains AI
- **中文免费优选**：Trae、Qwen 系列

## GUI与AI IDE判定标准
**GUI形态**：只要具备可视化图形窗口、鼠标点击操作界面，无需纯命令行输入即可上手操作，统一归为GUI形态；

**AI IDE范畴**：不仅拥有图形界面，还集成专业代码编辑、项目文件管理、终端运行、调试能力，同时内置AI编程协作、智能改码、项目开发辅助等核心开发功能，才算真正属于AI IDE。
---

> 📎 [[笔记/index|📒 返回笔记索引]]

