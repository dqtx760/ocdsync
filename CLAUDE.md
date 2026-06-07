# Nolebase 知识库 — CLAUDE.md

## 项目概述

基于 VitePress + Obsidian 的个人知识库网站。采用 Karpathy "LLM Wiki" 模式：原始笔记（raw sources）存储在 `笔记/{topic}/`，由 LLM 编译为结构化 Wiki 输出到 `笔记/Wiki/`。

## 目录结构

```
nolebase-template/
├── 笔记/                    ← 原始资料（只读不改）
│   ├── Claude code/          Claude Code 相关笔记（14 篇）
│   ├── Codex/                Codex 相关笔记（27 篇）
│   ├── Obsidian/             Obsidian 相关笔记（15 篇）
│   ├── github/               GitHub 相关笔记（2 篇）
│   ├── other/                其他笔记
│   ├── Wiki/                 ← 编译输出层（LLM 维护）
│   │   ├── sources/          来源摘要
│   │   ├── entities/         实体：人/工具/产品
│   │   ├── concepts/         概念：框架/方法论
│   │   ├── syntheses/        综合：跨源分析
│   │   ├── index.md          全局注册表
│   │   └── log.md            操作日志
│   └── index.md              ← 全局索引（自动维护）
├── .vitepress/               VitePress 配置与主题
│   ├── config.ts             站点配置
│   ├── styles/main.css       全局样式
│   └── theme/                主题组件
├── .claude/skills/           本地技能
│   ├── ingest/SKILL.md       编译流水线
│   ├── query/SKILL.md        问答引擎
│   ├── lint/SKILL.md         质量门禁
│   └── archive/SKILL.md      索引编织器
└── CLAUDE.md                 ← 本文件
```

## 可用技能

| 命令               | 功能                                        |
| ---------------- | ----------------------------------------- |
| `/ingest <path>` | 将原始笔记编译到 Wiki（Explore 并行扫描 + 知识提取 + 增量更新） |
| `/query <问题>`    | 基于 Wiki 知识库回答问题（禁止凭记忆回答）                  |
| `/lint`          | Wiki 健康度检查（死链/孤岛/冲突/索引一致性）                |
| `/archive`       | 更新 笔记/index.md 索引并为每篇笔记添加回链               |

## 核心约定

### 源文件读写规则
- **源文件只读不改**：`笔记/{topic}/` 下的文件在 ingest 时只读取，不修改内容
- **唯一例外**：archive 技能可在笔记末尾追加回链 `> 📎 [[笔记/index|📒 返回笔记索引]]`
- **增量更新**：已处理过的文件只追加新信息，不覆盖

### 索引格式
- `笔记/index.md` 按主题分类，使用 `[[双链]]` 格式
- 文件名含特殊字符（`&`、`！`、`、`、`🔌` 等）时降级为 Markdown 超链接

### Wiki 页面结构
- Source 摘要：`笔记/Wiki/sources/摘要-{slug}.md`
- Entity 页面：`笔记/Wiki/entities/{EntityName}.md`
- Concept 页面：`笔记/Wiki/concepts/{ConceptName}.md`
- Synthesis 页面：`笔记/Wiki/syntheses/{SynthesisName}.md`
- 所有页面必须有 frontmatter（`title`, `type`, `tags`, `last_updated`, `confidence`）

### Git 历史
- 最近更新：2026-06-07
- 主要改动：目录结构从旧版 `01-输入/` → `03-输出/wiki/` 迁移到 `笔记/` → `笔记/Wiki/`
