# agents-awesome 营销系统 - 设置清单

> 系统已搭建完毕，以下是完成/待完成的配置项

---

## ✅ 已完成

- [x] 核心执行引擎 `_scripts/autonomous_marketing.mjs`
- [x] 每日定时任务 × 4 个（已注册到 OpenClaw Cron）
- [x] 营销架构文档 `MARKETING.md`
- [x] 内容输出目录 `content/`（自动创建）

## ⚠️ 待完成（阻断 Twitter 发帖）

### 1. 配置 Twitter API 凭证

Twitter 发帖需要 4 个凭证，**必须全部填写**：

| 变量名 | 获取地址 | 说明 |
|--------|----------|------|
| `TWITTER_CONSUMER_KEY` | [developer.x.com](https://developer.x.com) → Dashboard → Keys and tokens | API Key |
| `TWITTER_CONSUMER_SECRET` | 同上 | API Key Secret |
| `TWITTER_ACCESS_TOKEN` | 同上 → Access Token | 用户级 Access Token |
| `TWITTER_ACCESS_TOKEN_SECRET` | 同上 | 用户级 Access Token Secret |

**注意**：GitHub repo 地址为 `charlie-cao/agents-awesome`，所有系统已配置此地址。

**配置方式（二选一）：**

**方式 A：写入系统环境变量（推荐）**
```powershell
# PowerShell 永久写入当前用户环境变量
[System.Environment]::SetEnvironmentVariable("TWITTER_CONSUMER_KEY", "你的APIKey", "User")
[System.Environment]::SetEnvironmentVariable("TWITTER_CONSUMER_SECRET", "你的APISecret", "User")
[System.Environment]::SetEnvironmentVariable("TWITTER_ACCESS_TOKEN", "你的AccessToken", "User")
[System.Environment]::SetEnvironmentVariable("TWITTER_ACCESS_TOKEN_SECRET", "你的AccessTokenSecret", "User")
```
**方式 B：写入 openclaw.json**
```json
{
  "env": {
    "TWITTER_CONSUMER_KEY": "你的APIKey",
    "TWITTER_CONSUMER_SECRET": "你的APISecret",
    "TWITTER_ACCESS_TOKEN": "你的AccessToken",
    "TWITTER_ACCESS_TOKEN_SECRET": "你的AccessTokenSecret"
  }
}
```

### 2. 配置 GitHub 自动 Push

当前 `autoPush: false`，每次 commit 后需要手动 `git push`。

如需开启自动 push：
```js
// 编辑 _scripts/autonomous_marketing.mjs
const CONFIG = {
  github: {
    autoCommit: true,
    autoPush: true,   // 改为 true（注意：无法回退，push 即公开）
  }
};
```

---

## 📋 定时任务清单

| 任务 | Cron 表达式 | 说明 |
|------|------------|------|
| 抓取 Trending | `0 30 0 * * *` | 每日 00:30 (GMT+8) |
| 生成+发推 | `0 0 1 * * *` | 每日 01:00 (GMT+8) |
| Git 提交 | `0 0 2 * * *` | 每日 02:00 (GMT+8) |
| 营销周报 | `0 0 9 * * 1` | 每周一 09:00 (GMT+8) |

查看任务：
```bash
openclaw cron list
```

手动触发测试：
```bash
openclaw cron run <job-id>
```

---

## 🔧 手动维护命令

```bash
# 测试抓取（单独运行）
cd C:\Users\charlie\work\agents-awesome
node _scripts/autonomous_marketing.mjs --fetch

# 测试内容生成
node _scripts/autonomous_marketing.mjs --tweet

# 测试周报生成
node _scripts/autonomous_marketing.mjs --report

# 测试 Git 提交（不 push）
node _scripts/autonomous_marketing.mjs --commit
```

---

## 📁 输出文件结构

```
agents-awesome/
├── _scripts/
│   ├── autonomous_marketing.mjs  ← 核心引擎
│   └── fetch_trending.py          ← 数据抓取
├── _data/
│   ├── trending_20260323.json     ← 每日热门数据
│   └── trending_20260323.md
└── content/
    ├── tweets_20260323.json       ← 生成的推文内容
    ├── tweets_20260323.md         ← Markdown 预览
    └── weekly_report_20260323.md ← 周报
```
