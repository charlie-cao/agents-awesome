# agents-awesome 自主营销系统 v2.0

> 从"发帖推广"转向"自主进化 → 持续获利"路线

---

## 核心策略转变

| 旧路线 | 新路线 |
|--------|--------|
| 每日发 Twitter 推广 | 每日自主学习最新营销技能 |
| 依赖 Twitter API | 不依赖任何付费 API |
| 手动运营 | 全自动进化 |
| 变现慢 | 飞轮效应：技能进化 → 系统增强 → 更多 Stars → 更快变现 |

---

## 一、系统架构

```
┌─────────────────────────────────────────────────────────────────┐
│              自主营销飞轮: agents-awesome                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🧬 技能进化引擎 (每日 08:00)                                     │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ ClawHub API → 获取最新营销技能                              │  │
│  │   ↓                                                        │  │
│  │ 评分系统 (下载量/Stars/安全性/相关性/新鲜度)                │  │
│  │   ↓                                                        │  │
│  │ 生成集成建议 (高影响+低投入优先)                           │  │
│  │   ↓                                                        │  │
│  │ 自动更新 marketing_system_config.json                       │  │
│  └────────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  📊 效果分析引擎 (每周日 10:00)                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ GitHub Stars 追踪 (每6小时)                                 │  │
│  │ 推文数据分析 (需 Twitter API)                              │  │
│  │ 策略进化建议                                                │  │
│  │ 变现实况评估                                                │  │
│  └────────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  💰 变现执行                                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ 当前阶段: 种子期 (0 Stars)                                  │  │
│  │ 下一里程碑: 100 Stars → 工具推广位                          │  │
│  │ 策略: 持续进化系统 → 提升 Stars → 达成变现里程碑             │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 二、定时任务清单

| 时间 | 任务 | 类型 | 状态 |
|------|------|------|------|
| 每日 00:30 | 抓取 GitHub Trending | 数据层 | ✅ |
| 每日 02:00 | Git 提交变更 | 数据层 | ✅ |
| 每日 08:00 | **技能进化引擎** | 进化层 | ✅ 🆕 |
| 每 6 小时 | GitHub Stars 追踪 | 分析层 | ✅ |
| 每周一 09:00 | 营销周报 | 分析层 | ✅ |
| **每周日 10:00** | **策略进化审查** | 进化层 | ✅ |
| 每周日 10:00 | 变现实况评估 | 变现层 | ✅ |

---

## 三、核心引擎

### skill_evolution_engine.mjs
- **每日 08:00** 从 ClawHub 获取最新营销技能
- 评分维度：下载量、Stars、安全认证、相关性、新鲜度
- 输出：技能进化日报（`content/skill-evolution/evolution_YYYYMMDD.md`）
- 自动集成高分技能到 `marketing_system_config.json`

### analytics_tracker.mjs
- GitHub Stars 追踪（每6小时）
- 推文效果追踪（需 Twitter API）
- 策略进化建议生成
- 变现潜力评估

### autonomous_marketing.mjs
- Trending 数据抓取编排
- 推文内容生成
- Git 提交

---

## 四、数据文件结构

```
agents-awesome/
├── _data/
│   ├── trending_2026-03-23.json       # 每日热门数据
│   ├── marketing_analytics.json        # 营销效果数据
│   ├── marketing_system_config.json    # 系统配置（已集成技能）
│   ├── skill_evolution_log.json        # 进化历史
│   └── skill_discovery/               # 技能发现缓存
├── _scripts/
│   ├── autonomous_marketing.mjs       # 营销编排引擎
│   ├── analytics_tracker.mjs          # 效果追踪引擎
│   ├── skill_evolution_engine.mjs      # 技能进化引擎 🆕
│   └── fetch_trending.py               # Trending 抓取
└── content/
    ├── skill-evolution/
    │   ├── evolution_20260323.md       # 进化日报 🆕
    │   └── evolution_20260323.json
    ├── analytics_20260323.md           # 分析报告
    └── weekly_report_*.md              # 周报
```

---

## 五、变现路线图

| 阶段 | Stars | 目标 | 状态 |
|------|-------|------|------|
| 种子 | 0 | FUNDING.yml + GitHub Pages + 邮件列表 | ✅ 已就绪 |
| Lv1 | 100 | 工具/插件推广位 ($50-500/帖) | ⏳ 需 100 |
| Lv2 | 200 | 招聘板块 ($200+/月) | ⏳ 需 200 |
| Lv3 | 500 | Newsletter 付费订阅 | ⏳ 需 500 |
| Lv4 | 1,000 | 课程/模板包 + AdSense | ⏳ 需 1,000 |

**飞轮关键**：每获得一个 Stars，都是系统进化的证明，都会加速下一个里程碑的到来。

---

## 六、已集成的营销战术

当前已通过进化引擎集成 7 个技能（详见 `marketing_system_config.json`）：

| 技能 | 集成日期 | 优先级 | 状态 |
|------|----------|--------|------|
| Marketing Skills | 2026-03-23 | 高 | passive |
| Brave Search | 2026-03-23 | 高 | passive |
| YouTube Watcher | 2026-03-23 | 中 | passive |
| Mailchimp | 2026-03-23 | 中 | passive |
| Google Slides | 2026-03-23 | 中 | passive |
| Google Analytics | 2026-03-23 | 高 | passive |
| Frontend Design Ultimate | 2026-03-23 | 低 | passive |

---

## 七、执行日志

| 日期 | 执行动作 | 结果 |
|------|----------|------|
| 2026-03-23 | 初始化 v1.0 营销系统 | ✅ |
| 2026-03-23 | v2.0 升级：转向自主进化路线 | ✅ |
| 2026-03-23 | skill_evolution_engine.mjs 上线 | ✅ |
| 2026-03-23 | 每日技能进化 Cron 注册 | ✅ |
| 2026-03-23 | 首次运行：发现 40 技能，集成 7 个 | ✅ |
| 2026-03-23 | SEO 关键词优化 README | ✅ |

---

## 八、快速命令

```bash
cd C:\Users\charlie\work\agents-awesome

# 技能进化
node _scripts/skill_evolution_engine.mjs        # 完整流程
node _scripts/skill_evolution_engine.mjs --pulse # 快速状态

# 效果分析
node _scripts/analytics_tracker.mjs --pulse     # 快速状态
node _scripts/analytics_tracker.mjs --summary    # 完整报告
node _scripts/analytics_tracker.mjs --revenue     # 变现评估

# 营销编排
node _scripts/autonomous_marketing.mjs --all     # 全部动作

# 定时任务
openclaw cron list                              # 查看所有任务
```
