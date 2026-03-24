# agents-awesome 无登录曝光计划

> 不依赖任何账号/API，纯内容驱动 + 自动化提交的有机增长策略

---

## 策略核心

**"让发现发生"** 而不是 "主动发帖推销"

GitHub 是全球最大开发者社区，每天有数百万人搜索"awesome AI agents"。我们只需要：
1. 让 GitHub 搜索排名靠前
2. 让其他平台的文章/目录自然引用我们
3. 让自动化工具替我们完成提交

---

## 一、GitHub 搜索优化（一次性，长期有效）

GitHub 搜索是最大的自然流量入口。

**当前问题**：README 的 description 只有简短一行

**解决方案**：在 `_data/trending_*.json` 的 description 字段加入关键词

实际上我们已经在 README.md 中加了描述（昨晚已做）。但还有一个重要动作：

**为 repo 添加 Topics**（通过 GitHub web 界面手动操作一次）：
```
Topics: ai-agents, autonomous-agents, multi-agent, claude-code, cursor, 
        openclaw, agent-framework, llm-tools, productivity-automation, 
        rag, knowledge-graph, coding-agent
```

> Master 需要在 repo 首页右侧点击 "Add topics" 添加以上标签

---

## 二、提交到 awesome-list 生态（一次性）

awesome 列表之间会互相引用。主动提交给以下列表，被收录后获得稳定反链：

### 必须提交的列表

1. **[awesome](https://github.com/sindresorhus/awesome)** — 给 maintainer 发 PR 申请加入
2. **[awesome-selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted)** — 如果有自托管相关内容
3. **[awesomeAINLP](https://github.com/veryv/awesomeAINLP)** — AI/NLP 相关列表
4. **[awesome-python](https://github.com/vinta/awesome-python)** — 如果有 Python 相关内容

### 提交格式
```
## AI Agents

- [agents-awesome](https://github.com/charlie-cao/agents-awesome) - ⭐ Curated list of AI agent frameworks, skills, and tools for coding agents. Updated daily.
```

---

## 三、SEO 文章矩阵（每周自动化）

### 平台优先级

| 平台 | 语言 | SEO 权重 | 难度 | 备注 |
|------|------|----------|------|------|
| **掘金** (juejin.cn) | 中文 | ⭐⭐⭐⭐⭐ | ⭐⭐ | 国内开发者必读 |
| **知乎** (zhihu.com) | 中文 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 需要知乎账号 |
| **Dev.to** (dev.to) | 英文 | ⭐⭐⭐⭐ | ⭐⭐ | 欧美开发者社区 |
| **Medium** | 英文 | ⭐⭐⭐ | ⭐⭐ | 需要账号 |
| **CNode** (cnodejs.org) | 中文 | ⭐⭐⭐ | ⭐ | Node.js 社区 |

### 文章策略

**每周生成 1 篇 SEO 文章**，内容基于 trending 数据 + 技能进化报告：

```
文章结构：
1. 本周 AI Agent 领域 5 大趋势（基于 trending 数据）
2. 3 个值得关注的新项目
3. 实战技巧：如何用 AI Agent 提升开发效率
4. 资源推荐：本文提到的所有工具 → 链接到 agents-awesome
```

**每篇文章末尾加 CTA**：
```
> 📋 完整资源列表和更多工具 → github.com/charlie-cao/agents-awesome
> 记得 Star 随时查看最新更新
```

---

## 四、Newsletter 聚合站（一次性）

提交到以下目录，获得 newsletter 作者/读者的自然发现：

| 目录 | URL | 说明 |
|------|-----|------|
| ** newsletter-hub.org** | newsletter-hub.org | 免费提交 |
| ** RSS.com** | rss.com | 提交 RSS feed |
| ** Blogarama** | blogarama.com | 博客目录 |
| ** JavaScripting** | javascripting.com | 开发者资源 |

---

## 五、Hacker News + Product Hunt（关键时刻提交）

### Hacker News
- 有重大更新时（首次发布、里程碑）提交到 news.ycombinator.com/submit
- **不需要每日操作**，关键时刻提交即可
- HN 的流量巨大，一个好的标题可以直接带来 500+ stars

### Product Hunt
- 同样关键时刻提交
- 提交后可以分享到 Twitter/Telegram 动员朋友投票

---

## 六、自动化曝光脚本

创建一个专门的 `outreach_engine.mjs` 来执行：

```javascript
// 待实现的功能
async function autoSubmit() {
  // 1. 检查是否有新内容可以推广
  // 2. 生成 SEO 文章草稿（基于 trending）
  // 3. 检查各平台的提交状态
  // 4. 生成 outreach 报告
}
```

---

## 七、反向链接建设

每获得一个外部网站的链接，GitHub 搜索权重就会提升一点。

**自然获取反链的方式**：
1. 在别人提 issue/PR 时自然提及我们的工具
2. 在社区回答问题时引用 agents-awesome 作为资源
3. 别人写文章时引用（需要内容质量）

---

## 八、执行优先级

### 今天可以完成（一次性）
- [ ] 添加 GitHub Topics（Master 手动）
- [ ] 提交到 awesome list 生态
- [ ] 提交到 newsletter 目录

### 本周开始自动化
- [ ] 创建 SEO 文章生成器
- [ ] 每周在掘金发布文章

### 有里程碑时
- [ ] Hacker News 提交（首次发布时）
- [ ] Product Hunt 提交（达到 100 Stars 时）

---

## 九、预期效果

| 渠道 | 时间 | 预期流量 |
|------|------|----------|
| GitHub 搜索优化 | 1-4 周 | +30-50 Stars/月 |
| 掘金文章 | 持续 | +20-100 Stars/月 |
| Dev.to | 持续 | +10-50 Stars/月 |
| awesome 列表收录 | 一次性 | +50-200 Stars（持续）|
| Hacker News | 有更新时 | +200-500 Stars（一次性爆发）|

**综合预期：稳态下每月 +100-400 Stars**，不需要任何付费推广。

---

_最后更新：2026-03-23_
