/**
 * agents-awesome 营销数据分析器
 * 
 * 追踪所有营销动作的效果数据，持久化存储，供策略进化引擎使用。
 * 
 * 用法:
 *   node analytics_tracker.mjs --record <type> <key> <value>  记录单条数据
 *   node analytics_tracker.mjs --summary                          生成分析摘要
 *   node analytics_tracker.mjs --pulse                            快速状态检查
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ANALYTICS_FILE = path.join(ROOT, '_data', 'marketing_analytics.json');

const CONFIG = {
  github: {
    repo: 'charlie-cao/agents-awesome',
    token: process.env.GITHUB_TOKEN || ''
  }
};

// ─── 日志 ───────────────────────────────────────────────────────────
const log = (type, msg) => {
  const ts = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const icons = { info: 'ℹ️', ok: '✅', warn: '⚠️', error: '❌', spark: '✨' };
  console.log(`${icons[type] || '📌'} [${ts}] ${msg}`);
};

// ─── 存储 ───────────────────────────────────────────────────────────
function loadAnalytics() {
  if (!fs.existsSync(ANALYTICS_FILE)) {
    return { 
      github: { stars: [], starsHistory: [], forks: [], issues: [], prs: [] },
      twitter: { posts: {}, impressions: {}, engagements: {}, followers: [] },
      web: { views: [], referrers: {}, topPages: [] },
      content: { threadsGenerated: 0, threadsPosted: 0, postsByType: {} },
      strategy: { 
        experiments: [], 
        changes: [], 
        bestPerformingContentType: null,
        bestPostingTime: null,
        bestHashtags: []
      },
      revenue: { 
        leads: [], 
        affiliateClicks: 0, 
        newsletter: { subscribers: 0, openRate: 0 },
        sponsors: []
      },
      lastUpdated: null
    };
  }
  return JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf8'));
}

function saveAnalytics(data) {
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

// ─── 1. GitHub 数据抓取 ─────────────────────────────────────────────
async function fetchGitHubStats() {
  log('info', '📊 正在抓取 GitHub 统计数据...');
  
  const data = loadAnalytics();
  const match = CONFIG.github.repo.match(/^([^/]+)\/([^/]+)$/);
  if (!match) {
    log('warn', 'GitHub repo 格式不正确，跳过抓取');
    return data;
  }
  const [owner, repo] = [match[1], match[2]];
  
  const token = CONFIG.github.token;
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'agents-awesome-marketing-bot'
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  
  try {
    // 获取 repo 基本信息
    const basicData = await githubRequest(`/repos/${owner}/${repo}`, headers);
    
    const today = getToday();
    const starsEntry = { date: today, stars: basicData.stargazers_count || 0 };
    const forksEntry = { date: today, forks: basicData.forks_count || 0 };
    
    // 避免重复记录同一天
    const existingStarsIdx = data.github.stars.findIndex(e => e.date === today);
    if (existingStarsIdx >= 0) {
      data.github.stars[existingStarsIdx] = starsEntry;
    } else {
      data.github.stars.push(starsEntry);
    }
    
    const existingForksIdx = data.github.forks.findIndex(e => e.date === today);
    if (existingForksIdx >= 0) {
      data.github.forks[existingForksIdx] = forksEntry;
    } else {
      data.github.forks.push(forksEntry);
    }
    
    // 计算 Stars 增长
    if (data.github.stars.length > 1) {
      const sorted = [...data.github.stars].sort((a, b) => a.date.localeCompare(b.date));
      const last = sorted[sorted.length - 1];
      const prev = sorted[sorted.length - 2];
      last.growth = last.stars - prev.stars;
    }
    
    saveAnalytics(data);
    log('ok', `GitHub 数据更新: ⭐ ${basicData.stargazers_count} (+${starsEntry.growth || 0})`);
    
  } catch (e) {
    log('error', `GitHub API 请求失败: ${e.message}`);
  }
  
  return data;
}

function githubRequest(endpoint, headers) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: endpoint,
      method: 'GET',
      headers
    };
    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        if (res.statusCode === 403) {
          // Rate limited, use mock data
          resolve({ stargazers_count: 0, forks_count: 0 });
          return;
        }
        try {
          resolve(JSON.parse(Buffer.concat(chunks).toString()));
        } catch {
          resolve({});
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(5000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.end();
  });
}

// ─── 2. 推文数据记录 ────────────────────────────────────────────────
function recordTweet(postId, data) {
  const analytics = loadAnalytics();
  const today = getToday();
  
  analytics.twitter.posts[postId] = {
    postedAt: today,
    content: data.content || '',
    type: data.type || 'single',
    impressions: data.impressions || 0,
    likes: data.likes || 0,
    retweets: data.retweets || 0,
    replies: data.replies || 0,
    url: data.url || ''
  };
  
  analytics.content.threadsGenerated++;
  analytics.content.postsByType[data.type] = (analytics.content.postsByType[data.type] || 0) + 1;
  
  saveAnalytics(analytics);
  log('ok', `推文记录: ${postId} (${data.type})`);
}

// ─── 3. 内容效果分析 ────────────────────────────────────────────────
function analyzeContentPerformance() {
  const data = loadAnalytics();
  const posts = Object.values(data.twitter.posts);
  
  if (posts.length === 0) {
    return { message: '暂无推文数据' };
  }
  
  // 计算各类型平均表现
  const byType = {};
  posts.forEach(p => {
    if (!byType[p.type]) byType[p.type] = { count: 0, totalImpressions: 0, totalEngagements: 0 };
    byType[p.type].count++;
    byType[p.type].totalImpressions += p.impressions || 0;
    byType[p.type].totalEngagements += (p.likes || 0) + (p.retweets || 0) + (p.replies || 0);
  });
  
  const typeRanking = Object.entries(byType)
    .map(([type, stats]) => ({
      type,
      count: stats.count,
      avgImpressions: Math.round(stats.totalImpressions / stats.count),
      avgEngagements: Math.round(stats.totalEngagements / stats.count),
      engagementRate: stats.totalImpressions > 0 
        ? ((stats.totalEngagements / stats.totalImpressions) * 100).toFixed(2) + '%' 
        : '0%'
    }))
    .sort((a, b) => b.avgEngagements - a.avgEngagements);
  
  // 找出最佳帖子
  const topPosts = [...posts]
    .sort((a, b) => ((b.likes || 0) + (b.retweets || 0)) - ((a.likes || 0) + (a.retweets || 0)))
    .slice(0, 5);
  
  // GitHub Stars 趋势
  const starsSorted = [...(data.github.stars || [])].sort((a, b) => a.date.localeCompare(b.date));
  const stars7d = starsSorted.slice(-7);
  const starsGrowth = stars7d.length > 1 ? stars7d[stars7d.length-1].stars - stars7d[0].stars : 0;
  
  return {
    typeRanking,
    topPosts: topPosts.map(p => ({
      content: p.content?.slice(0, 80) + '...',
      likes: p.likes,
      retweets: p.retweets,
      engagements: (p.likes || 0) + (p.retweets || 0) + (p.replies || 0),
      url: p.url
    })),
    githubStars: {
      current: starsSorted[starsSorted.length-1]?.stars || 0,
      growth7d: starsGrowth
    },
    totalPosts: posts.length
  };
}

// ─── 4. 生成分析摘要 ────────────────────────────────────────────────
function generateAnalysisReport() {
  const data = loadAnalytics();
  const analysis = analyzeContentPerformance();
  const today = getToday();
  
  let md = `# 📊 营销效果分析报告\n\n`;
  md += `**生成时间**: ${new Date().toISOString()}  \n`;
  md += `**分析周期**: 最近 ${Object.keys(data.twitter.posts).length} 条推文 + 全量 GitHub 数据\n\n`;
  
  md += `---\n\n`;
  md += `## ⭐ GitHub 数据\n\n`;
  if (analysis.githubStars) {
    md += `| 指标 | 数值 |\n|------|------|\n`;
    md += `| 当前 Stars | ${analysis.githubStars.current} |\n`;
    md += `| 近7天增长 | ${analysis.githubStars.growth7d >= 0 ? '+' : ''}${analysis.githubStars.growth7d} |\n`;
    md += `| 总 Fork 数 | ${data.github.forks[data.github.forks.length-1]?.forks || '?'} |\n`;
    md += `| Open Issues | ${data.github.issues?.length || 0} |\n`;
    md += `| 总 PR 数 | ${data.github.prs?.length || 0} |\n\n`;
  }
  
  md += `## 🐦 推文效果\n\n`;
  md += `**总推文数**: ${analysis.totalPosts}  \n`;
  md += `**内容类型表现排名**:\n\n`;
  
  if (analysis.typeRanking && analysis.typeRanking.length > 0) {
    md += `| 类型 | 发帖数 | 平均展示 | 平均互动 | 互动率 |\n`;
    md += `|------|--------|----------|----------|--------|\n`;
    analysis.typeRanking.forEach(r => {
      md += `| ${r.type} | ${r.count} | ${r.avgImpressions} | ${r.avgEngagements} | ${r.engagementRate} |\n`;
    });
    md += `\n**最佳内容类型**: ${analysis.typeRanking[0]?.type}  \n`;
    md += `**最佳表现帖子**:\n\n`;
    analysis.topPosts?.forEach((p, i) => {
      md += `${i+1}. ${p.content}\n   ❤️ ${p.likes || 0} 🔁 ${p.retweets || 0} 💬 ${p.replies || 0}\n`;
      if (p.url) md += `   🔗 ${p.url}\n`;
      md += `\n`;
    });
  } else {
    md += `暂无推文数据（或尚未配置 Twitter API）\n`;
  }
  
  md += `## 🧠 策略进化建议\n\n`;
  const suggestions = generateStrategySuggestions(data, analysis);
  suggestions.forEach((s, i) => {
    md += `${i+1}. **${s.title}**: ${s.reason}\n   - 操作: ${s.action}\n\n`;
  });
  
  md += `---\n\n`;
  md += `## 💰 变现潜力评估\n\n`;
  const revenue = assessMonetizationPotential(data);
  revenue.forEach(item => {
    md += `- **${item.channel}**: ${item.status} - ${item.note}\n`;
  });
  
  const reportFile = path.join(ROOT, 'content', `analytics_${today}.md`);
  
  // 确保目录存在
  const contentDir = path.join(ROOT, 'content');
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
  fs.writeFileSync(reportFile, md, 'utf8');
  log('ok', `分析报告已生成: ${reportFile}`);
  
  return { reportFile, analysis };
}

// ─── 5. 策略进化建议生成器 ─────────────────────────────────────────
function generateStrategySuggestions(data, analysis) {
  const suggestions = [];
  const posts = Object.values(data.twitter.posts);
  const typeRanking = analysis.typeRanking || [];
  
  // 1. 内容类型优化
  if (typeRanking.length > 1) {
    const worst = typeRanking[typeRanking.length - 1];
    if (worst && worst.avgEngagements < (typeRanking[0]?.avgEngagements || 1) * 0.3) {
      suggestions.push({
        title: `减少 ${worst.type} 类型内容`,
        reason: `该类型平均互动仅 ${worst.avgEngagements}，远低于最佳类型 ${typeRanking[0]?.type} 的 ${typeRanking[0]?.avgEngagements}`,
        action: `在 --tweet 生成逻辑中降低 ${worst.type} 的权重，优先生成 ${typeRanking[0]?.type} 类型`
      });
    }
  }
  
  // 2. 发布时间优化
  const postsWithTime = posts.filter(p => p.postedAt);
  if (postsWithTime.length >= 3) {
    suggestions.push({
      title: '测试不同发布时间',
      reason: '当前无法区分高峰/低谷时段表现',
      action: '分别在不同时段（9:00 / 12:00 / 18:00 / 21:00）发帖，对比 24h 互动数据'
    });
  }
  
  // 3. CTA 优化
  const ctaPosts = posts.filter(p => p.content?.includes('github.com'));
  const nonCtaPosts = posts.filter(p => !p.content?.includes('github.com'));
  if (ctaPosts.length >= 2 && nonCtaPosts.length >= 2) {
    const avgCtaEngagement = ctaPosts.reduce((s, p) => s + (p.likes||0) + (p.retweets||0), 0) / ctaPosts.length;
    const avgNonCtaEngagement = nonCtaPosts.reduce((s, p) => s + (p.likes||0) + (p.retweets||0), 0) / nonCtaPosts.length;
    if (avgCtaEngagement > avgNonCtaEngagement * 1.2) {
      suggestions.push({
        title: 'CTA 有效！增加链接露出',
        reason: `带 GitHub 链接的帖子平均互动 ${avgCtaEngagement.toFixed(1)}，高于无链接的 ${avgNonCtaEngagement.toFixed(1)}`,
        action: '确保每条推文都包含 GitHub 链接或项目名称'
      });
    }
  }
  
  // 4. Trending 依赖优化
  if (posts.filter(p => p.content?.includes('今日热点')).length > 0) {
    const hotPosts = posts.filter(p => p.content?.includes('🔥') || p.content?.includes('hot'));
    const avgHot = hotPosts.reduce((s, p) => s + (p.likes||0) + (p.retweets||0), 0) / (hotPosts.length || 1);
    const otherPosts = posts.filter(p => !p.content?.includes('🔥') && !p.content?.includes('hot'));
    if (otherPosts.length > 0) {
      const avgOther = otherPosts.reduce((s, p) => s + (p.likes||0) + (p.retweets||0), 0) / otherPosts.length;
      if (avgHot > avgOther * 1.3) {
        suggestions.push({
          title: '热点内容表现更好',
          reason: `🔥 热点相关帖子平均互动 ${avgHot.toFixed(1)} vs 普通帖子 ${avgOther.toFixed(1)}`,
          action: '增加 "今日热点" 角度的帖子比例，从 1 篇/天 提升到 2 篇/天'
        });
      }
    }
  }
  
  // 5. 默认建议
  if (suggestions.length === 0) {
    suggestions.push({
      title: '继续积累数据',
      reason: '样本量不足（<3条推文），尚无法得出统计显著结论',
      action: '保持当前策略至少 2 周，再做策略调整'
    });
  }
  
  return suggestions;
}

// ─── 6. 变现潜力评估 ───────────────────────────────────────────────
function assessMonetizationPotential(data) {
  const stars = data.github.stars[data.github.stars.length - 1]?.stars || 0;
  const postsCount = Object.keys(data.twitter.posts).length;
  
  return [
    {
      channel: '🛠️ 工具/插件推广',
      status: stars >= 100 ? '✅ 具备条件' : '⏳ 需达到 100 Stars',
      note: `当前 ${stars} Stars。AI 工具/插件厂商会在 repo README 中购买展示位，每篇 $50-500`
    },
    {
      channel: '📧 付费 Newsletter',
      status: stars >= 500 ? '🔜 可启动' : '⏳ 需达到 500 Stars',
      note: `建立邮件列表，提供 AI Agent 领域的深度周报，月付 $5-15/订阅者`
    },
    {
      channel: '💼 招聘/实习板块',
      status: stars >= 200 ? '✅ 具备条件' : '⏳ 需达到 200 Stars',
      note: 'AI Agent 公司招聘广告，单条 $200-1000，列表页面广告月租 $500+'
    },
    {
      channel: '📚 付费内容/课程',
      status: stars >= 1000 ? '🔜 可启动' : '⏳ 需达到 1000 Stars',
      note: '基于 awesome-list 延伸的付费教程/模板包，$29-99/份'
    },
    {
      channel: '🤝 社区赞助 (Open Collective)',
      status: '✅ 可启动',
      note: '设置 Open Collective，接受社区赞助，当前无成本'
    },
    {
      channel: '🌐 流量变现 (Google AdSense)',
      status: stars >= 1000 ? '✅ 可申请' : '⏳ 需达到 1000 Stars',
      note: 'GitHub Pages / 独立域名导流，精准 AI 开发者受众，RPM $5-15'
    }
  ];
}

// ─── 7. 策略配置更新 ───────────────────────────────────────────────
function updateStrategyConfig(change) {
  const analytics = loadAnalytics();
  const today = getToday();
  
  analytics.strategy.changes = analytics.strategy.changes || [];
  analytics.strategy.changes.push({ date: today, ...change });
  
  // 更新最佳实践
  if (change.bestContentType) {
    analytics.strategy.bestPerformingContentType = change.bestContentType;
  }
  if (change.bestPostingTime) {
    analytics.strategy.bestPostingTime = change.bestPostingTime;
  }
  
  saveAnalytics(analytics);
  log('ok', `策略已更新: ${JSON.stringify(change)}`);
}

// ─── 快速状态检查 ───────────────────────────────────────────────────
function quickPulse() {
  const data = loadAnalytics();
  const today = getToday();
  const todayStars = data.github.stars.find(e => e.date === today);
  const todayPosts = Object.values(data.twitter.posts).filter(p => p.postedAt === today);
  
  console.log('\n📊 agents-awesome 营销状态\n');
  console.log(`  ⭐ GitHub Stars: ${todayStars?.stars || '?'} (今日)`);
  console.log(`     7天增长: ${data.github.stars.length >= 7 
    ? (data.github.stars[data.github.stars.length-1]?.stars - data.github.stars[data.github.stars.length-7]?.stars) 
    : '?'}`);
  console.log(`  🐦 今日推文: ${todayPosts.length}`);
  console.log(`  📝 总推文数: ${Object.keys(data.twitter.posts).length}`);
  console.log(`  🔄 策略变更: ${data.strategy.changes?.length || 0} 次`);
  console.log(`  💰 变现场景: ${assessMonetizationPotential(data).filter(i => i.status.includes('✅')).length} 个已就绪`);
  console.log('');
}

// ─── 主程序 ───────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const action = args[0];
  
  switch (action) {
    case '--fetch-github':
      await fetchGitHubStats();
      break;
      
    case '--record-tweet':
      // node analytics_tracker.mjs --record-tweet <id> <type> <content>
      recordTweet(args[1], { 
        type: args[2], 
        content: args[3] 
      });
      break;
      
    case '--summary':
      generateAnalysisReport();
      break;
      
    case '--pulse':
      quickPulse();
      break;
      
    case '--suggest':
      const data = loadAnalytics();
      const analysis = analyzeContentPerformance();
      const suggestions = generateStrategySuggestions(data, analysis);
      console.log('\n🧠 策略建议:\n');
      suggestions.forEach((s, i) => {
        console.log(`${i+1}. ${s.title}`);
        console.log(`   原因: ${s.reason}`);
        console.log(`   操作: ${s.action}\n`);
      });
      break;
      
    case '--revenue':
      const a = loadAnalytics();
      const revenue = assessMonetizationPotential(a);
      console.log('\n💰 变现潜力:\n');
      revenue.forEach(item => {
        console.log(`${item.channel}: ${item.status}`);
        console.log(`  ${item.note}\n`);
      });
      break;
      
    default:
      console.log(`\n📊 agents-awesome Analytics Tracker
  
用法:
  node analytics_tracker.mjs --fetch-github     抓取 GitHub Stars 等数据
  node analytics_tracker.mjs --record-tweet <id> <type> <content>  记录推文
  node analytics_tracker.mjs --summary          生成完整分析报告
  node analytics_tracker.mjs --pulse           快速状态检查
  node analytics_tracker.mjs --suggest         输出策略优化建议
  node analytics_tracker.mjs --revenue         变现潜力评估
`);
  }
}

main().catch(e => {
  log('error', `致命错误: ${e.message}`);
  process.exit(1);
});
