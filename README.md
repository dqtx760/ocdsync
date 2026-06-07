# ocdsync

基于 Obsidian + Claude Code 的笔记博客。笔记写在 Obsidian 中，用 VitePress 构建为静态网站。

## 本地开发

需要 Node.js / pnpm

```bash
# 安装依赖
pnpm install

# 本地开发（热更新）
pnpm dev

# 构建生产资源
pnpm build

# 本地预览构建结果
pnpm serve
```

## 部署到 Cloudflare Pages

1. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers 和 Pages → Pages
2. 点 **连接到 Git**，选择 `dqtx760/ocdsync` 仓库
3. 构建设置：

   | 字段 | 填写 |
   |------|------|
   | 框架预设 | **None**（不要选自动检测） |
   | 构建命令 | `pnpm run build` |
   | 输出目录 | **`.vitepress/dist`**（不是 `dist`） |

4. 点 **保存并部署**

> ⚠️ 框架预设必须选 None，否则 Cloudflare 会错误使用 `wrangler deploy` 导致构建失败。

## 目录结构

```
├── 笔记/                    ← Obsidian 笔记源文件
│   ├── Claude code/          Claude Code 笔记
│   ├── Codex/                Codex 笔记
│   ├── Obsidian/             Obsidian 笔记
│   ├── github/               GitHub 笔记
│   └── Wiki/                 LLM 自动编译的知识库
├── .vitepress/              VitePress 配置
│   ├── config.ts             站点配置
│   ├── styles/main.css       全局样式
│   └── theme/                主题组件
├── .claude/skills/           Claude Code 技能
└── index.md                 首页
```
