---
title: 02-创建skill软链接
time: 2026-06-07
tags:
  - claude
---
中央仓库

```
start %USERPROFILE%\.agents\skills
```

Claude code技能目录

```
start %userprofile%\.claude\skills
```

WorkBuddy技能目录

```
start %userprofile%\WorkBuddy\Claw\.workbuddy\skills
```


先删除原来的空目录（如果有）：

cmd

```
rd "%userprofile%\.claude\skills"
rd "%userprofile%\WorkBuddy\Claw\.workbuddy\skills"
```

然后创建软链接：

cmd

```
mklink /D "%userprofile%\.claude\skills" "%USERPROFILE%\.agents\skills"
mklink /D "%userprofile%\WorkBuddy\Claw\.workbuddy\skills" "%USERPROFILE%\.agents\skills"
```

---

### 命令说明

- /D = 创建文件夹软链接
- 左边是要生成的快捷方式位置
- 右边是真实中央仓库位置
- 执行后三个目录完全同步，改一个全生效
---

> 📎 [[笔记/index|📒 返回笔记索引]]

