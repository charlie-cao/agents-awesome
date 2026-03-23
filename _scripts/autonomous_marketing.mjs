/**
 * agents-awesome 自主营销引擎
 * 
 * 用法:
 *   node autonomous_marketing.mjs          # 执行全部动作
 *   node autonomous_marketing.mjs --fetch  # 仅抓取 trending
 *   node autonomous_marketing.mjs --tweet  # 仅生成+发推
 *   node autonomous_marketing.mjs --report  # 生成周报
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ─── 配置 ───────────────────────────────────────────────────────────
const CONFIG = {
  repoName: 'agents-awesome',
  repoPath: ROOT,
  contentDir: path.join(ROOT, 'content'),     // 生成的社交内容存放地
  dataDir: path.join(ROOT, '_data'),          // trending 数据目录
  
  // Twitter 配置 (通过环境变量或 config.json 读取)
  twitter: {
    enabled: true,
    handle: '@your_handle'  // TODO: 填入实际 Twitter 账号
  },
  
  // GitHub 配置
  github: {
    autoCommit: true,
    autoPush: false,  // 默认不自动 push，需要审核
    commitMsg: '🤖 Auto: 更新 trending 数据 & 营销内容'
  },
  
  // 执行时间窗口 (GMT+8)
  runWindow: {
    fetch: '00:30',
    tweet: '01:00',
    report: '09:00'
  }
};

// ─── 日志 ───────────────────────────────────────────────────────────
const log = (type, msg) => {
  const ts = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const icons = { info: 'ℹ️', ok: '✅', warn: '⚠️', error: '❌', spark: '✨' };
  console.log(`${icons[type] || '📌'} [${ts}] ${msg}`);
};

// ─── 工具函数 ───────────────────────────────────────────────────────
const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch { return null; }
};

const saveJson = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
};

const getToday = () => new Date().toISOString().slice(0, 10).replace(/-/g, '');

// ─── 1. 抓取 Trending ───────────────────────────────────────────────
async function fetchTrending() {
  log('info', '📊 正在抓取 GitHub Trending...');
  
  const fetchScript = path.join(ROOT, '_scripts', 'fetch_trending.py');
  if (!fs.existsSync(fetchScript)) {
    log('warn', 'fetch_trending.py 不存在，跳过抓取');
    return null;
  }
  
  try {
    execSync(`python "${fetchScript}"`, { cwd: ROOT, stdio: 'inherit' });
    log('ok', 'Trending 抓取完成');
    return true;
  } catch (e) {
    log('error', `Trending 抓取失败: ${e.message}`);
    return false;
  }
}

// ─── 2. 生成 Twitter 内容 ────────────────────────────────────────────
function generateTweetContent(trendingData) {
  if (!trendingData) {
    log('warn', '无 trending 数据，跳过内容生成');
    return [];
  }
  
  const tweets = [];
  const topProjects = trendingData.slice(0, 5);
  const date = new Date().toISOString().slice(0, 10);
  
  // Tweet 1: 今日热点开篇
  tweets.push({
    type: 'thread',
    content: `🔥 AI Agent 领域今日热点 (${date})

GitHub 上最火热的 5 个项目，开发者必看 👇`
  });
  
  // Tweet 2-6: 逐个介绍 (thread)
  topProjects.forEach((proj, i) => {
    const rank = i + 1;
    const stars = proj.stars || 'N/A';
    const desc = (proj.description || '无描述').slice(0, 100);
    const lang = proj.language || '';
    const tags = (proj.tags || []).slice(0, 3).map(t => `#${t}`).join(' ');
    
    tweets.push({
      type: 'thread',
      content: `${rank}. ${proj.name || proj.repo || 'unknown'}

⭐ ${stars} | ${lang ? '📝 ' + lang + ' | ' : ''}${tags}

${desc}...`
    });
  });
  
  // Tweet 7: 结尾 CTA
  tweets.push({
    type: 'thread',
    content: `📋 完整榜单 & 更多分类（框架/ Skills / MCP / LLM）:
github.com/${trendingData[0]?.owner || 'your-username'}/${CONFIG.repoName}

#AI #AI Agents #GitHub #OpenSource`
  });
  
  // 单条推文: 简短版
  tweets.push({
    type: 'single',
    content: `🤖 今日 AI Agent GitHub 热点：Top 3 项目速览

#1 ⭐ ${topProjects[0]?.stars || '?'} ${topProjects[0]?.name || ''}
#2 ⭐ ${topProjects[1]?.stars || '?'} ${topProjects[1]?.name || ''}
#3 ⭐ ${topProjects[2]?.stars || '?'} ${topProjects[2]?.name || ''}

完整榜单 → github.com/your-username/${CONFIG.repoName}`
  });
  
  return tweets;
}

// ─── 3. 保存生成的内容 ───────────────────────────────────────────────
function saveContent(tweets) {
  if (!fs.existsSync(CONFIG.contentDir)) {
    fs.mkdirSync(CONFIG.contentDir, { recursive: true });
  }
  
  const today = getToday();
  const contentFile = path.join(CONFIG.contentDir, `tweets_${today}.json`);
  const mdFile = path.join(CONFIG.contentDir, `tweets_${today}.md`);
  
  // 保存 JSON
  saveJson(contentFile, { generated: new Date().toISOString(), tweets });
  
  // 保存 Markdown 预览
  let md = `# 📣 社交媒体内容 - ${today}\n\n`;
  tweets.forEach((t, i) => {
    md += `## ${t.type === 'thread' ? '🧵 Thread' : '📌 单条'} ${i + 1}\n\n`;
    md += `${t.content}\n\n---\n\n`;
  });
  
  fs.writeFileSync(mdFile, md, 'utf8');
  log('ok', `内容已保存: content/tweets_${today}.json`);
  
  return { jsonFile: contentFile, mdFile };
}

// ─── 4. 执行 Git 提交 ────────────────────────────────────────────────
async function gitCommit() {
  if (!CONFIG.github.autoCommit) {
    log('info', 'Git 自动提交已禁用');
    return false;
  }
  
  log('info', '📦 检查 Git 变更...');
  
  try {
    const status = execSync('git status --short', { cwd: ROOT, encoding: 'utf8' });
    
    if (!status.trim()) {
      log('info', '没有变更需要提交');
      return false;
    }
    
    log('info', `变更文件:\n${status}`);
    
    // Stage 所有变更
    execSync('git add -A', { cwd: ROOT });
    
    // Commit
    execSync(`git commit -m "${CONFIG.github.commitMsg}"`, { cwd: ROOT });
    log('ok', '已提交变更');
    
    if (CONFIG.github.autoPush) {
      log('info', '正在推送到 GitHub...');
      execSync('git push', { cwd: ROOT });
      log('ok', '推送完成');
    } else {
      log('warn', '自动推送已禁用，请手动 git push');
    }
    
    return true;
  } catch (e) {
    log('error', `Git 操作失败: ${e.message}`);
    return false;
  }
}

// ─── 5. 生成周报 ────────────────────────────────────────────────────
function generateWeeklyReport() {
  log('info', '📊 正在生成周报...');
  
  // 读取本周的 trending 数据
  const dataDir = CONFIG.dataDir;
  if (!fs.existsSync(dataDir)) {
    log('warn', '无数据目录');
    return null;
  }
  
  const files = fs.readdirSync(dataDir)
    .filter(f => f.startsWith('trending_') && f.endsWith('.json'))
    .sort()
    .slice(-7);  // 最近7天
  
  const reports = files.map(f => {
    const data = readJson(path.join(dataDir, f));
    return { file: f, data };
  }).filter(r => r.data);
  
  if (reports.length === 0) {
    log('warn', '无 trending 数据可汇总');
    return null;
  }
  
  const today = getToday();
  const weekAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
  const weekStr = `${weekAgo.toISOString().slice(0, 10)} ~ ${today}`;
  
  // 分析 Top 项目
  const allTop = reports.flatMap(r => (r.data.ai_agent_trending || r.data.top_repos || []).slice(0, 10));
  const projectCount = {};
  allTop.forEach(p => {
    const name = p.name || p.repo || 'unknown';
    projectCount[name] = (projectCount[name] || 0) + 1;
  });
  const consistentTop = Object.entries(projectCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, appearances: count }));
  
  let md = `# 📣 agents-awesome 营销周报\n\n`;
  md += `**周期**: ${weekStr}\n\n`;
  md += `---\n\n`;
  md += `## 🔥 本周持续热门项目\n\n`;
  md += `| 项目 | 上榜天数 | 累计 Stars |\n`;
  md += `|------|----------|----------|\n`;
  consistentTop.forEach(p => {
    md += `| ${p.name} | ${p.appearances}/7 天 | ⭐ ${p.stars || '?'} |\n`;
  });
  
  md += `\n## 📊 每日热点统计\n\n`;
  md += `| 日期 | 项目数 | 最高 Stars |\n`;
  md += `|------|--------|----------|\n`;
  reports.forEach(r => {
    const date = r.file.replace('trending_', '').replace('.json', '');
    const repos = r.data.ai_agent_trending || r.data.top_repos || [];
    const maxStars = repos[0]?.stars || '?';
    md += `| ${date} | ${repos.length} | ${maxStars} |\n`;
  });
  
  md += `\n## ✨ 生成内容\n\n`;
  md += `- [x] Twitter 内容 (${today}): 已生成 ${reports.length} 组推文\n`;
  md += `- [x] GitHub 数据更新: ${reports.length} 天\n`;
  
  md += `\n## 📅 下周计划\n\n`;
  md += `- [ ] 评估内容效果，调整推文策略\n`;
  md += `- [ ] 尝试 LinkedIn / 掘金 分发\n`;
  md += `- [ ] 提交 GitHub Topics 申请\n`;
  
  const reportFile = path.join(CONFIG.contentDir, `weekly_report_${today}.md`);
  fs.writeFileSync(reportFile, md, 'utf8');
  log('ok', `周报已生成: ${reportFile}`);
  
  return reportFile;
}

// ─── 6. 主程序 ───────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const action = args[0] || 'all';
  
  log('spark', `🚀 agents-awesome 自主营销引擎启动 [${action}]`);
  
  let success = true;
  let trendingData = null;
  
  // 解析 trending 数据（如果存在）
  const today = getToday();
  const trendingFile = path.join(CONFIG.dataDir, `trending_${today}.json`);
  if (fs.existsSync(trendingFile)) {
    trendingData = readJson(trendingFile);
  }
  
  switch (action) {
    case '--fetch':
      success = await fetchTrending() !== false;
      break;
      
    case '--tweet':
      if (!trendingData) {
        log('warn', '需要先抓取 trending 数据，使用 --fetch');
        success = false;
      } else {
        const tweets = generateTweetContent(trendingData);
        saveContent(tweets);
        log('ok', `生成了 ${tweets.length} 条推文内容`);
      }
      break;
      
    case '--report':
      generateWeeklyReport();
      break;
      
    case '--commit':
      await gitCommit();
      break;
      
    case 'all':
    default:
      // Step 1: 抓取 trending
      const fetched = await fetchTrending();
      if (fetched !== false) {
        // 重新读取新数据
        if (fs.existsSync(trendingFile)) {
          trendingData = readJson(trendingFile);
        }
      }
      
      // Step 2: 生成内容
      if (trendingData) {
        const tweets = generateTweetContent(trendingData);
        saveContent(tweets);
        log('ok', `✅ 完成：生成了 ${tweets.length} 条推文内容`);
      }
      
      // Step 3: 提交变更
      await gitCommit();
      
      break;
  }
  
  log(success ? 'ok' : 'error', `🏁 营销引擎执行完毕 [${action}]`);
  process.exit(success ? 0 : 1);
}

main().catch(e => {
  log('error', `致命错误: ${e.message}`);
  process.exit(1);
});
