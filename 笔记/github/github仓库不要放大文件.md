---
title: github仓库不要放大文件
time: 2026-06-07
tags:
  - github
---


## 问题

GitHub 对单文件大小有明确限制：

| 限制 | 说明 |
|------|------|
| **50 MB** | 警告：超过此大小会收到警告，但仍可推送 |
| **100 MB** | 硬限制：超过此大小直接拒绝推送 |

exe 安装包、大型 zip 压缩包、视频文件等很容易超标。

**更麻烦的是**：一旦大文件进入了 Git 提交历史，即使你后续删除了文件、提交了删除操作，推送仍然会失败——因为 GitHub 会检查**所有历史提交**中的文件大小。

```
remote: error: File xxx.exe is 145.51 MB; this exceeds GitHub's file size limit of 100.00 MB
remote: error: GH001: Large files detected.
```

---

## 解决方案

### ❌ 无效的做法

```bash
# 这样做没用！大文件仍然在历史提交中
git rm -r --cached "大文件目录"
git commit -m "删除大文件"
git push
```

### ✅ 方案 A：用 git-filter-repo 彻底清理历史（推荐）

这是最彻底的方案，直接从 Git 历史中删除大文件的所有痕迹。

**第 1 步：安装 git-filter-repo**

```bash
pip install git-filter-repo
```

**第 2 步：执行清理**

```bash
# 清理单个文件
git filter-repo --path "路径/大文件.exe" --invert-paths --force

# 清理整个目录（推荐）
git filter-repo --path "附件-12个软件包/" --invert-paths --force
```

**第 3 步：重新添加远程仓库并强制推送**

```bash
# git-filter-repo 会移除 origin，需要重新添加
git remote add origin https://github.com/你的用户名/你的仓库.git
git push --force origin master
```

> ⚠️ `--force` 会重写历史，如果有人 clone 过你的仓库，他们需要重新 clone。

---

### ✅ 方案 B：用 BFG Repo-Cleaner（替代工具）

如果不想装 Python 环境，可以用 BFG（需要 Java）：

```bash
# 下载 BFG
wget https://repo1.maven.org/maven2/com/madgag/bfg/0.14.0/bfg-0.14.0.jar

# 删除所有大于 100MB 的文件
java -jar bfg-0.14.0.jar --strip-blobs-bigger-than 100M

# 清理残余
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 强制推送
git push --force origin master
```

---

### ✅ 方案 C：用 Git LFS 管理大文件（治本）

如果确实需要版本管理大文件，用 Git LFS：

```bash
# 安装 Git LFS
git lfs install

# 跟踪特定类型的大文件
git lfs track "*.exe"
git lfs track "*.zip"

# 提交 .gitattributes（必须提交这个文件）
git add .gitattributes

# 正常提交和推送
git add .
git commit -m "Add large files via LFS"
git push origin master
```

Git LFS 会把大文件存在 LFS 服务器上，Git 仓库里只保留一个指针文件。

---

## 预防措施

### 配置 .gitignore

在仓库根目录创建 `.gitignore`，提前屏蔽大文件：

```gitignore
# 忽略所有 exe 文件
*.exe

# 忽略所有 zip 文件
*.zip

# 忽略特定目录
附件-*/
temp/
cache/

# 忽略大于 50MB 的文件（Git 本身不支持此语法，仅供提醒）
# 需要配合 pre-commit hook 使用
```

### 推送前检查

```bash
# 查找仓库中大于 50MB 的文件
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | awk '/^blob/ {if($3 > 50*1024*1024) print $3/1024/1024 " MB\t" $4}' | sort -n
```

---

## 总结

| 场景 | 推荐方案 |
|------|----------|
| 误提交了大文件，想彻底清理 | **方案 A：git-filter-repo** |
| 不方便装 Python，想要简单工具 | **方案 B：BFG Repo-Cleaner** |
| 确实需要版本管理大文件 | **方案 C：Git LFS** |
| 防止以后再误提交 | **配置 .gitignore** |
---

> 📎 [[笔记/index|📒 返回笔记索引]]

