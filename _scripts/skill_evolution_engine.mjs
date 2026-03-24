/**
 * agents-awesome 技能进化引擎
 * 
 * 每天自动：
 * 1. 从 ClawHub 获取最新/最热营销技能
 * 2. 分析哪些值得集成到我们的营销系统
 * 3. 更新系统配置，记录学习成果
 * 4. 生成每日技能进化报告
 * 
 * 用法:
 *   node skill_evolution_engine.mjs          # 完整流程
 *   node skill_evolution_engine.mjs --fetch  # 仅获取最新技能
 *   node skill_evolution_engine.mjs --report  # 生成进化报告
 *   node skill_evolution_engine.mjs --pulse   # 快速状态
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SKILLS_DIR = path.join(ROOT, '_data', 'skill_discovery');
const EVOLUTION_LOG = path.join(ROOT, '_data', 'skill_evolution_log.json');
const ANALYTICS_FILE = path.join(ROOT, '_data', 'marketing_analytics.json');
const SYSTEM_CONFIG = path.join(ROOT, '_data', 'marketing_system_config.json');

const log = (type, msg) => {
  const ts = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const icons = { info: 'ℹ️', ok: '✅', warn: '⚠️', error: '❌', spark: '✨' };
  console.log(`${icons[type] || '📌'} [${ts}] ${msg}`);
};

const getToday = () => new Date().toISOString().slice(0, 10).replace(/-/g, '');
const getTimestamp = () => new Date().toISOString();

// ─── HTTP 请求 ─────────────────────────────────────────────────────
function fetchAPI(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'Accept': 'application/json', 'User-Agent': 'agents-awesome-evolution-bot' } }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
        catch { reject(new Error('Invalid JSON response')); }
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('Request timeout')); });
  });
}

// ─── 加载/保存数据 ────────────────────────────────────────────────
function loadEvolutionLog() {
  if (!fs.existsSync(EVOLUTION_LOG)) return { entries: [], totalSkillsFound: 0, integratedSkills: [] };
  return JSON.parse(fs.readFileSync(EVOLUTION_LOG, 'utf8'));
}

function saveEvolutionLog(data) {
  fs.writeFileSync(EVOLUTION_LOG, JSON.stringify(data, null, 2), 'utf8');
}

function loadSystemConfig() {
  if (!fs.existsSync(SYSTEM_CONFIG)) {
    return {
      version: '1.0',
      lastUpdated: null,
      integratedTactics: [],      // 已集成的战术
      activeChannels: ['github', 'content'],  // 当前活跃渠道
      contentStrategy: {
        primaryFormat: 'thread',
        postingFrequency: 'daily',
        focusAreas: ['ai-agents', 'github-trending', 'tool-releases']
      },
      evolutionHistory: [],
      monetization: {
        currentStage: 'seeds',
        nextMilestone: { target: 100, milestone: 'tool-sponsorships' },
        actionsTaken: []
      }
    };
  }
  return JSON.parse(fs.readFileSync(SYSTEM_CONFIG, 'utf8'));
}

function saveSystemConfig(data) {
  data.lastUpdated = getTimestamp();
  fs.writeFileSync(SYSTEM_CONFIG, JSON.stringify(data, null, 2), 'utf8');
}

// ─── 1. 获取 ClawHub 营销技能 ─────────────────────────────────────
async function fetchMarketingSkills() {
  log('info', '🔍 正在从 ClawHub 获取最新营销技能...');
  
  const results = {};
  
  try {
    // 获取营销相关技能（搜索）
    const searchTerms = ['marketing', 'growth', 'social-media', 'seo', 'content', 'twitter', 'analytics', 'monetization'];
    
    for (const term of searchTerms) {
      try {
        const res = await fetchAPI(`https://topclawhubskills.com/api/search?q=${encodeURIComponent(term)}&limit=5`);
        if (res.ok && res.data) {
          results[term] = res.data.slice(0, 5);
        }
      } catch (e) {
        log('warn', `搜索 "${term}" 失败: ${e.message}`);
      }
    }
    
    // 获取最热技能
    try {
      const res = await fetchAPI('https://topclawhubskills.com/api/top-downloads?limit=20');
      if (res.ok && res.data) {
        // 过滤出营销相关
        results['top_overall'] = res.data.filter(s => {
          const combined = `${s.slug} ${s.summary}`.toLowerCase();
          return /marketing|growth|social|content|seo|analytics|brand|audience|traffic/i.test(combined);
        }).slice(0, 10);
      }
    } catch (e) {
      log('warn', `获取 top-downloads 失败: ${e.message}`);
    }
    
    log('ok', `获取到 ${Object.keys(results).length} 个类别共若干技能`);
    return results;
    
  } catch (e) {
    log('error', `ClawHub API 请求失败: ${e.message}`);
    return results;
  }
}

// ─── 2. 分析技能并决定是否集成 ───────────────────────────────────
function analyzeAndRecommendSkills(skillsData) {
  log('info', '🧠 正在分析技能质量与集成价值...');
  
  const recommendations = [];
  const today = getToday();
  
  // 收集所有技能
  const allSkills = [];
  for (const [category, skills] of Object.entries(skillsData)) {
    if (Array.isArray(skills)) {
      skills.forEach(skill => {
        allSkills.push({ ...skill, category });
      });
    }
  }
  
  // 去重
  const seen = new Set();
  const uniqueSkills = allSkills.filter(s => {
    if (seen.has(s.slug)) return false;
    seen.add(s.slug);
    return true;
  });
  
  // 评分模型
  uniqueSkills.forEach(skill => {
    const score = calculateIntegrationScore(skill);
    if (score >= 30) {  // 阈值：30分以上建议关注
      recommendations.push({ ...skill, score });
    }
  });
  
  // 排序
  recommendations.sort((a, b) => b.score - a.score);
  
  log('ok', `分析完成：${recommendations.length} 个技能达到集成标准`);
  return recommendations.slice(0, 10);
}

function calculateIntegrationScore(skill) {
  let score = 0;
  
  // 下载量分数 (最高 30 分)
  const downloads = skill.downloads || 0;
  if (downloads >= 10000) score += 30;
  else if (downloads >= 5000) score += 25;
  else if (downloads >= 1000) score += 20;
  else if (downloads >= 500) score += 15;
  else if (downloads >= 100) score += 10;
  else if (downloads >= 50) score += 5;
  
  // Stars 分数 (最高 20 分)
  const stars = skill.stars || 0;
  if (stars >= 500) score += 20;
  else if (stars >= 200) score += 15;
  else if (stars >= 100) score += 10;
  else if (stars >= 50) score += 7;
  else if (stars >= 20) score += 4;
  
  // 安全认证 (最高 15 分)
  if (skill.is_certified) score += 15;
  
  // 相关性加成 (最高 20 分)
  const summary = (skill.summary || '').toLowerCase();
  const slug = (skill.slug || '').toLowerCase();
  const combined = slug + ' ' + summary;
  
  const relevanceKeywords = [
    'twitter', 'social media', 'content strategy', 'seo', 'analytics',
    'email marketing', 'growth hacking', 'viral', 'engagement', 'audience',
    'brand', 'launch', 'product hunt', 'github', 'developer marketing'
  ];
  
  let relevanceBonus = 0;
  relevanceKeywords.forEach(kw => {
    if (combined.includes(kw)) relevanceBonus += 3;
  });
  score += Math.min(relevanceBonus, 20);
  
  // 新鲜度 (最高 10 分)
  if (skill.updated_at) {
    const daysSinceUpdate = (Date.now() - new Date(skill.updated_at)) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate < 7) score += 10;
    else if (daysSinceUpdate < 30) score += 7;
    else if (daysSinceUpdate < 90) score += 4;
  }
  
  // 原创作者加分
  const trustedAuthors = ['openclaw', 'clawhub', 'official'];
  if (trustedAuthors.some(a => skill.owner_handle?.toLowerCase().includes(a))) {
    score += 5;
  }
  
  return Math.min(score, 100);
}

// ─── 3. 生成集成建议 ──────────────────────────────────────────────
function generateIntegrationPlan(recommendations, currentConfig) {
  log('info', '📋 正在生成集成计划...');
  
  const today = getToday();
  const plan = {
    date: today,
    recommendations: [],
    configUpdates: [],
    priorityActions: []
  };
  
  const integratedSlugs = currentConfig.integratedTactics.map(t => t.slug);
  
  recommendations.forEach(rec => {
    const alreadyIntegrated = integratedSlugs.includes(rec.slug);
    
    // 生成具体集成建议
    const integration = {
      slug: rec.slug,
      displayName: rec.display_name,
      summary: rec.summary,
      score: rec.score,
      alreadyIntegrated,
      clawhubUrl: rec.clawhub_url,
      category: rec.category,
      recommendedActions: generateActionsForSkill(rec, currentConfig)
    };
    
    plan.recommendations.push(integration);
    
    // 如果高分且未集成，加入优先行动
    if (rec.score >= 50 && !alreadyIntegrated) {
      plan.priorityActions.push({
        slug: rec.slug,
        reason: `得分 ${rec.score}，值得优先集成`,
        actions: integration.recommendedActions
      });
    }
  });
  
  return plan;
}

function generateActionsForSkill(skill, currentConfig) {
  const actions = [];
  const summary = (skill.summary || '').toLowerCase();
  const slug = (skill.slug || '').toLowerCase();
  
  // 根据技能类型生成具体建议
  if (/twitter|social.*media|posting/.test(slug + summary)) {
    actions.push({
      type: 'channel_expansion',
      action: '将 Twitter/社交媒体发帖纳入每日流程',
      impact: 'high',
      effort: 'medium'
    });
  }
  
  if (/seo|search.*engine|keyword/.test(slug + summary)) {
    actions.push({
      type: 'seo_optimization',
      action: '在 README 中增加关键词密度，优化搜索引擎排名',
      impact: 'high',
      effort: 'low'
    });
  }
  
  if (/analytics|tracking|metric/.test(slug + summary)) {
    actions.push({
      type: 'measurement',
      action: '扩展 analytics_tracker.mjs，接入更多追踪指标',
      impact: 'high',
      effort: 'medium'
    });
  }
  
  if (/content|blog|article|writing/.test(slug + summary)) {
    actions.push({
      type: 'content_diversification',
      action: '将博客/文章内容纳入分发矩阵',
      impact: 'medium',
      effort: 'medium'
    });
  }
  
  if (/growth|hack|viral|launch/.test(slug + summary)) {
    actions.push({
      type: 'growth_experiment',
      action: '实施 1-2 个增长实验（如 Product Hunt 发布、Reddit 推广）',
      impact: 'high',
      effort: 'high'
    });
  }
  
  if (/email|newsletter|mailchimp/.test(slug + summary)) {
    actions.push({
      type: 'email_pipeline',
      action: '建立邮件订阅流水线',
      impact: 'medium',
      effort: 'medium'
    });
  }
  
  if (/monetize|revenue|sponsor|ads/.test(slug + summary)) {
    actions.push({
      type: 'monetization',
      action: '评估该技能的变现场景，更新 MONETIZATION.md',
      impact: 'high',
      effort: 'low'
    });
  }
  
  // 默认建议
  if (actions.length === 0) {
    actions.push({
      type: 'awareness',
      action: '记录该技能，持续关注其发展',
      impact: 'low',
      effort: 'low'
    });
  }
  
  return actions;
}

// ─── 4. 更新系统配置 ──────────────────────────────────────────────
function applyConfigUpdates(plan, currentConfig) {
  const updates = [];
  const today = getToday();
  
  plan.recommendations.forEach(rec => {
    if (rec.score >= 50 && !rec.alreadyIntegrated) {
      // 将高分未集成的技能加入配置
      currentConfig.integratedTactics.push({
        slug: rec.slug,
        displayName: rec.displayName,
        addedAt: today,
        score: rec.score,
        reason: rec.recommendedActions[0]?.action || '高分技能',
        status: 'passive'  // passive = 关注但未主动使用
      });
      
      updates.push({
        type: 'added_tactic',
        slug: rec.slug,
        displayName: rec.displayName
      });
      
      log('ok', `+ 集成技能: ${rec.displayName} (得分 ${rec.score})`);
    }
  });
  
  return updates;
}

// ─── 5. 生成每日进化报告 ─────────────────────────────────────────
function generateEvolutionReport(plan, evolutionLog, systemConfig) {
  const today = getToday();
  
  let md = `# 🧬 agents-awesome 技能进化日报\n\n`;
  md += `**日期**: ${today}  \n`;
  md += `**系统版本**: ${systemConfig.version}  \n`;
  md += `**已集成技能**: ${systemConfig.integratedTactics.length} 个  \n`;
  md += `**累计发现技能**: ${evolutionLog.totalSkillsFound} 个\n\n`;
  
  md += `---\n\n`;
  md += `## 🏆 本日 Top 推荐技能\n\n`;
  
  if (plan.recommendations.length === 0) {
    md += `今日无高分推荐（可能网络问题或暂无更新）\n`;
  } else {
    md += `| 技能 | 作者 | 得分 | 类别 | 推荐行动 | ClawHub |\n`;
    md += `|------|------|------|------|----------|---------|\n`;
    plan.recommendations.slice(0, 5).forEach(r => {
      const action = r.recommendedActions[0]?.action?.slice(0, 30) || '';
      md += `| [${r.displayName}](${r.clawhubUrl}) | @${r.category} | ${r.score} | ${r.category} | ${action}... | [链接](${r.clawhubUrl}) |\n`;
    });
  }
  
  md += `\n## ⚡ 优先集成行动\n\n`;
  if (plan.priorityActions.length === 0) {
    md += `今日无紧急行动，建议继续积累数据。\n`;
  } else {
    plan.priorityActions.forEach((pa, i) => {
      md += `${i+1}. **${pa.slug}** (${pa.reason})\n`;
      md += `   - 操作: ${pa.actions[0]?.action}\n`;
      md += `   - 影响: ${pa.actions[0]?.impact} | 投入: ${pa.actions[0]?.effort}\n\n`;
    });
  }
  
  md += `\n## 📊 系统当前状态\n\n`;
  md += `### 已集成的营销战术\n`;
  if (systemConfig.integratedTactics.length === 0) {
    md += `暂无已集成的战术。\n`;
  } else {
    md += `| 技能 | 集成日期 | 状态 | 理由 |\n`;
    md += `|------|----------|------|------|\n`;
    systemConfig.integratedTactics.slice(-10).forEach(t => {
      md += `| ${t.displayName} | ${t.addedAt} | ${t.status} | ${t.reason.slice(0, 30)}... |\n`;
    });
  }
  
  md += `\n### 内容策略\n`;
  md += `- 主力格式: ${systemConfig.contentStrategy.primaryFormat}\n`;
  md += `- 发帖频率: ${systemConfig.contentStrategy.postingFrequency}\n`;
  md += `- 专注领域: ${systemConfig.contentStrategy.focusAreas.join(', ')}\n`;
  
  md += `\n### 变现进度\n`;
  const m = systemConfig.monetization;
  md += `- 当前阶段: ${m.currentStage}\n`;
  md += `- 下一里程碑: ${m.nextMilestone.target} Stars → ${m.nextMilestone.milestone}\n`;
  md += `- 已采取行动: ${m.actionsTaken.length} 个\n`;
  
  md += `\n## 🔮 进化洞察\n\n`;
  
  // 生成洞察
  const insights = generateInsights(plan, systemConfig);
  insights.forEach(insight => {
    md += `- **${insight.title}**: ${insight.description}\n`;
  });
  
  md += `\n---\n\n`;
  md += `*本报告由 agents-awesome 技能进化引擎自动生成*\n`;
  
  const reportDir = path.join(ROOT, 'content', 'skill-evolution');
  if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
  
  const reportFile = path.join(reportDir, `evolution_${today}.md`);
  fs.writeFileSync(reportFile, md, 'utf8');
  
  // 同时生成 JSON 备份
  const jsonReport = path.join(reportDir, `evolution_${today}.json`);
  fs.writeFileSync(jsonReport, JSON.stringify({ plan, systemConfig, generatedAt: getTimestamp() }, null, 2), 'utf8');
  
  log('ok', `进化报告已生成: ${reportFile}`);
  return reportFile;
}

function generateInsights(plan, systemConfig) {
  const insights = [];
  
  // 分析高分技能分布
  if (plan.recommendations.length > 0) {
    const categories = {};
    plan.recommendations.forEach(r => {
      categories[r.category] = (categories[r.category] || 0) + 1;
    });
    const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];
    
    insights.push({
      title: `${topCategory[0]} 类技能最热门`,
      description: `本日推荐中有 ${topCategory[1]} 个相关技能，值得重点关注。`
    });
  }
  
  // 分析系统成熟度
  const tacticCount = systemConfig.integratedTactics.length;
  if (tacticCount < 3) {
    insights.push({
      title: '系统处于早期阶段',
      description: `目前仅集成 ${tacticCount} 个战术，建议每周至少识别 1-2 个可行动的技能进行集成。`
    });
  } else if (tacticCount < 10) {
    insights.push({
      title: '系统成熟度提升中',
      description: `已积累 ${tacticCount} 个战术，系统逐渐形成完整的营销能力矩阵。`
    });
  } else {
    insights.push({
      title: '系统成熟度较高',
      description: `已集成 ${tacticCount} 个战术，建议将重点从数量转向质量，优化现有战术的执行效果。`
    });
  }
  
  // 变现洞察
  const integratedWithMonetization = systemConfig.integratedTactics.filter(t => 
    /monetize|revenue|sponsor|ads|affiliate/.test(t.slug + t.reason)
  );
  
  if (integratedWithMonetization.length > 0) {
    insights.push({
      title: '变现能力已集成',
      description: `已关注 ${integratedWithMonetization.length} 个变现相关技能。`
    });
  }
  
  return insights;
}

// ─── 6. 更新 evolution log ─────────────────────────────────────────
function updateEvolutionLog(skillsFound, recommendations) {
  const log_data = loadEvolutionLog();
  const today = getToday();
  
  log_data.totalSkillsFound += skillsFound;
  
  log_data.entries.push({
    date: today,
    skillsFound,
    topRecommendations: recommendations.slice(0, 3).map(r => ({
      slug: r.slug,
      displayName: r.display_name,
      score: r.score
    })),
    integrated: recommendations.filter(r => r.score >= 50).length
  });
  
  // 只保留最近 90 天
  const cutoff = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  log_data.entries = log_data.entries.filter(e => e.date >= cutoff.replace(/-/g, ''));
  
  saveEvolutionLog(log_data);
}

// ─── 快速状态检查 ───────────────────────────────────────────────
function quickPulse() {
  const evolutionLog = loadEvolutionLog();
  const systemConfig = loadSystemConfig();
  
  console.log('\n🧬 agents-awesome 技能进化状态\n');
  console.log(`  📊 累计发现技能: ${evolutionLog.totalSkillsFound} 个`);
  console.log(`  🔗 已集成战术: ${systemConfig.integratedTactics.length} 个`);
  console.log(`  📈 进化记录: ${evolutionLog.entries.length} 天`);
  console.log(`  💰 变现阶段: ${systemConfig.monetization.currentStage}`);
  console.log(`  🎯 下一里程碑: ${systemConfig.monetization.nextMilestone.target} Stars`);
  console.log('');
  
  // 显示最新集成
  if (systemConfig.integratedTactics.length > 0) {
    console.log('  最近集成:');
    systemConfig.integratedTactics.slice(-3).forEach(t => {
      console.log(`    - ${t.displayName} (${t.addedAt})`);
    });
  }
  console.log('');
}

// ─── 主程序 ─────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const action = args[0];
  
  switch (action) {
    case '--fetch':
      await fetchAndEvolve();
      break;
    case '--report':
      generateReportOnly();
      break;
    case '--pulse':
      quickPulse();
      break;
    default:
      await fetchAndEvolve();
  }
}

async function fetchAndEvolve() {
  log('spark', '🧬 agents-awesome 技能进化引擎启动');
  
  const today = getToday();
  
  // Step 1: 获取技能
  const skillsData = await fetchMarketingSkills();
  
  // Step 2: 分析并评分
  const recommendations = analyzeAndRecommendSkills(skillsData);
  
  // Step 3: 生成集成计划
  const systemConfig = loadSystemConfig();
  const plan = generateIntegrationPlan(recommendations, systemConfig);
  
  // Step 4: 应用配置更新
  const updates = applyConfigUpdates(plan, systemConfig);
  if (updates.length > 0) {
    saveSystemConfig(systemConfig);
  }
  
  // Step 5: 更新进化日志
  const totalFound = Object.values(skillsData).flat().length;
  updateEvolutionLog(totalFound, recommendations);
  
  // Step 6: 生成报告
  const evolutionLog = loadEvolutionLog();
  generateEvolutionReport(plan, evolutionLog, systemConfig);
  
  log('ok', `🏁 进化完成：发现 ${totalFound} 个技能，${recommendations.length} 个推荐，${updates.length} 个已集成`);
}

function generateReportOnly() {
  const evolutionLog = loadEvolutionLog();
  const systemConfig = loadSystemConfig();
  
  const today = getToday();
  const plan = { recommendations: [], priorityActions: [] };
  
  generateEvolutionReport(plan, evolutionLog, systemConfig);
}

main().catch(e => {
  log('error', `致命错误: ${e.message}`);
  process.exit(1);
});
