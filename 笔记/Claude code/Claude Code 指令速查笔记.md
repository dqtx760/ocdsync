---
title: Claude Code 指令速查笔记
time: 2026-06-07
tags:
  - claude
---

## 一、上下文管理指令
1. `/context` 查看剩余上下文容量
2. `/compact` 压缩对话，指定保留核心内容
3. `/clear` 清空上下文，开启新对话

## 二、代码回退恢复指令
1. `Ctrl + _` 撤销单文件上一步修改
2. `/rewind` 整体对话+代码一键回退
3. `/branch` 创建对话分支，保留原版工程
4. `/resume` 接续历史分支继续编写

## 三、额度&模型调控指令
1. `/cost` 查看按量付费消耗金额
2. `/usage` 查看订阅剩余窗口额度
3. `/effort` 调节思考深度：low/medium/high/max/xhigh
4. `/model` 切换模型：Opus/Sonnet/Haiku

## 四、隐藏实用高效指令
1. `/btw` 临时插话提问，不存入对话历史
2. `/diff` 查看每一轮代码修改对比记录
3. `/simplify` 一键精简代码、优化逻辑结构

## 五、权限免确认操作
1. `/permissions` 批量预设授权，关闭重复弹窗
2. `Shift + Tab` 快速切换权限模式：普通/自动/规划
3. 启动参数：`claude --dangerously-skip-permissions` 全程跳过权限确认

## 六、全套快捷键（全部补齐）
1. `Ctrl + J` 换行输入，不直接发送
2. `Ctrl + R` 搜索历史对话与指令
3. `Shift + Tab` 切换权限运行模式
4. 连续按**两次 Esc** 快速回退（等同于/rewind）

## 七、日常实战组合用法
1. 对话混乱臃肿
/context → /compact → /clear
2. 代码修改出错崩盘
Ctrl+_ 撤销 → /rewind 回退 → /branch 兜底
3. 节省额度降低消耗
/cost /usage 查用量 → /effort 降强度 → /model 换轻量模型
4. 频繁权限弹窗干扰
/permissions 预设授权 + Shift+Tab 开启自动执行


原文
https://www.doubao.com/thread/w0fb1afc45aa98efb
---

> 📎 [[笔记/index|📒 返回笔记索引]]

