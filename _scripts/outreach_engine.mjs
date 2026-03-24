/**
 * agents-awesome 曝光引擎
 * 
 * 无需登录账号，通过内容驱动 + 自动化提交实现有机增长
 * 
 * 用法:
 *   node outreach_engine.mjs --seo-article    生成 SEO 文章草稿
 *   node outreach_engine.mjs --backlinks     检查反向链接
 *   node outreach_engine.mjs --pulse         快速状态
 *   node outreach_engine.mjs --all           执行全部
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUTREACH_FILE = path.join(ROOT, '_data', 'outreach_status.json');
const CONTENT_DIR = path.join(ROOT, 'content');
const ARTICLES_DIR = path.join(CONTENT_DIR, 'articles');

const REPO_URL = 'charlie-cao/agents-awesome';
const REPO_GITHUB_URL = `https://github.com/${REPO_URL}`;

const log = (type, msg) => {
  const ts = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const icons = { info: 'ℹ️', ok: '✅', warn: '⚠️', error: '❌', spark: '✨' };
  console.log(`${icons[type] || '📌'} [${ts}] ${msg}`);
};

const getToday = () => new Date().toISOString().slice(0, 10).replace(/-/g, '');
const getDate = () => new Date().toISOString().slice(0, 10);

// ─── HTTP 请求 ─────────────────────────────────────────────────────
function httpGet(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0', ...headers },
      timeout: 8000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(httpGet(res.headers.location, headers));
        return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

// ─── 存储 ───────────────────────────────────────────────────────────
function loadOutreachStatus() {
  if (!fs.existsSync(OUTREACH_FILE)) {
    return {
      seoArticles: [],        // 已发布的文章
      seoArticlesDraft: [],   // 草稿
      backlinks: [],          // 反向链接
      directorySubmissions: [], // 目录提交状态
      lastRun: null,
      totalOrganicStars: 0    // 估算的自然增长 Stars
    };
  }
  return JSON.parse(fs.readFileSync(OUTREACH_FILE, 'utf8'));
}

function saveOutreachStatus(data) {
  data.lastRun = new Date().toISOString();
  fs.writeFileSync(OUTREACH_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// ─── 1. SEO 文章生成器 ─────────────────────────────────────────────
function generateSEOArticles() {
  log('info', '📝 正在生成 SEO 文章草稿...');
  
  // 读取最新的 trending 数据
  const dataDir = path.join(ROOT, '_data');
  const trendingFiles = fs.readdirSync(dataDir)
    .filter(f => f.startsWith('trending_') && f.endsWith('.json'))
    .sort();
  
  let trendingData = null;
  if (trendingFiles.length > 0) {
    try {
      trendingData = JSON.parse(fs.readFileSync(path.join(dataDir, trendingFiles[trendingFiles.length - 1]), 'utf8'));
    } catch (e) { /* ignore */ }
  }
  
  // 生成掘金文章（中文）
  const juejin = generateJuejinArticle(trendingData);
  
  // 生成 Dev.to 文章（英文）
  const devto = generateDevtoArticle(trendingData);
  
  const articles = [juejin, devto];
  
  // 保存文章
  if (!fs.existsSync(ARTICLES_DIR)) fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  
  const today = getToday();
  articles.forEach(article => {
    const filename = `seo_article_${article.platform}_${today}.md`;
    const filepath = path.join(ARTICLES_DIR, filename);
    fs.writeFileSync(filepath, article.content, 'utf8');
    log('ok', `文章已生成: content/articles/${filename}`);
  });
  
  return articles;
}

function generateJuejinArticle(trendingData) {
  const date = getDate();
  const weekStr = `2026年3月`;
  
  // 从 trending 中提取本周热门
  let topProjects = [];
  if (trendingData && trendingData.ai_agent_trending) {
    topProjects = trendingData.ai_agent_trending.slice(0, 5);
  } else if (trendingData && trendingData.top_repos) {
    topProjects = trendingData.top_repos.slice(0, 5);
  }
  
  // 如果没有数据，用占位符
  if (topProjects.length === 0) {
    topProjects = [
      { name: 'LangChain', stars: '130k+', description: 'AI Agent 开发框架', url: 'https://github.com/langchain-ai/langchain' },
      { name: 'Dify', stars: '110k+', description: '开源 LLM 应用开发平台', url: 'https://github.com/langgenius/dify' },
      { name: 'OpenClaw', stars: '330k+', description: '个人 AI 助手框架', url: 'https://github.com/openclaw/openclaw' },
    ];
  }
  
  const projectList = topProjects.map((p, i) => 
    `${i+1}. [${p.name}](${p.url || 'https://github.com'}) - ⭐ ${p.stars} | ${p.description || ''}`
  ).join('\n');
  
  const content = `# 2026年3月 AI Agent 热门项目TOP10

> ⏱️ 阅读时间：8分钟 | 📅 更新周期：每日自动更新

## 前言

AI Agent 赛道在 2026 年持续爆发。GitHub 上的 AI Agent 相关项目Stars增速已经达到去年同期的 **3 倍**。

本文整理了本月最热门的 AI Agent 项目，覆盖框架、工具、技能系统等多个维度。每个项目都附带了 GitHub 链接，开发者可以直接跳转查看。

## 本月 TOP 项目

${projectList}

## 重点推荐

### 1. OpenClaw — 个人 AI 助手新范式

OpenClaw 是一款开源的个人 AI 助手框架，支持 25+ 消息渠道（微信、Telegram、WhatsApp 等）。其独特的 SOUL.md 机制让 AI 拥有了持久化的"灵魂"，而不只是对话机器。

**核心特点**：
- 多渠道消息聚合
- SOUL.md / AGENTS.md 驱动的个性化
- 丰富的技能（Skills）生态
- 完全自托管，保护隐私

### 2. Dify — 快速构建 AI 应用

Dify 是一个开源的 LLM 应用开发平台，提供了可视化的工作流编排能力。

**适合场景**：
- 快速原型验证
- 企业内部 AI 应用
- RAG + Agent 的结合

### 3. LangChain — 生态最完整的 Agent 框架

LangChain 依然是 AI Agent 开发的事实标准。

---

## 如何快速上手 AI Agent 开发

### 第一步：选择一个框架

新手推荐从 **Dify** 或 **OpenClaw** 开始，上手门槛最低。

### 第二步：学习 Agent 的核心概念

无论选择哪个框架，都需要理解：
- **工具调用（Tool Calling）**：让 LLM 使用外部工具
- **记忆系统（Memory）**：让 Agent 记住对话上下文
- **规划（Planning）**：让 Agent 能够分解复杂任务

### 第三步：构建你的第一个 Agent

以 OpenClaw 为例：

\`\`\`bash
# 安装
npm install -g openclaw

# 初始化
openclaw setup

# 启动
openclaw start
\`\`\`

然后配置你的 SOUL.md，一个专属的个人 AI 助手就完成了。

---

## 资源推荐

本文提到的所有项目都收录在 GitHub 精选列表：

🔗 **[agents-awesome](https://github.com/${REPO_URL})** — AI Agent 领域最全资源汇总

每日自动更新，收录内容包括：
- 🤖 Agent 开发框架
- 💻 编程 Agent 工具
- 🧠 RAG 与记忆系统
- ⚡ 生产力与自动化
- 🔌 MCP 工具生态
- 📊 评估与基准测试

记得 ⭐ Star 随时查看最新更新！

---

## 总结

AI Agent 的时代已经到来。无论是想要提升开发效率的工程师，还是想要探索 AI 边界的爱好者，现在都是入场的最好时机。

从选择一个框架开始，今天就构建你的第一个 AI Agent 吧。

---

> 📋 完整资源列表 → [github.com/${REPO_URL}](https://github.com/${REPO_URL})
> ⭐ 如果对你有帮助，请给 agents-awesome 点个 Star
`;
  
  return {
    platform: 'juejin',
    title: '2026年3月 AI Agent 热门项目TOP10（持续更新）',
    content,
    status: 'draft',
    generatedAt: new Date().toISOString(),
    suggestedPostingTime: '周二/周四 20:00' // 掘金最佳时间
  };
}

function generateDevtoArticle(trendingData) {
  const date = getDate();
  
  let topProjects = [];
  if (trendingData && trendingData.ai_agent_trending) {
    topProjects = trendingData.ai_agent_trending.slice(0, 5);
  } else if (trendingData && trendingData.top_repos) {
    topProjects = trendingData.top_repos.slice(0, 5);
  }
  
  if (topProjects.length === 0) {
    topProjects = [
      { name: 'LangChain', stars: '130k+', description: 'The de facto standard for AI agent frameworks' },
      { name: 'Dify', stars: '110k+', description: 'Open-source LLM app development platform' },
      { name: 'OpenClaw', stars: '330k+', description: 'Personal AI assistant on your own devices' },
    ];
  }
  
  const projectCards = topProjects.map((p, i) =>
    `### ${i+1}. ${p.name}\n⭐ ${p.stars} — ${p.description || ''}\n🔗 [GitHub](${p.url || 'https://github.com'})\n`
  ).join('\n');
  
  const content = `# Top 10 AI Agent Projects on GitHub — March 2026

*Self-hosted personal AI assistants, agent frameworks, and developer tools — curated and updated daily.*

![AI Agents](https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800)

## Why AI Agents Matter in 2026

The AI agent ecosystem has exploded. Developers are no longer just building chatbots — they're building autonomous systems that can use tools, remember context, and collaborate.

If you're building anything with LLMs, you need to know these projects.

## Trending Projects

${projectCards}

## Getting Started with AI Agents

### For Beginners

Start with **OpenClaw** if you want a personal AI assistant, or **Dify** if you want to build AI applications without writing boilerplate.

### For Engineers

**LangChain** remains the industry standard for building production agent systems. Its comprehensive ecosystem covers:

- Tool calling and function execution
- Memory and context management
- RAG (Retrieval Augmented Generation)
- Multi-agent orchestration

### For Enterprise

Consider **Microsoft AutoGen** for multi-agent research, or **CrewAI** for rapid team-based agent prototyping.

## Curated Resources

All projects listed here are part of a daily-updated GitHub collection:

📋 **[agents-awesome](https://github.com/${REPO_URL})** — The most comprehensive AI agent resources list

Covers:
- 🤖 Agent frameworks
- 💻 Coding agents (Claude Code, Cursor, Codex)
- 🧠 RAG & memory systems
- ⚡ Productivity automation
- 🔌 MCP tool ecosystem
- 📊 Evaluation & benchmarks

**⭐ Star it to get daily updates!**

---

*This article is auto-generated from GitHub trending data and updated daily.*
`;
  
  return {
    platform: 'devto',
    title: 'Top 10 AI Agent Projects on GitHub — March 2026',
    content,
    status: 'draft',
    generatedAt: new Date().toISOString(),
    suggestedPostingTime: 'Wednesday 09:00 UTC' // Dev.to best time
  };
}

// ─── 2. 反向链接检查 ───────────────────────────────────────────────
async function checkBacklinks() {
  log('info', '🔗 正在检查反向链接...');
  
  const status = loadOutreachStatus();
  
  // GitHub Stars 数量（用于估算自然发现）
  let githubStars = 0;
  try {
    const data = await httpGet(`https://api.github.com/repos/${REPO_URL}`, {
      'Accept': 'application/vnd.github.v3+json'
    });
    const parsed = JSON.parse(data);
    githubStars = parsed.stargazers_count || 0;
  } catch (e) {
    // ignore
  }
  
  // 估算自然流量来源
  const estimatedSources = [];
  
  if (githubStars > 10) {
    estimatedSources.push({
      source: 'GitHub Explore / Trending',
      type: 'platform',
      estimatedImpact: '+20-50%',
      note: '随着 Stars 增长，出现在 trending 页面的概率增加'
    });
  }
  
  if (githubStars > 50) {
    estimatedSources.push({
      source: 'Google 搜索',
      type: 'search',
      estimatedImpact: '+30-100%',
      note: '"awesome AI agents" 等关键词搜索开始有排名'
    });
  }
  
  if (githubStars > 100) {
    estimatedSources.push({
      source: 'awesome list 引用',
      type: 'backlink',
      estimatedImpact: '+50-200%',
      note: '其他 awesome 列表开始引用我们的项目'
    });
  }
  
  if (status.seoArticles.length > 0) {
    estimatedSources.push({
      source: '博客/社区文章',
      type: 'content',
      estimatedImpact: '+100-300%',
      note: `${status.seoArticles.length} 篇文章正在带来流量`
    });
  }
  
  // 搜索 GitHub 上哪些项目引用了我们
  let citingRepos = [];
  try {
    const data = await httpGet(
      `https://api.github.com/search/code?q=${encodeURIComponent('charlie-cao/agents-awesome')}&per_page=5`,
      { 'Accept': 'application/vnd.github.v3+json' }
    );
    const parsed = JSON.parse(data);
    citingRepos = (parsed.items || []).map(item => ({
      name: item.repository.full_name,
      url: item.html_url
    }));
  } catch (e) {
    // 可能 rate limited
  }
  
  const result = {
    githubStars,
    estimatedSources,
    citingRepos,
    totalBacklinks: status.backlinks.length,
    lastChecked: new Date().toISOString()
  };
  
  log('ok', `GitHub Stars: ${githubStars}`);
  log('ok', `发现引用我们的仓库: ${citingRepos.length} 个`);
  
  return result;
}

// ─── 3. 生成曝光状态报告 ─────────────────────────────────────────
function generateOutreachReport(backlinkData, articles) {
  const today = getDate();
  const status = loadOutreachStatus();
  
  let md = `# 📣 agents-awesome 曝光状态报告\n\n`;
  md += `**生成时间**: ${today}\n`;
  md += `**GitHub Stars**: ${backlinkData.githubStars || '?'}\n\n`;
  
  md += `---\n\n`;
  md += `## 📊 GitHub 数据\n\n`;
  md += `| 指标 | 数值 |\n`;
  md += `|------|------|\n`;
  md += `| 当前 Stars | ${backlinkData.githubStars || '?'} |\n`;
  md += `| 估算自然增长率 | ${backlinkData.githubStars > 10 ? '+5-15/月' : '待启动'} |\n`;
  md += `| 引用我们的仓库 | ${backlinkData.citingRepos?.length || 0} |\n\n`;
  
  if (backlinkData.citingRepos?.length > 0) {
    md += `### 被引用的项目\n\n`;
    backlinkData.citingRepos.forEach(repo => {
      md += `- [${repo.name}](${repo.url})\n`;
    });
    md += '\n';
  }
  
  md += `## 📝 SEO 文章\n\n`;
  md += `**已发布**: ${status.seoArticles.length} 篇  \n`;
  md += `**草稿待发布**: ${status.seoArticlesDraft?.length || 0} 篇\n\n`;
  
  if (articles && articles.length > 0) {
    md += `### 本次生成的文章\n\n`;
    articles.forEach(a => {
      md += `#### ${a.platform.toUpperCase()} - ${a.title}\n\n`;
      md += `- 状态: ${a.status}\n`;
      md += `- 建议发布时间: ${a.suggestedPostingTime}\n`;
      md += `- 文件: content/articles/seo_article_${a.platform}_${today}.md\n`;
      md += `- 字数: ~${Math.round(a.content.length / 4)} 字\n\n`;
    });
  }
  
  md += `## 🚀 曝光增长预估\n\n`;
  if (backlinkData.estimatedSources?.length > 0) {
    md += `| 来源 | 类型 | 预估影响 |\n`;
    md += `|------|------|----------|\n`;
    backlinkData.estimatedSources.forEach(s => {
      md += `| ${s.source} | ${s.type} | ${s.estimatedImpact} |\n`;
    });
    md += '\n';
  }
  
  md += `## 📋 待执行行动\n\n`;
  const pendingActions = getPendingActions(status);
  pendingActions.forEach(action => {
    md += `- [ ] **${action.title}**: ${action.description} (${action.effort})\n`;
  });
  
  md += `\n---\n\n`;
  md += `*本报告由 agents-awesome 曝光引擎自动生成*\n`;
  
  if (!fs.existsSync(CONTENT_DIR)) fs.mkdirSync(CONTENT_DIR, { recursive: true });
  const reportFile = path.join(CONTENT_DIR, `outreach_${today}.md`);
  fs.writeFileSync(reportFile, md, 'utf8');
  log('ok', `曝光报告已生成: ${reportFile}`);
  
  return { reportFile, pendingActions };
}

function getPendingActions(status) {
  const actions = [];
  
  // SEO 文章
  if (status.seoArticles.length < 3) {
    actions.push({
      title: '发布 SEO 文章到掘金',
      description: '将生成的掘金文章草稿发布到掘金社区',
      effort: '5分钟（复制粘贴）',
      impact: '高'
    });
  }
  
  // GitHub Topics
  if (!status.directorySubmissions?.includes('github-topics')) {
    actions.push({
      title: '添加 GitHub Topics',
      description: '在 repo 右侧添加 ai-agents, autonomous-agent 等标签',
      effort: '2分钟',
      impact: '中高'
    });
  }
  
  // awesome 列表提交
  if (!status.directorySubmissions?.includes('awesome-list')) {
    actions.push({
      title: '提交到 awesome 生态',
      description: '给 awesome, awesome-python 等列表提交 PR',
      effort: '10分钟',
      impact: '中高'
    });
  }
  
  return actions;
}

// ─── 快速状态 ────────────────────────────────────────────────────
function quickPulse() {
  const status = loadOutreachStatus();
  
  console.log('\n📣 agents-awesome 曝光状态\n');
  console.log(`  📝 SEO 文章: ${status.seoArticles.length} 已发布 | ${status.seoArticlesDraft?.length || 0} 草稿`);
  console.log(`  🔗 反向链接: ${status.backlinks?.length || 0} 个`);
  console.log(`  📊 目录提交: ${status.directorySubmissions?.length || 0} 个`);
  console.log(`  ⭐ 最近运行: ${status.lastRun || '从未'}`);
  console.log('');
}

// ─── 主程序 ─────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const action = args[0];
  
  switch (action) {
    case '--seo-article':
      generateSEOArticles();
      break;
      
    case '--backlinks':
      await checkBacklinks();
      break;
      
    case '--report':
      const backlinkData = await checkBacklinks().catch(() => ({}));
      generateOutreachReport(backlinkData, []);
      break;
      
    case '--all':
      log('spark', '📣 agents-awesome 曝光引擎启动');
      const articles = generateSEOArticles();
      const data = await checkBacklinks().catch(() => ({}));
      const { pendingActions } = generateOutreachReport(data, articles);
      saveOutreachStatus(loadOutreachStatus());
      log('ok', `🏁 完成：生成了 ${articles.length} 篇 SEO 文章，${pendingActions.length} 个待执行行动`);
      break;
      
    case '--pulse':
    default:
      quickPulse();
  }
}

main().catch(e => {
  log('error', `致命错误: ${e.message}`);
  process.exit(1);
});
