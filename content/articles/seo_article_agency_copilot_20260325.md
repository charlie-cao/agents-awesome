# How to Power Up GitHub Copilot with 140+ Specialized AI Agents — A Complete Guide

*Combine agency-agents' expert personas with VS Code Insiders' Copilot Agent Mode for a next-level dev experience.*

![Copilot + Agents](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800)

## The Problem with Generic AI Coding Assistants

Most AI coding assistants — including Copilot — are great generalists. But the moment you need **deep, specialized knowledge** in a specific domain (frontend architecture, backend design, security audits), generic AI starts hallucinating, surfacing outdated patterns, or giving shallow advice.

What if your AI coding assistant could tap into **140+ expert-level personas** — each one crafted by professionals in that exact domain?

That's exactly what **agency-agents** + **VS Code Insiders' Copilot Agent Mode** enables.

---

## What Is agency-agents?

[agency-agents](https://github.com/msitarzewski/agency-agents) is an open-source project offering **140+ specialized AI agent personas** — each defined as a Markdown file with a role description, expertise scope, working instructions, and collaboration guidelines.

Think of it as a library of expert consultants:
- **Frontend Wizard** — React performance optimization, accessibility audits
- **Backend Architect** — system design, API patterns, scalability
- **Security Sentinel** — penetration testing, vulnerability scanning
- **UI/UX Designer** — layout optimization, design system consistency

Each persona is a structured Markdown file. Copilot can load these directly as **Custom Agents**.

---

## The Synergy: agency-agents + Copilot Agent Mode

VS Code Insiders (the preview channel) introduced **Agent Mode** — an evolution of Copilot Chat that can:
- Execute multi-step tasks autonomously
- Read/write files across your workspace
- Delegate to specialized agents you define
- Hand off tasks between agents in a session

Combine that with agency-agents' expert personas and you get:

> "AI company-level expertise + powerful execution engine = shipping faster"

### How It Works

1. **Copilot Agent Mode** orchestrates the workflow
2. **agency-agents personas** provide specialized planning/expertise
3. **handoff** transfers context between agents seamlessly
4. **Copilot Cloud Agent** handles the final PR/submission

---

## Installation Guide (VS Code Insiders + Copilot)

### Step 1: Install agency-agents

```bash
git clone https://github.com/msitarzewski/agency-agents.git
cd agency-agents
```

### Step 2: Run the Copilot setup script

```bash
./scripts/install.sh --tool copilot
```

This auto-copies agent files to `~/.copilot/agents/` where Copilot recognizes them.

> If needed: `./scripts/convert.sh --tool copilot` first, then install.

### Step 3: Enable Agent Mode in VS Code Insiders

1. Install **GitHub Copilot** and **GitHub Copilot Chat** extensions (Insiders versions)
2. Enable these settings:
   - `chat.agent.enabled: true`
   - `github.copilot.chat.agent.enabled: true`
3. Restart VS Code Insiders

### Step 4: Use It

Open Copilot Chat (`Ctrl+Shift+I` / `Cmd+Shift+I`), select Agent mode from the chat input dropdown, then reference personas directly:

```
@FrontendDeveloper "Optimize this React component for performance and accessibility"
@SecuritySentinel "Audit this API endpoint for vulnerabilities"
@BackendArchitect "Design a scalable microservices pattern for this use case"
```

In **Agent Mode** (Insiders preview feature), Copilot will autonomously execute multi-step workflows across your workspace.

---

## Why This Combo Is a Game Changer

### agency-agents covers the expertise gap
- **140+ specialized personas** for every use case
- Role-playing as domain experts — the expertise is embedded in working instructions

### Copilot Agent Mode enables autonomous execution
- File operations, terminal commands, multi-file refactoring
- **handoff** between sessions — one agent plans, another executes

### The result = enterprise-level AI engineering at open-source cost

---

## Key Notes

- Requires an active **GitHub Copilot subscription** (Pro / Business / Enterprise)
- Insiders builds get Agent Mode features before stable releases — expect rapid changes
- If the install script has issues (non-standard paths), manually copy `.md` files to your Copilot agents directory
- Copilot defaults to the GPT model family, but you can switch to Claude if preferred

---

## Further Exploration

- [agency-agents GitHub](https://github.com/msitarzewski/agency-agents)
- [VS Code Official Agents Documentation](https://code.visualstudio.com/docs/copilot/agents/overview)
- [agents-awesome collection](https://github.com/charlie-cao/agents-awesome) — 140+ curated AI agent frameworks and tools

---

*This article is part of the daily-updated [agents-awesome](https://github.com/charlie-cao/agents-awesome) GitHub collection. Star it for daily insights on AI agents, coding tools, and emerging AGI patterns.*
