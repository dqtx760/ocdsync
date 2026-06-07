---
title: GitHub上传命令
time: 2026-06-07
tags:
  - github
---

本教程详细介绍如何将本地项目上传到 GitHub 仓库。

## 准备工作

### 1. 安装 Git

```powershell
winget install Git.Git
```

### 2. 配置 Git 用户信息

```bash
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的GitHub邮箱"
```

### 3. 生成 SSH 密钥（可选，推荐）

```bash
ssh-keygen -t ed25519 -C "你的邮箱"
```

然后将 `~/.ssh/id_ed25519.pub` 的内容添加到 GitHub → Settings → SSH Keys

---

## 上传步骤

### 方法一：命令行上传（推荐）

#### 1. 初始化 Git 仓库

进入项目目录，初始化仓库：

```bash
cd /path/to/your/project
git init
```

#### 2. 添加文件到暂存区

```bash
git add .
```

或者添加指定文件：

```bash
git add README.md
```

#### 3. 提交改动

```bash
git commit -m "first commit"
```

#### 4. 在 GitHub 创建仓库

访问 https://github.com/new 创建空仓库，**不要勾选** README Initialize this repository with:

获取仓库地址，格式如：
- HTTPS: `https://github.com/用户名/仓库名.git`
- SSH: `git@github.com:用户名/仓库名.git`

#### 5. 关联远程仓库

```bash
git remote add origin https://github.com/用户名/仓库名.git
```

#### 6. 推送到 GitHub

```bash
git push -u origin master
```

如果是 main 分支：

```bash
git push -u origin main
```

---

### 方法二：使用 gh CLI

#### 1. 安装 gh

```powershell
winget install GitHub.cli
```

#### 2. 登录 GitHub

```bash
gh auth login
```

按提示选择：
- GitHub.com → Yes
- HTTPS → Yes
- 登录方式 → GitHub CLI

#### 3. 创建仓库并推送

```bash
cd /path/to/project
gh repo create my-repo --public --source=. --push
```

或者分步操作：

```bash
gh repo create username/my-repo --public
git remote add origin https://github.com/username/my-repo.git
git push -u origin master
```

---

### 方法三：使用 GitHub Desktop

1. 下载 GitHub Desktop: https://desktop.github.com/
2. 登录 GitHub 账号
3. File → Add Local Repository
4. 选择项目文件夹，点击 "Publish repository"

---

## 常用命令速查

| 命令 | 说明 |
|------|------|
| `git status` | 查看仓库状态 |
| `git add .` | 添加所有文件 |
| `git commit -m "信息"` | 提交改动 |
| `git remote -v` | 查看远程仓库 |
| `git push` | 推送到远程 |
| `git pull` | 拉取远程更新 |
| `git log` | 查看提交历史 |

---

## 常见问题

### Q: 提交后想撤销？

```bash
git reset --soft HEAD~1
```

### Q: 修改了远程仓库地址？

```bash
git remote set-url origin 新地址
```

### Q: 推送到另一个分支？

```bash
git push origin master:develop
```

### Q: 每次推送都要输入账号密码？

推荐使用 SSH 方式，或配置 Credential Helper：

```bash
git config --global credential.helper store
```

---

## 完整示例

```bash
# 1. 进入项目目录
cd D:\project2026\github\Snaply

# 2. 初始化
git init

# 3. 添加文件
git add .

# 4. 提交
git commit -m "feat: initial commit"

# 5. 关联远程（替换为你的仓库地址）
git remote add origin https://github.com/dqtx760/Snaply.git

# 6. 推送
git push -u origin master
```
---

> 📎 [[笔记/index|📒 返回笔记索引]]

