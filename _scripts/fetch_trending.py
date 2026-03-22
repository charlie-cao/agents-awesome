#!/usr/bin/env python3
"""GitHub AI Agent 热门项目抓取器"""
import os, sys, json, time, codecs
from datetime import datetime, timedelta

sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')

GITHUB_API = "https://api.github.com"
CATEGORIES = {
    "ai-agents": {
        "name": "🤖 AI Agent 框架",
        "queries": [
            "ai agent framework",
            "autonomous agent",
            "multi-agent system",
            "agent orchestration",
            "crewai OR langchain OR autogen OR pydantic-ai OR openai-agents-python",
        ],
        "exclude": ["docs", "tutorial", "blog"],
    },
    "coding-agents": {
        "name": "💻 编程 Agent",
        "queries": [
            "swe-agent OR coding agent",
            "devin OR claude-code OR cursor-agent",
            "code generation agent",
            "software engineering agent",
            "openhands OR swebench",
        ],
        "exclude": [],
    },
    "rag-memory": {
        "name": "🧠 RAG 与记忆系统",
        "queries": [
            "rag retrieval augmented",
            "agent memory",
            "knowledge graph agent",
            "letta OR memgpt OR chatdb",
        ],
        "exclude": [],
    },
    "productivity": {
        "name": "⚡ 生产力与自动化",
        "queries": [
            "n8n OR dify OR langflow workflow",
            "automation agent",
            "no-code agent",
            "browser agent",
        ],
        "exclude": [],
    },
    "mcp-tools": {
        "name": "🔌 MCP 与工具生态",
        "queries": [
            "model context protocol",
            "mcp server",
            "agent tools",
            "tool calling",
        ],
        "exclude": [],
    },
    "evaluation": {
        "name": "📊 评估与基准测试",
        "queries": [
            "agent evaluation benchmark",
            "agentbench OR gaia benchmark",
            "agent evaluation framework",
        ],
        "exclude": [],
    },
    "chinese-ecosystem": {
        "name": "🇨🇳 中国生态",
        "queries": [
            "coze OR 扣子",
            "通义 OR 文心 agent",
        ],
        "exclude": [],
    },
    "safety": {
        "name": "🔒 安全与对齐",
        "queries": [
            "agent safety",
            "ai alignment agent",
            "agent guardrails",
        ],
        "exclude": [],
    },
}

def github_get(url, params=None):
    import urllib.request, urllib.parse
    token = os.environ.get("GITHUB_TOKEN", "")
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "agents-awesome-tracker/1.0",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"

    for attempt in range(3):
        try:
            if params:
                url += "?" + urllib.parse.urlencode(params)
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=20) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except Exception as e:
            print(f"  ⚠️ Attempt {attempt+1} failed: {e}", flush=True)
            time.sleep(2 ** attempt)
    return None

def fetch_search_repos(query, per_page=30):
    params = {
        "q": query,
        "sort": "stars",
        "order": "desc",
        "per_page": per_page,
    }
    url = f"{GITHUB_API}/search/repositories"
    result = github_get(url, params)
    return result.get("items", []) if result else []

def format_stars(n):
    if n >= 1000:
        return f"{n/1000:.1f}k"
    return str(n)

def get_repo_details(full_name):
    url = f"{GITHUB_API}/repos/{full_name}"
    return github_get(url)

def main():
    print("=" * 60)
    print("  GitHub AI Agent 热门项目每日追踪")
    print(f"  {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print("=" * 60)
    
    all_results = {}
    
    for cat_id, cat_info in CATEGORIES.items():
        print(f"\n📂 {cat_info['name']}...", flush=True)
        repos = []
        seen_names = set()
        
        for query in cat_info["queries"]:
            print(f"  🔍 Query: {query}", flush=True)
            results = fetch_search_repos(query)
            
            for repo in results:
                name = repo["full_name"]
                if name in seen_names:
                    continue
                desc = (repo.get("description") or "").lower()
                if any(ex in desc for ex in cat_info["exclude"]):
                    continue
                seen_names.add(name)
                
                # 获取更多详情
                detail = get_repo_details(name)
                if detail:
                    repo["open_issues"] = detail.get("open_issues_count", 0)
                    repo["topics"] = detail.get("topics", [])[:8]
                    repo["pushed_at"] = detail.get("pushed_at", "")
                repos.append(repo)
            
            time.sleep(1)  # 避免限速
        
        # 按 star 排序
        repos.sort(key=lambda r: r.get("stargazers_count", 0), reverse=True)
        repos = repos[:15]  # 每个分类最多15个
        
        all_results[cat_id] = {
            "name": cat_info["name"],
            "repos": repos,
            "timestamp": datetime.now().isoformat(),
        }
        
        print(f"  ✅ 找到 {len(repos)} 个项目")
    
    return all_results

def save_results(results, out_dir):
    os.makedirs(out_dir, exist_ok=True)
    date_str = datetime.now().strftime("%Y-%m-%d")
    json_path = os.path.join(out_dir, f"trending_{date_str}.json")
    
    # 保存 JSON
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    
    # 生成 Markdown 报告
    md_path = os.path.join(out_dir, f"trending_{date_str}.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(f"# 🔥 GitHub AI Agent 热门项目\n\n")
        f.write(f"> ⏰ 更新时间: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n\n")
        f.write("---\n\n")
        
        for cat_id, data in results.items():
            f.write(f"## {data['name']}\n\n")
            for i, repo in enumerate(data["repos"], 1):
                stars = format_stars(repo.get("stargazers_count", 0))
                forks = format_stars(repo.get("forks_count", 0))
                desc = repo.get("description") or "无描述"
                lang = repo.get("language") or ""
                name = repo.get("full_name", "")
                topics = ", ".join(repo.get("topics", []))
                
                f.write(f"### {i}. [{name}](https://github.com/{name})\n\n")
                f.write(f"⭐ {stars} | 🍴 {forks} | 📝 {lang}\n\n")
                f.write(f"{desc}\n\n")
                if topics:
                    f.write(f"🏷️ {topics}\n\n")
                f.write("---\n\n")
    
    print(f"\n💾 JSON: {json_path}")
    print(f"📄 MD: {md_path}")
    
    # 生成总览文件
    summary_path = os.path.join(out_dir, "TRENDING.md")
    with open(summary_path, "w", encoding="utf-8") as f:
        f.write(f"# 📊 今日 AI Agent 热门概览\n\n")
        f.write(f"> 生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n\n")
        
        for cat_id, data in results.items():
            f.write(f"### {data['name']}\n\n")
            top3 = data["repos"][:3]
            for i, repo in enumerate(top3, 1):
                stars = format_stars(repo.get("stargazers_count", 0))
                name = repo["full_name"]
                desc = repo.get("description") or ""
                f.write(f"{i}. **[{name}](https://github.com/{name})** ({stars}⭐)\n")
                f.write(f"   > {desc}\n\n")
            f.write(f"[→ 更多 {data['name']}...](trending_{date_str}.md)\n\n")
    
    print(f"📊 总览: {summary_path}")
    return json_path, md_path

if __name__ == "__main__":
    repo_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(repo_dir)
    out_dir = os.path.join(project_dir, "_data")
    
    print(f"输出目录: {out_dir}\n")
    results = main()
    save_results(results, out_dir)
    print("\n✅ 完成!")
