# Awesome AI Agents / AI 智能体资源精选

精选的 AI 智能体合集、技能框架、大模型及相关资源，适用于编码智能体（Claude Code、Cursor、Codex、OpenCode、Gemini CLI、OpenClaw 等）。

> 最后更新：2026 年 3 月
> 
> **说明：** 所有项目均提供 GitHub 仓库链接。Stars 为约数，实时数据请以 GitHub 为准。

---

## GitHub 热度排行

全类别按 Stars 排序的 TOP 项目：

| 排名 | 项目 | Stars | 分类 |
|------|------|-------|------|
| 1 | [OpenClaw](https://github.com/openclaw/openclaw) | 330k+ | 智能体框架 |
| 2 | [LangChain](https://github.com/langchain-ai/langchain) | 130k+ | 智能体框架 |
| 3 | [n8n](https://github.com/n8n-io/n8n) | 160k+ | 智能体框架 |
| 4 | [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | 160k | 智能体框架 |
| 5 | [Dify](https://github.com/langgenius/dify) | 110k–130k+ | 智能体框架 |
| 6 | [Langflow](https://github.com/langflow-ai/langflow) | 140k+ | 智能体框架 |
| 7 | [Superpowers](https://github.com/obra/superpowers) | 105k+ | 技能框架 |
| 8 | [The Agency](https://github.com/msitarzewski/agency-agents) | 59k+ | 人设合集 |
| 9 | [Coqui TTS](https://github.com/coqui-ai/TTS) | 45k+ | 有声书/TTS |
| 10 | [Llama Index](https://github.com/run-llama/llama_index) | 48k+ | 智能体框架 |
| 11 | [Embedchain](https://github.com/embedchain/embedchain) | 50k+ | 智能体框架 |
| 12 | [AutoGen](https://github.com/microsoft/autogen) | 50k–60k+ | 智能体框架 |
| 13 | [OpenHands](https://github.com/All-Hands-AI/OpenHands) | 60k+ | 智能体框架 |
| 14 | [MetaGPT](https://github.com/FoundationAgents/MetaGPT) | 60k+ | 智能体框架 |
| 15 | [Fish Speech](https://github.com/fishaudio/fish-speech) | 29k+ | 有声书/TTS |
| 16 | [Open-Sora](https://github.com/hpcaitech/Open-Sora) | 29k+ | AI 视频 |
| 17 | [ebook2audiobook](https://github.com/DrewThomasson/ebook2audiobook) | 18k+ | 有声书/TTS |
| 18 | [CosyVoice](https://github.com/FunAudioLLM/CosyVoice) | 20k+ | 有声书/TTS |
| 19 | [OpenAI Agents SDK](https://github.com/openai/openai-agents-python) | 20k+ | 智能体框架 |
| 20 | [waoowaoo](https://github.com/waoowaooAI/waoowaoo) | 10k+ | 短剧 |
| 21 | [Huobao Drama](https://github.com/chatfire-AI/huobao-drama) | 9k+ | 短剧 |

---

## 目录

- [智能体人设与角色合集](#智能体人设与角色合集)
- [技能与工作流框架](#技能与工作流框架)
- [智能体开发框架](#智能体开发框架)
- [OpenClaw 生态](#openclaw-生态)
- [MCP 与工具生态](#mcp-与工具生态)
- [智能体框架合集](#智能体框架合集)
- [技能库](#技能库)
- [大模型与使用场景](#大模型与使用场景)
- [AI 应用场景](#ai-应用场景)
- [相关资源](#相关资源)

---

## 智能体人设与角色合集

包含专业化 AI 智能体人格、角色定义、工作流和交付物的合集。

| 项目 | Stars | 说明 |
|------|-------|------|
| [**The Agency (agency-agents)**](https://github.com/msitarzewski/agency-agents) | 59k+ | 12 个部门 144+ 专业智能体人设（工程、设计、营销、销售等）。每个智能体具备人格、流程和可验证交付物。支持 Claude Code、Cursor、Copilot、Aider、Windsurf、OpenCode。 |
| [**awesome-openclaw-agents**](https://github.com/mergisi/awesome-openclaw-agents) | 160+ | 生产级 OpenClaw 智能体模板，含 SOUL.md 配置，覆盖 24 类。60 秒部署。支持 CrewClaw 的 Docker 部署。 |

---

## 技能与工作流框架

可组合的技能系统与开发方法论，教授智能体*如何*工作。

| 项目 | Stars | 说明 |
|------|-------|------|
| [**Superpowers**](https://github.com/obra/superpowers) | 105k+ | 完整软件开发工作流：头脑风暴 → 设计 → 计划 → 子智能体驱动开发。强制 TDD、系统化调试、Git worktrees。Claude Code、Cursor、Codex、OpenCode、Gemini CLI 插件。 |
| [**agent-skills**](https://github.com/addyosmani/agent-skills) | 100+ | 工程级技能，7 个斜杠命令：`/spec`、`/plan`、`/build`、`/test`、`/review`、`/code-simplify`、`/ship`。18 项底层技能覆盖完整开发生命周期。 |
| [**claude-skills**](https://github.com/alirezarezvani/claude-skills) | 6k+ | 200+ Claude Code 技能，覆盖 Claude Code、Codex、Gemini CLI、Cursor、OpenClaw。工程、营销、产品、合规、高管顾问。268 个 CLI 脚本。 |
| [**awesome-openclaw-skills**](https://github.com/sundial-org/awesome-openclaw-skills) | 900+ | 20 个类别 913 项精选技能，用于 OpenClaw 智能体功能扩展。 |

---

## 智能体开发框架

用于构建 AI 智能体的 SDK、平台与工具。想做 Agent 的人必看。

| 项目 | Stars | 说明 | 适用场景 |
|------|-------|------|----------|
| [**LangChain / LangGraph**](https://github.com/langchain-ai/langchain) | ~130k+ | Agent 的事实标准框架。多代理、工具调用、记忆、RAG 全家桶。Deep Agents 运行时。 | 几乎所有想做 Agent 的人必看 |
| [**OpenClaw**](https://github.com/openclaw/openclaw) | **330k+** | 个人 AI 助手，运行在你自己的设备上。25+ 消息渠道，SOUL.md/AGENTS.md，ClawHub 技能。2025–2026 增速最快。 | 自托管个人助手、多渠道 AI |
| [**n8n**](https://github.com/n8n-io/n8n) | ~160k+ | 低代码工作流 + 原生 AI Agent 能力。自托管最强。 | 想做生产级自动化 / AI 流程 |
| [**Dify**](https://github.com/langgenius/dify) | ~110k–130k+ | 开源版「生产级 Agent 工作流平台」。最完整 UI + 后端。 | 快速出产品 / 企业内部使用 |
| [**Langflow**](https://github.com/langflow-ai/langflow) | ~140k+ | 可视化拖拽构建 Agent & RAG。最友好低代码工具。 | 原型验证 / 非纯码农 |
| [**Microsoft Agent Framework**](https://github.com/microsoft/agent-framework) | ~8k+ | Python + .NET。图工作流、检查点、MCP、人工介入。2026 RC。 | 企业 .NET/Python 多智能体应用 |
| [**Llama Index**](https://github.com/run-llama/llama_index) | ~48k+ | LLM 应用数据框架。160+ 数据源，RAG，工具抽象，ReAct。 | RAG 应用、文档智能体、私有数据 |
| [**Pydantic AI**](https://github.com/pydantic/pydantic-ai) | ~15k+ | 类型安全的 Python 智能体框架。Pydantic 风格。V1 稳定。 | 生产级、类型安全智能体 |
| [**OpenAI Agents SDK**](https://github.com/openai/openai-agents-python) | ~20k+ | 轻量多智能体框架。Handoff、MCP、护栏、会话。支持 100+ LLM。 | 快速生产智能体、OpenAI 生态 |
| [**AutoGPT**](https://github.com/Significant-Gravitas/AutoGPT) | ~160k 历史峰值 | 最早火爆的完全自主 Agent。开山之作。 | 想了解 Agent 历史与思想 |
| [**AutoGen**](https://github.com/microsoft/autogen) | ~50k–60k+ | 微软多智能体对话框架。学术 & 复杂协作最强。 | 研究多代理系统 |
| [**CrewAI**](https://github.com/crewai/crewai) | 高活跃 | 角色分工的多代理编排。使用最简单直观。2–4 小时从概念到 Demo。 | 快速组队型多代理 |
| [**OpenHands**](https://github.com/All-Hands-AI/OpenHands) *(前 OpenDevin)* | ~60k+ | 最强开源「AI 软件工程师」Agent。可写代码修 bug。 | 编程 Agent / SWE-agent 方向 |
| [**mini-swe-agent**](https://github.com/SWE-agent/mini-swe-agent) | 上升 | ~100 行智能体，SWE-bench Verified >74%。Meta、NVIDIA、Stanford 在用。 | 轻量编程 Agent、修 GitHub Issue |
| [**MetaGPT**](https://github.com/FoundationAgents/MetaGPT) | ~60k+ | 用 SOP 模拟软件公司。多角色分工写项目。 | 想体验「AI 公司」概念 |
| [**XAgent**](https://github.com/OpenBMB/XAgent) | ~8.5k+ | 自主复杂任务求解。任务分解、工具学习、错误恢复。 | 复杂自主任务 |
| [**AgentVerse**](https://github.com/OpenBMB/AgentVerse) | ~5k+ | 多智能体仿真环境。ICLR 2024。任务求解 + 社会仿真。 | 多智能体协作研究 |
| [**Agent S / Simular**](https://github.com/simular-ai/Agent-S) | 快速上升 | 真正「像人一样用电脑」的 Agent（OSWorld SOTA）。 | 想做 computer-use / GUI 控制 |
| [**Embedchain**](https://github.com/embedchain/embedchain) | ~50k+ | 类 ChatGPT 的 RAG 框架。多数据源、多 LLM。 | 快速搭建 RAG / 聊天机器人 |

---

## OpenClaw 生态

[OpenClaw](https://github.com/openclaw/openclaw)（330k+ stars）是 2025–2026 增速最快的 AI 智能体项目。核心生态资源：

| 资源 | Stars | 说明 |
|------|-------|------|
| [**OpenClaw**](https://github.com/openclaw/openclaw) | 330k+ | 核心：个人 AI 助手，任意 OS，25+ 渠道（WhatsApp、Telegram、Slack 等），SOUL.md，语音/音频。 |
| [**ClawHub**](https://github.com/openclaw/clawhub) | 6.6k+ | 官方技能注册表。3,200+ 技能，向量搜索，CLI 安装。「AI 智能体的 npm」。 |
| [**awesome-openclaw-agents**](https://github.com/mergisi/awesome-openclaw-agents) | 160+ | 160+ SOUL.md 模板，24 类。 |
| [**awesome-openclaw-skills**](https://github.com/sundial-org/awesome-openclaw-skills) | 900+ | 20 类 913 项精选技能。 |

---

## MCP 与工具生态

Model Context Protocol (MCP) 让智能体连接外部工具与数据。

| 项目 | Stars | 说明 |
|------|-------|------|
| [**awesome-mcp-servers**](https://github.com/wong2/awesome-mcp-servers) | ~3.7k+ | 精选 MCP 服务器列表。380+ 贡献者。 |
| [**awesome-remote-mcp-servers**](https://github.com/jaw9c/awesome-remote-mcp-servers) | - | 支持 OAuth/API Key 的远程 MCP 服务器。 |

---

## 智能体框架合集

AI 智能体开发框架与工具的精选列表。

| 项目 | Stars | 说明 |
|------|-------|------|
| [**awesome-llm-agents**](https://github.com/kaushikb11/awesome-llm-agents) | 1.3k+ | 全面收录 LLM 智能体框架：CrewAI、LangChain、AutoGen、Dify、Llama Index 等 100+ 项目。 |
| [**Awesome-LLM-Resources**](https://github.com/John-Dekka/Awesome-LLM-Resources) | - | 学习向。初级到进阶。框架、RAG、智能体、微调、部署。 |
| [**Awesome-Agent-Framework**](https://github.com/AgentSpaceAI/Awesome-Agent-Framework) | - | 流行智能体开发框架精选合集。 |
| [**awesome-ai-agent-frameworks**](https://github.com/axioma-ai-labs/awesome-ai-agent-frameworks) | - | AI 智能体框架对比与资源。 |
| [**awesome-agents**](https://github.com/Scottcjn/awesome-agents) | - | AI 智能体项目与资源集合。 |

---

## 技能库

面向特定领域的技能包，用于扩展智能体能力。

| 项目 | Stars | 说明 |
|------|-------|------|
| [**agents-skills**](https://github.com/BrunoAlan/agents-skills) | - | TypeScript、React、Next.js、Tailwind、测试框架相关技能。遵循开放智能体技能标准。 |
| [**agent-skills**](https://github.com/chriscox/agent-skills) | - | 可复用技能：project-planner、docs-sync，用于 GitHub Issues 与文档同步。 |

---

## 大模型与使用场景

2026 年主流大模型及推荐使用场景。没有单一最优模型，按任务选择。

| 模型 | 提供商 | 最擅长 | 备注 |
|------|--------|--------|------|
| **Claude 4 Opus / Sonnet 4.6** | Anthropic | **编程**、长文档、复杂推理 | SWE-bench Verified 72.7%，200K+ 上下文 |
| **GPT-5 / 5.2 / 5.4** | OpenAI | **全能**：创意、研究、编程、语音 | 128K–1M 上下文，用途广泛 |
| **Gemini 3.1 Pro** | Google | **多模态**：视频、音频、图像、文本 | 1M token 上下文，ARC-AGI-2 领先 |
| **DeepSeek R1 / V3.2** | DeepSeek | **性价比**：前沿能力，成本约低 97% | 约 $0.28/$0.42 每百万 token，MIT，可自托管 |
| **Llama 4 Maverick** | Meta | **多模态 + 长上下文** | 视觉 + 1000 万 token 上下文 |
| **Qwen 2.5 / 3** | 阿里 | **编程**、多语言 | HumanEval 92% |
| **GLM-5** | 智谱 | **综合表现** | 中文能力强 |
| **Grok 3 / 4** | xAI | **均衡**、开放访问 | 实时数据 |
| **Mistral Large** | Mistral | **欧洲语言**、备选 | 多语言能力强 |
| **Gemma 3** | Google | **开源权重**、高效 | 适合微调 |

---

## AI 应用场景

面向特定领域的开源项目：数字人、短剧、有声书、视频生成等。

### 数字人

| 项目 | Stars | 说明 |
|------|-------|------|
| [**SadTalker**](https://github.com/OpenTalker/SadTalker) | ~14k+ | CVPR 2023。单张肖像 + 音频 → 口播视频。唇形同步，Apache 2.0。Hugging Face、Colab。 |
| [**Ultralight Digital Human**](https://github.com/anliyuan/Ultralight-Digital-Human) | ~2.4k+ | 超轻量数字人，移动端实时。自训练，WeNet/HuBERT 音频编码器。 |
| [**腾讯混元数字人**](https://github.com/Tencent/digitalhuman) | ~300+ | Hunyuan AI 数字人。Python。 |
| [**LAM (Large Avatar Model)**](https://github.com/aigc3d/LAM) | ~940+ | 阿里通义。单张图 → 3D 互动聊天头像，秒级生成。SIGGRAPH 2025。WebGL，音频驱动。 |
| [**LHM++**](https://github.com/aigc3d/LHM-plusplus) | ~130+ | 大模型人体重建。图片 → 3D 头部，0.79 秒推理。Apache 2.0。 |

### 短剧

| 项目 | Stars | 说明 |
|------|-------|------|
| [**Huobao Drama 火宝短剧**](https://github.com/chatfire-AI/huobao-drama) | ~9k+ | 端到端 AI 短剧。剧本到成片。Go + Vue3。角色/场景/分镜生成、视频合成。Docker。 |
| [**LocalMiniDrama**](https://github.com/xuanyustudio/LocalMiniDrama) | ~60+ | 本地离线短剧助手。Vue3 + Electron。数据不上云、无订阅费。DashScope、火山引擎。 |
| [**waoowaoo**](https://github.com/waoowaooAI/waoowaoo) | ~10k+ | 工业级 AI 影视平台。短剧到实拍级电影。AI 配音、多语言。Next.js 15。 |

### 有声书 / 语音合成

| 项目 | Stars | 说明 |
|------|-------|------|
| [**Coqui TTS**](https://github.com/coqui-ai/TTS) | ~45k+ | 1,100+ 语言。XTTS 声音克隆、Bark。MPL-2.0。 |
| [**ebook2audiobook**](https://github.com/DrewThomasson/ebook2audiobook) | ~18k+ | EPUB/PDF/TXT → 多角色有声书。1,158+ 语言，声音克隆。CPU/GPU、Colab、HF。 |
| [**CosyVoice**](https://github.com/FunAudioLLM/CosyVoice) | ~20k+ | 阿里通义。多语言 TTS。3–10 秒声音克隆，情感控制，流式。中英日粤韩。 |
| [**Fish Speech**](https://github.com/fishaudio/fish-speech) | ~29k+ | SOTA TTS。双 AR 架构，150ms 首包延迟。声音克隆，72 万小时训练。 |
| [**LiberSonora**](https://github.com/LiberSonora/LiberSonora) | ~460+ | AI 有声书工具集。离线运行，Docker。FFmpeg、FunASR、Ollama。 |
| [**auto-audio-book**](https://github.com/zqq-nuli/auto-audio-book) | ~244+ | 中文有声书自动化。Gemini + CosyVoice2。小说爬取、多角色、1000+ 章。 |
| [**Audiobook Creator**](https://github.com/prakharsr/audiobook-creator) | ~460+ | EPUB/PDF/TXT → 多角色有声书。Kokoro/Orpheus TTS，LLM 角色识别。GPL-3.0。 |

### AI 视频生成

| 项目 | Stars | 说明 |
|------|-------|------|
| [**Open-Sora**](https://github.com/hpcaitech/Open-Sora) | ~29k+ | 开源视频生成。Open-Sora 2.0：11B 参数，20 万美元训练。对标 HunyuanVideo。 |
| [**Open-Sora-Plan**](https://github.com/PKU-YuanGroup/Open-Sora-Plan) | ~12k+ | 北大。社区 Sora 复现。华为昇腾。 |
| [**HunyuanVideo**](https://github.com/Tencent-Hunyuan/HunyuanVideo) | ~12k+ | 腾讯。130 亿参数。文生视频。Hugging Face Diffusers、ComfyUI。 |
| [**awesome-ai-video-generation**](https://github.com/ristponex/awesome-ai-video-generation) | - | 106 个 AI 视频模型。可灵、Seedance、万、Veo、海螺、Vidu。提示词指南、API 对比。 |

### 其他热门 AI 应用

| 项目 | Stars | 说明 |
|------|-------|------|
| [**OpenAkita**](https://github.com/openakita/openakita) | ~1.4k+ | 多智能体 AI 助手。30+ LLM，6 个 IM 平台，89+ 工具。桌面/网页/移动端。 |
| [**CountBot**](https://github.com/countbot-ai/CountBot) | ~220+ | 轻量中文 AI Agent。飞书、钉钉、QQ、Telegram、微信。2.1 万行 Python。 |

---

## 相关资源

以下资源均提供 GitHub 链接。

| 资源 | Stars | 说明 |
|------|-------|------|
| [**agency-agents-zh**](https://github.com/jnMetaCode/agency-agents-zh) | - | The Agency 中文版（100 个翻译智能体 + 9 个中国市场原创）。 |
| [**agent-teams**](https://github.com/dsclca12/agent-teams) | - | 独立 Agency 翻译，含 Bilibili、微信、小红书等本地化。 |

---

## 类别对比

| 类型 | 示例 | 关注点 |
|------|------|--------|
| **人设** | agency-agents、awesome-openclaw-agents | 智能体*是谁* —— 角色、人格、领域专长 |
| **技能** | Superpowers、claude-skills、agent-skills | 智能体*如何*工作 —— 工作流、流程、方法论 |
| **框架** | LangChain、CrewAI、OpenClaw | *用什么*基础设施 —— SDK、编排、工具链 |

---

## 贡献

欢迎贡献！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解指南。

---

## 许可证

[MIT](LICENSE)
