<p align="center">
  <a href="README.zh-CN.md">中文版</a> ·
  <a href="README.md">English</a>
</p>

# Awesome AI Agents

[![Awesome](https://cdn.jsdelivr.net/gh/sindresorhus/awesome@d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![GitHub Stars](https://img.shields.io/github/stars/charlie-cao/agents-awesome?style=social)](https://github.com/charlie-cao/agents-awesome)
[![Follow @charlie-cao](https://img.shields.io/twitter/follow/charlie-cao?style=social)](https://twitter.com/charlie-cao)

A curated list of awesome AI agent collections, skills frameworks, LLMs, and related resources for coding agents (Claude Code, Cursor, Codex, OpenCode, Gemini CLI, OpenClaw, etc.). Covers autonomous agents, multi-agent systems, agent orchestration, coding agents, RAG, memory, productivity automation, and AI workflow tools.

> **Last updated:** March 2026 · All entries link to GitHub · Stars are approximate

---

## GitHub Heat Ranking (热度排行)

Top repositories by stars across all categories:

| Rank | Project | Stars | Category |
|------|---------|-------|----------|
| 1 | [OpenClaw](https://github.com/openclaw/openclaw) | 330k+ | Agent Framework |
| 2 | [LangChain](https://github.com/langchain-ai/langchain) | 130k+ | Agent Framework |
| 3 | [n8n](https://github.com/n8n-io/n8n) | 160k+ | Agent Framework |
| 4 | [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | 160k | Agent Framework |
| 5 | [Dify](https://github.com/langgenius/dify) | 110k–130k+ | Agent Framework |
| 6 | [Langflow](https://github.com/langflow-ai/langflow) | 140k+ | Agent Framework |
| 7 | [Superpowers](https://github.com/obra/superpowers) | 105k+ | Skills |
| 8 | [The Agency](https://github.com/msitarzewski/agency-agents) | 59k+ | Personas |
| 9 | [Coqui TTS](https://github.com/coqui-ai/TTS) | 45k+ | Audiobooks/TTS |
| 10 | [Llama Index](https://github.com/run-llama/llama_index) | 48k+ | Agent Framework |
| 11 | [Embedchain](https://github.com/embedchain/embedchain) | 50k+ | Agent Framework |
| 12 | [AutoGen](https://github.com/microsoft/autogen) | 50k–60k+ | Agent Framework |
| 13 | [OpenHands](https://github.com/All-Hands-AI/OpenHands) | 60k+ | Agent Framework |
| 14 | [MetaGPT](https://github.com/FoundationAgents/MetaGPT) | 60k+ | Agent Framework |
| 15 | [Fish Speech](https://github.com/fishaudio/fish-speech) | 29k+ | Audiobooks/TTS |
| 16 | [Open-Sora](https://github.com/hpcaitech/Open-Sora) | 29k+ | AI Video |
| 17 | [ebook2audiobook](https://github.com/DrewThomasson/ebook2audiobook) | 18k+ | Audiobooks/TTS |
| 18 | [CosyVoice](https://github.com/FunAudioLLM/CosyVoice) | 20k+ | Audiobooks/TTS |
| 19 | [OpenAI Agents SDK](https://github.com/openai/openai-agents-python) | 20k+ | Agent Framework |
| 20 | [waoowaoo](https://github.com/waoowaooAI/waoowaoo) | 10k+ | Short Drama |
| 21 | [Huobao Drama](https://github.com/chatfire-AI/huobao-drama) | 9k+ | Short Drama |

---

## Table of Contents

- [Heat Ranking](#github-heat-ranking-热度排行)
- [Agent Personas & Role Collections](#agent-personas--role-collections)
- [Skills & Workflow Frameworks](#skills--workflow-frameworks)
- [Agent Development Frameworks](#agent-development-frameworks)
- [OpenClaw Ecosystem](#openclaw-ecosystem)
- [MCP & Tool Ecosystem](#mcp--tool-ecosystem)
- [Agent Framework Collections](#agent-framework-collections)
- [Skills Libraries](#skills-libraries)
- [LLM Models & Use Cases](#llm-models--use-cases)
- [AI Application Scenarios](#ai-application-scenarios)
- [Related Resources](#related-resources)
- [Links](#links)

---

## Agent Personas & Role Collections

Collections of specialized AI agent personalities with defined roles, workflows, and deliverables.

| Project | Stars | Description |
|---------|-------|-------------|
| [**The Agency (agency-agents)**](https://github.com/msitarzewski/agency-agents) | 59k+ | 144+ specialized agent personas across 12 divisions (Engineering, Design, Marketing, Sales, etc.). Each agent has personality, processes, and proven deliverables. Supports Claude Code, Cursor, Copilot, Aider, Windsurf, OpenCode. |
| [**awesome-openclaw-agents**](https://github.com/mergisi/awesome-openclaw-agents) | 160+ | Production-ready OpenClaw agent templates with SOUL.md configs across 24 categories. Deploy in 60 seconds. CrewClaw integration for Docker deployment. |

---

## Skills & Workflow Frameworks

Composable skill systems and development methodologies that teach agents *how* to work.

| Project | Stars | Description |
|---------|-------|-------------|
| [**Superpowers**](https://github.com/obra/superpowers) | 105k+ | Complete software development workflow: brainstorming → design → plans → subagent-driven-development. Enforces TDD, systematic debugging, git worktrees. Plugin for Claude Code, Cursor, Codex, OpenCode, Gemini CLI. |
| [**agent-skills**](https://github.com/addyosmani/agent-skills) | 100+ | Production-grade engineering skills with 7 slash commands: `/spec`, `/plan`, `/build`, `/test`, `/review`, `/code-simplify`, `/ship`. 18 underlying skills for full development lifecycle. |
| [**claude-skills**](https://github.com/alirezarezvani/claude-skills) | 6k+ | 200+ Claude Code skills for Claude Code, Codex, Gemini CLI, Cursor, OpenClaw. Engineering, marketing, product, compliance, C-level advisory. 268 CLI scripts. |
| [**awesome-openclaw-skills**](https://github.com/sundial-org/awesome-openclaw-skills) | 900+ | 913 curated skills across 20 categories for OpenClaw agent functionality. |

---

## Agent Development Frameworks

SDKs, platforms, and tools for building AI agents. Essential references for anyone building agents.

| Project | Stars | Description | When to Use |
|---------|-------|-------------|-------------|
| [**LangChain / LangGraph**](https://github.com/langchain-ai/langchain) | ~130k+ | De facto standard for Agent frameworks. Multi-agent, tool calling, memory, RAG — full stack. Deep Agents runtime for planning & context isolation. | Almost everyone building agents should check this first |
| [**OpenClaw**](https://github.com/openclaw/openclaw) | **330k+** | Personal AI assistant on your own devices. 25+ messaging channels, SOUL.md/AGENTS.md, ClawHub skills. Fastest-growing agent project in 2025–2026. | Self-hosted personal assistant, multi-channel AI |
| [**n8n**](https://github.com/n8n-io/n8n) | ~160k+ | Low-code workflow + native AI Agent support. Best self-hosted option for automation. | Production automation / AI workflows |
| [**Dify**](https://github.com/langgenius/dify) | ~110k–130k+ | Open-source "production-grade Agent workflow platform." Complete UI + backend. | Fast product delivery / enterprise internal use |
| [**Langflow**](https://github.com/langflow-ai/langflow) | ~140k+ | Visual drag-and-drop Agent & RAG builder. Most user-friendly low-code tool. | Prototyping / non-coders |
| [**Microsoft Agent Framework**](https://github.com/microsoft/agent-framework) | ~8k+ | Python + .NET. Graph workflows, checkpointing, MCP, human-in-the-loop. RC as of 2026. | Enterprise .NET/Python multi-agent apps |
| [**Llama Index**](https://github.com/run-llama/llama_index) | ~48k+ | Data framework for LLM apps. 160+ data sources, RAG, tool abstraction, ReAct. | RAG apps, document agents, private data |
| [**Pydantic AI**](https://github.com/pydantic/pydantic-ai) | ~15k+ | Type-safe Python agent framework. Pydantic way. Stable V1. | Production-grade, type-safe agents |
| [**OpenAI Agents SDK**](https://github.com/openai/openai-agents-python) | ~20k+ | Lightweight multi-agent framework. Handoffs, MCP, guardrails, sessions. 100+ LLM support beyond OpenAI. | Quick production agents, OpenAI ecosystem |
| [**AutoGPT**](https://github.com/Significant-Gravitas/AutoGPT) | ~160k (peak) | Earliest fully autonomous Agent that went viral. Groundbreaking. | Understanding Agent history and philosophy |
| [**AutoGen**](https://github.com/microsoft/autogen) | ~50k–60k+ | Microsoft multi-agent conversational framework. Strong for research & complex collaboration. | Multi-agent systems research |
| [**CrewAI**](https://github.com/crewai/crewai) | High activity | Role-based multi-agent orchestration. Simplest and most intuitive. 2–4h from concept to demo. | Quick multi-agent team assembly |
| [**OpenHands**](https://github.com/All-Hands-AI/OpenHands) *(formerly OpenDevin)* | ~60k+ | Strongest open-source "AI Software Engineer" Agent. Writes code, fixes bugs. | Coding Agent / SWE-agent direction |
| [**mini-swe-agent**](https://github.com/SWE-agent/mini-swe-agent) | Rising | ~100-line agent, >74% SWE-bench Verified. Used by Meta, NVIDIA, Stanford. Minimal config. | Lightweight coding agent, GitHub issues |
| [**MetaGPT**](https://github.com/FoundationAgents/MetaGPT) | ~60k+ | Simulates a software company with SOPs. Multi-role division of labor. | Experiencing the "AI company" concept |
| [**XAgent**](https://github.com/OpenBMB/XAgent) | ~8.5k+ | Autonomous complex-task solver. Task decomposition, tool learning, error recovery. | Complex autonomous tasks |
| [**AgentVerse**](https://github.com/OpenBMB/AgentVerse) | ~5k+ | Multi-agent simulation environment. ICLR 2024. Task-solving + social simulation. | Multi-agent collaboration research |
| [**Agent S / Simular**](https://github.com/simular-ai/Agent-S) | Rising fast | Agent that "uses computers like a human" (OSWorld SOTA). | Computer-use / GUI control |
| [**Embedchain**](https://github.com/embedchain/embedchain) | ~50k+ | ChatGPT-like RAG framework. Multi-source ingestion, multi-LLM. | Quick RAG / chatbot apps |

---

## OpenClaw Ecosystem

[OpenClaw](https://github.com/openclaw/openclaw) (330k+ stars) is the fastest-growing AI agent project. Key ecosystem resources:

| Resource | Stars | Description |
|----------|-------|-------------|
| [**OpenClaw**](https://github.com/openclaw/openclaw) | 330k+ | Core: personal AI assistant, any OS, 25+ channels (WhatsApp, Telegram, Slack, etc.), SOUL.md, voice/audio. |
| [**ClawHub**](https://github.com/openclaw/clawhub) | 6.6k+ | Official skill registry. 3,200+ skills, vector search, CLI install. "npm for AI agents." |
| [**awesome-openclaw-agents**](https://github.com/mergisi/awesome-openclaw-agents) | 160+ | 160+ SOUL.md templates, 24 categories. |
| [**awesome-openclaw-skills**](https://github.com/sundial-org/awesome-openclaw-skills) | 900+ | 913 curated skills across 20 categories. |

---

## MCP & Tool Ecosystem

Model Context Protocol (MCP) extends agents with external tools and data.

| Project | Stars | Description |
|---------|-------|-------------|
| [**awesome-mcp-servers**](https://github.com/wong2/awesome-mcp-servers) | ~3.7k+ | Curated MCP server list. 380+ contributors. |
| [**awesome-remote-mcp-servers**](https://github.com/jaw9c/awesome-remote-mcp-servers) | - | Remote MCP servers with OAuth/API key auth. |

---

## Agent Framework Collections

Curated lists of AI agent development frameworks and tools.

| Project | Stars | Description |
|---------|-------|-------------|
| [**awesome-llm-agents**](https://github.com/kaushikb11/awesome-llm-agents) | 1.3k+ | Comprehensive LLM agent frameworks: CrewAI, LangChain, AutoGen, Dify, Llama Index, 100+ more. |
| [**Awesome-LLM-Resources**](https://github.com/John-Dekka/Awesome-LLM-Resources) | - | Learning-focused. Beginners to advanced. Frameworks, RAG, agents, fine-tuning, deployment. |
| [**Awesome-Agent-Framework**](https://github.com/AgentSpaceAI/Awesome-Agent-Framework) | - | Curated popular Agent frameworks. |
| [**awesome-ai-agent-frameworks**](https://github.com/axioma-ai-labs/awesome-ai-agent-frameworks) | - | AI agent framework comparisons. |
| [**awesome-agents**](https://github.com/Scottcjn/awesome-agents) | - | AI agent projects and resources. |

---

## Skills Libraries

Domain-specific skill packages for extending agent capabilities.

| Project | Stars | Description |
|---------|-------|-------------|
| [**agents-skills**](https://github.com/BrunoAlan/agents-skills) | - | TypeScript, React, Next.js, Tailwind, testing. Open agent skills standard. |
| [**agent-skills**](https://github.com/chriscox/agent-skills) | - | project-planner, docs-sync for GitHub issues and docs. |

---

## LLM Models & Use Cases

Top models in 2026 and when to use them. No single model wins everywhere — match to your task.

| Model | Provider | Best For | Notes |
|-------|----------|----------|-------|
| **Claude 4 Opus / Sonnet 4.6** | Anthropic | **Coding**, long documents, complex reasoning | SWE-bench Verified 72.7%, 200K+ context |
| **GPT-5 / 5.2 / 5.4** | OpenAI | **All-rounder**: creative, research, coding, voice | 128K–1M context, versatile |
| **Gemini 3.1 Pro** | Google | **Multimodal**: video, audio, images, text | 1M-token context, ARC-AGI-2 top |
| **DeepSeek R1 / V3.2** | DeepSeek | **Value**: frontier intelligence at ~97% lower cost | $0.28/$0.42 per 1M tokens, MIT, self-host |
| **Llama 4 Maverick** | Meta | **Multimodal + long context** | Vision + 10M context |
| **Qwen 2.5 / 3** | Alibaba | **Coding**, multilingual | 92% HumanEval |
| **GLM-5** | Zhipu AI | **Overall performance** | Strong Chinese support |
| **Grok 3 / 4** | xAI | **Balanced**, open access | Real-time data |
| **Mistral Large** | Mistral | **European languages**, alternative | Strong multilingual |
| **Gemma 3** | Google | **Open weights**, efficient | Good for fine-tuning |

---

## AI Application Scenarios

Open-source projects for specific AI application domains: digital humans, short drama, audiobooks, video generation, and more.

### Digital Humans (数字人)

| Project | Stars | Description |
|---------|-------|-------------|
| [**SadTalker**](https://github.com/OpenTalker/SadTalker) | ~14k+ | CVPR 2023. Single portrait + audio → talking head video. Lip sync, Apache 2.0. Hugging Face, Colab. |
| [**Ultralight Digital Human**](https://github.com/anliyuan/Ultralight-Digital-Human) | ~2.4k+ | Lightweight digital human, real-time on mobile. Self-training, WeNet/HuBERT audio encoders. |
| [**Tencent Hunyuan Digital Human**](https://github.com/Tencent/digitalhuman) | ~300+ | Hunyuan AI digital human. Python-based. |
| [**LAM (Large Avatar Model)**](https://github.com/aigc3d/LAM) | ~940+ | Alibaba Tongyi. Single image → 3D interactive chat avatar in seconds. SIGGRAPH 2025. WebGL, audio-driven. |
| [**LHM++**](https://github.com/aigc3d/LHM-plusplus) | ~130+ | Large Human Reconstruction. Image → 3D head, 0.79s inference. Apache 2.0. |

### Short Drama (短剧)

| Project | Stars | Description |
|---------|-------|-------------|
| [**Huobao Drama**](https://github.com/chatfire-AI/huobao-drama) | ~9k+ | End-to-end AI short drama. Script → video. Go + Vue3. Role/scene/storyboard gen, video synthesis. Docker. |
| [**LocalMiniDrama**](https://github.com/xuanyustudio/LocalMiniDrama) | ~60+ | Local offline short drama. Vue3 + Electron. No cloud, no subscription. DashScope, Volcano. |
| [**waoowaoo**](https://github.com/waoowaooAI/waoowaoo) | ~10k+ | Industrial AI film platform. Short drama to full production. AI dubbing, multi-language. Next.js 15. |

### Audiobooks & TTS (有声书 / 语音合成)

| Project | Stars | Description |
|---------|-------|-------------|
| [**Coqui TTS**](https://github.com/coqui-ai/TTS) | ~45k+ | 1,100+ languages. XTTS voice cloning, Bark. MPL-2.0. |
| [**ebook2audiobook**](https://github.com/DrewThomasson/ebook2audiobook) | ~18k+ | EPUB/PDF/TXT → multi-voice audiobook. 1,158+ languages, voice cloning. CPU/GPU, Colab, HF. |
| [**CosyVoice**](https://github.com/FunAudioLLM/CosyVoice) | ~20k+ | Alibaba. Multi-lingual TTS. 3–10s voice clone, emotion control, streaming. Chinese/English/Japanese/Cantonese/Korean. |
| [**Fish Speech**](https://github.com/fishaudio/fish-speech) | ~29k+ | SOTA TTS. Dual-AR, 150ms latency. Voice clone, 720k hrs training. |
| [**LiberSonora**](https://github.com/LiberSonora/LiberSonora) | ~460+ | AI-powered audiobook toolkit. Offline, Docker. FFmpeg, FunASR, Ollama. |
| [**auto-audio-book**](https://github.com/zqq-nuli/auto-audio-book) | ~244+ | Chinese audiobook automation. Gemini + CosyVoice2. Novel crawl, multi-role, 1000+ chapters. |
| [**Audiobook Creator**](https://github.com/prakharsr/audiobook-creator) | ~460+ | EPUB/PDF/TXT → multi-role audiobook. Kokoro/Orpheus TTS, LLM role detection. GPL-3.0. |

### AI Video Generation

| Project | Stars | Description |
|---------|-------|-------------|
| [**Open-Sora**](https://github.com/hpcaitech/Open-Sora) | ~29k+ | Open-source video generation. Open-Sora 2.0: 11B, $200K training. Comparable to HunyuanVideo. |
| [**Open-Sora-Plan**](https://github.com/PKU-YuanGroup/Open-Sora-Plan) | ~12k+ | Peking University. Community Sora reproduction. Huawei Ascend. |
| [**HunyuanVideo**](https://github.com/Tencent-Hunyuan/HunyuanVideo) | ~12k+ | Tencent. 13B+ params. Text-to-video. Hugging Face Diffusers, ComfyUI. |
| [**awesome-ai-video-generation**](https://github.com/ristponex/awesome-ai-video-generation) | - | 106 AI video models. Kling, Seedance, Wan, Veo, Hailuo, Vidu. Prompt guides, API comparison. |

### Other Trending AI Applications

| Project | Stars | Description |
|---------|-------|-------------|
| [**OpenAkita**](https://github.com/openakita/openakita) | ~1.4k+ | Multi-agent AI assistant. 30+ LLMs, 6 IM platforms, 89+ tools. Desktop/web/mobile. |
| [**CountBot**](https://github.com/countbot-ai/CountBot) | ~220+ | Lightweight Chinese AI Agent. Feishu, DingTalk, QQ, Telegram, WeChat. 21k LOC. |

---

## Related Resources

All resources below have GitHub links.

| Resource | Stars | Description |
|----------|-------|-------------|
| [**agency-agents-zh**](https://github.com/jnMetaCode/agency-agents-zh) | - | Chinese translation of The Agency (100 agents + 9 China-market originals). |
| [**agent-teams**](https://github.com/dsclca12/agent-teams) | - | Independent Agency translation with Bilibili, WeChat, Xiaohongshu localization. |

---

## Category Comparison

| Type | Examples | Focus |
|------|----------|-------|
| **Personas** | agency-agents, awesome-openclaw-agents | *Who* the agent is — role, personality, domain expertise |
| **Skills** | Superpowers, claude-skills, agent-skills | *How* the agent works — workflows, processes, methodologies |
| **Frameworks** | LangChain, CrewAI, OpenClaw | *What* infrastructure — SDKs, orchestration, tooling |

---

## Links

| | |
|---|---|
| [Contributing](CONTRIBUTING.md) | How to add or update resources |
| [Code of Conduct](CODE_OF_CONDUCT.md) | Community guidelines |
| [Security](SECURITY.md) | How to report vulnerabilities |
| [Changelog](CHANGELOG.md) | Version history |
| [License](LICENSE) | MIT |

---

## ❤️ Sponsor This Project

If this list saves you time, consider [sponsoring its development](https://github.com/sponsors/charlie-cao):

[![GitHub Sponsor](https://img.shields.io/github/sponsors/charlie-cao?style=for-the-badge)](https://github.com/sponsors/charlie-cao)
[![Open Collective](https://img.shields.io/badge/Open_Collective-Support-orange?style=for-the-badge)](https://opencollective.com/agents-awesome)

Your sponsorship helps us keep the list up-to-date with daily automated trending updates and quality curation.

---

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

[MIT](LICENSE) — use freely, attribution appreciated.
