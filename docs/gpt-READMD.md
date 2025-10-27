---

## Analysis Summary

Purpose: Create a *production-ready, comprehensive, bilingual (EN / 简体中文) README.md* that replaces the current repo README and serves as a single-source onboarding, architecture summary, and operational reference for developers and maintainers.

Audience:

* *Primary*: Engineers (frontend/backend/devops) who will fork, run, extend, or deploy the project.
* *Secondary*: Product managers, technical reviewers, early adopters (small-business users) who want a clear feature & value overview.

Recommended Edit Mode: *transformational* — justification: the existing draft is short and fragmented; we need a full structured replacement that consolidates Project Architecture, Quick Start, Setup, and Final Setup instructions into one polished, actionable README.

Top 3 Priorities:

* 1. Clear *install & run* path (dev and prod) with exact env variables & commands.
* 2. Concise architecture & API overview linking to detailed docs/diagrams.
* 3. Security, deployment, and maintenance notes (RLS, keys, secrets, monitoring).

Key Risks / Red Flags:

* [FACT-CHECK REQUIRED: Verify which OpenAI model version and rate/usage limits the project intends to use and reflect that accurately in the README.]
* [NEEDS_SOURCE] for any external services' links or usage quotas referenced.
* [POTENTIAL_HARM] — exposing sample API keys or live credentials; ensure `.env.example` only.

Suggested Success Criteria:

* Readability ≤ Grade 12
* Passive voice < 12%
* All runtime-sensitive claims flagged for verification
* Quick-start completes within the documented steps for a new developer (local dev)

---

# Plan (Phase A → F summary)

1. *Phase A — Structure*: Consolidate top-level sections: Project Overview, Why, Features, Architecture, Quick Start, Setup (Env / Supabase / OpenAI), Edge Functions & API, Database Schema, Security, Deploy, Contributing, FAQ, License, Support.
2. *Phase B — Fact Safety*: Mark any claims needing date/version confirmation (OpenAI model, Supabase features). Keep placeholders for exact secrets and point to `.env.example`.
3. *Phase C — Narrative*: Keep terse developer-friendly prose; bilingual blocks under each major heading.
4. *Phase D — Line-Level*: Provide polished Markdown with code blocks, commands, and examples. Include a `Changelog` and `QA checklist`.
5. *Phase E — Accessibility & Metadata*: Provide short meta description and README badges (where applicable) and alt-text for diagrams.
6. *Phase F — QA & Delivery*: Deliver final `README.md` as full replacement (below) and summary of items for human review ([FACT-CHECK REQUIRED] tags).

---

# Final `README.md` replacement (complete)

````markdown
# AI Content Creator
*A full-stack web application that helps small businesses generate tailored marketing content (social posts & ad copy) quickly using AI.*

**Status:** Production-ready (see `Project_Architecture_Document.md` for versioning & diagrams).  
**Language:** English / 简体中文 (English first, followed by Chinese translations for each major section).

---

## Table of contents
1. [Project overview / 项目概览](#project-overview-项目概览)  
2. [Why this project / 为什么选这个项目](#why-this-project-为什么选这个项目)  
3. [Features / 功能一览](#features-功能一览)  
4. [Architecture (high level) / 架构概览](#architecture-高层架构)  
5. [Quick start — local dev / 快速开始 — 本地开发](#quick-start-快速开始---本地开发)  
6. [Environment variables / 环境变量](#environment-variables-环境变量)  
7. [Edge functions & APIs / 边缘函数与 API](#edge-functions--apis-边缘函数与-api)  
8. [Database schema / 数据库模式摘要](#database-schema-数据库模式摘要)  
9. [Security / 安全](#security-安全)  
10. [Testing & QA / 测试与质量保障](#testing--qa-测试与质量保障)  
11. [Deployment / 部署指南](#deployment-部署指南)  
12. [Contributing / 贡献指南](#contributing-贡献指南)  
13. [FAQ / 常见问题](#faq-常见问题)  
14. [License / 许可证](#license-许可证)  
15. [Support / 支持](#support-支持)  

---

## Project overview / 项目概览
**EN:**  
AI Content Creator is a React + Supabase full-stack application that lets small business owners create platform-specific social posts and ad copy using OpenAI. It stores user profiles, generated content, and analytics—making content generation repeatable and brand-consistent.

**简中:**  
AI Content Creator 是一个基于 React 与 Supabase 的全栈应用，帮助小企业主人快速生成社交媒体帖子与广告文案。系统会保存用户资料、生成内容与统计信息，确保品牌语调一致并便于复用。

---

## Why this project / 为什么选这个项目
- *Time-to-publish*: reduces creative / drafting time from hours to minutes.  
- *Brand consistency*: centralizes brand voice and preferences.  
- *Accessible*: targeted at non-specialists who need practical marketing outputs.

---

## Features / 功能一览
- *User authentication* (Supabase Auth).  
- *Business profile*: industry, brand voice, target audience.  
- *AI-powered content generation*: social posts and ad copy (platform-aware).  
- *Content management*: edit, copy, download generated items.  
- *Dashboard*: content history, simple stats.  
- *Secure by-default*: RLS, JWT auth, input validation.

**简中:**  
- 用户认证（Supabase Auth）  
- 业务信息设置：行业、品牌语调、目标受众  
- AI 内容生成：针对平台的社媒帖与广告文案  
- 内容管理：编辑、复制、下载  
- 仪表盘：历史与统计  
- 默认安全：行级安全 (RLS)、JWT、输入校验

---

## Architecture (high level) / 架构概览
**EN:**  
- *Frontend*: React 18 + TypeScript, TailwindCSS.  
- *Backend*: Supabase (Postgres, Auth, Edge Functions).  
- *AI*: OpenAI GPT (via Edge Function).  
- *Deployment pattern*: Static frontend served via CDN + Supabase functions for server-side logic.

Refer to `Project_Architecture_Document.md` for diagrams (system architecture, DB schema, flow diagrams).  
**Note:** confirm which OpenAI model/version to use for production. `[FACT-CHECK REQUIRED: confirm OpenAI model (gpt-4 / gpt-4o / gpt-3.5-turbo) and estimated usage costs]`

**简中:**  
- 前端：React 18 + TypeScript，TailwindCSS。  
- 后端：Supabase（Postgres、Auth、Edge Functions）。  
- AI：通过边缘函数调用 OpenAI。  
- 部署：静态前端 + Supabase 边缘函数。

更多架构图请参见 `Project_Architecture_Document.md`。  
**注意：** 请确认生产环境使用的 OpenAI 模型与成本。`[FACT-CHECK REQUIRED: 确认使用的 OpenAI 模型与预估费用]`

---

## Quick start — local dev / 快速开始 — 本地开发

### Prerequisites / 先决条件
- Node.js *>=18* and `pnpm`.  
- A Supabase account & project.  
- An OpenAI API key (store securely).  
- Git (clone repo).

**简中:**  
- Node.js（>=18）与 pnpm。  
- Supabase 账号与项目。  
- OpenAI API 密钥（安全存储）。  
- Git（克隆仓库）。

### 1) Clone repository
```bash
git clone https://github.com/nordeim/AI-Content-Creator.git
cd AI-Content-Creator
````

### 2) Install frontend deps

```bash
cd ai-content-creator-frontend
pnpm install
```

### 3) Environment (local)

Create `.env` in `ai-content-creator-frontend/`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Set edge function env in Supabase dashboard (do not store OpenAI key in repo):

```
OPENAI_API_KEY=your_openai_api_key
```

**简中:** 在 `ai-content-creator-frontend/` 下创建 `.env`，并在 Supabase 仪表盘中设置 `OPENAI_API_KEY`。

### 4) Run dev server

```bash
pnpm dev
# open http://localhost:5173 (or printed port)
```

### 5) Edge functions (local / preview)

Follow Supabase Edge Functions local workflow (or deploy them from `supabase/functions/*`). See `FINAL_SETUP_INSTRUCTIONS.md` for exact deploy steps.

**简中:** 参考 `FINAL_SETUP_INSTRUCTIONS.md` 中的边缘函数部署指引。

---

## Environment variables / 环境变量

* `VITE_SUPABASE_URL` — Supabase project URL.
* `VITE_SUPABASE_ANON_KEY` — Supabase anon public key (frontend).
* `OPENAI_API_KEY` — OpenAI server key (set in Supabase edge function env).
* Additional `.env` values may be required for email providers, analytics, etc. Check `.env.example`.

**Security note:** *Never commit real API keys.* Use secrets manager or Supabase project secrets.

**简中:** 永远不要将真实密钥提交到仓库。使用密钥管理或 Supabase secrets。

---

## Edge Functions & APIs / 边缘函数与 API

Primary functions (see `supabase/functions/`):

* `generate-content` — `POST /functions/v1/generate-content`
  *Request body:*

  ```json
  {
    "contentType": "social_post" | "ad_copy",
    "platform": "Instagram",
    "topic": "Describe what to write about",
    "tone": "Neutral",
    "brandVoice": "Casual",
    "targetAudience": "Small business owners in X"
  }
  ```

  *Response:* generated content payload.

* `get-user-stats` — `GET /functions/v1/get-user-stats`
  *Response:* `{ totalContent, contentByType, recentContent, userId }`

**Operational notes:**

* Implement server-side rate limiting and input sanitization.
* The OpenAI API key must only live on the server/edge (never sent to the client).

**简中:**

* `generate-content`（生成内容）和 `get-user-stats`（统计）。
* OpenAI Key 只保存在服务端。

---

## Database schema (summary) / 数据库模式（摘要）

Main tables:

* `profiles` — stores user business profile (id, user_id, industry, brand_voice, target_audience, created_at, updated_at).
* `contents` — stored generated content (id, user_id, content_type, platform, original_text, edited_text, topic, tone, created_at).
* `feedback` — user feedback & ratings (id, user_id, rating, message, category, created_at).

RLS: Row Level Security policies required to ensure users only access their own rows. See `supabase/rls_policies.sql`.

**简中:**
主表：`profiles`, `contents`, `feedback`。RLS 必须配置，防止未授权访问。

---

## Security / 安全

* *Authentication*: Supabase Auth (JWT).
* *Authorization*: Postgres RLS — enforce per-user access.
* *Secrets*: OpenAI key stored in Supabase function env / secrets manager.
* *Input validation & sanitization*: edge functions must validate input shape & length.
* *CORS*: restrict allowed origins for production.
* *Logging & monitoring*: redact sensitive fields in logs.

**Checklist:**

* Rotate API keys periodically.
* Audit RLS policies before production.
* Confirm TLS everywhere.

**简中:**

* 使用 Supabase Auth、RLS；机密放入 secrets；在日志中脱敏。

---

## Testing & QA / 测试与质量保障

* Unit tests for front-end components and utils.
* Integration tests for edge functions (mock OpenAI).
* E2E smoke tests for user flows: signup → profile → generate → edit → export.
* Load testing for Edge functions under expected concurrency.

**简中:**

* 单元、集成与端到端测试；对边缘函数做负载测试。

---

## Deployment / 部署指南

* Frontend: build with `pnpm build` → host on static CDN (Vercel/Netlify/Cloudflare Pages).
* Backend: deploy Supabase migrations and edge functions via Supabase CLI or dashboard.
* CI/CD: recommend GitHub Actions to run tests, build frontend, deploy preview, and deploy edge functions.

**Recommended minimal pipeline:**

1. `pnpm test`
2. `pnpm build` (frontend)
3. Deploy static site to CDN
4. Deploy edge functions & apply DB migrations

**简中:**

* 前端部署到 CDN；边缘函数通过 Supabase CLI 或仪表盘部署；建议使用 GitHub Actions 实现 CI/CD。

---

## Contributing / 贡献指南

* Please read `CONTENTS_GUIDE.md` and `PROJECT_DELIVERY.md` (if present).
* Open issues for bugs/feature requests. Use feature branches and open PRs against `main`.
* Follow code style & linting rules (`pnpm lint`, `pnpm format`).
* Add tests for new features.

**简中:**

* 请先查看 `CONTENTS_GUIDE.md`；使用 feature 分支并提 PR；补充测试。

---

## FAQ / 常见问题

**Q:** Which OpenAI model is used?
**A:** Current draft uses GPT-3.5-turbo in architecture docs. *Confirm model and costs before production.* `[FACT-CHECK REQUIRED: Confirm model/version and rate limits]`

**Q:** Where are diagrams?
**A:** See `diagrams/` and `Project_Architecture_Document.md`.

**简中:**

* 模型与成本需确认。`[FACT-CHECK REQUIRED: 确认模型/费率]`
* 架构图见 `diagrams/` 与 `Project_Architecture_Document.md`。

---

## License / 许可证

*MIT* — see `LICENSE` file.

**简中:** MIT 许可证 — 见 `LICENSE` 文件。

---

## Support / 支持

For issues, feature requests, or support: *open an issue* in this repository.

**简中:** 如需支持或报告问题，请在本仓库打开 Issue。

---

## Changelog (this README)

* *v1.0* — Full replacement README with bilingual content, quick start, security checklist, and architecture summary.
* Items flagged for human review: OpenAI model/version and any referenced external quota details. `[FACT-CHECK REQUIRED]`

---

## Editorial & QA notes (for maintainers)

* Keep `Project_Architecture_Document.md`, `FINAL_SETUP_INSTRUCTIONS.md`, and `QUICK_START.md` synchronized with this README.
* When changing env vars or endpoints, update `.env.example` and this README immediately.
* Diagrams in `/diagrams` should include alt-text: `System architecture diagram showing client, CDN, edge functions, OpenAI integration, and Postgres`.

---

**Meta description (<=155 chars):**
AI Content Creator — full-stack app (React + Supabase) for generating brand-aligned social & ad content with OpenAI. Quick start, architecture, and deployment guide.

```

---

QA / Final items for human review:
- [FACT-CHECK REQUIRED] Confirm production OpenAI model & update the README with the exact model name and recommended usage policy (token limits, cost estimate).
- [NEEDS_SOURCE] Add links or badges for CI/CD pipeline examples (if you have a template).
- Ensure `.env.example` in repo mirrors the Environment Variables section of this README.

INTERNAL: I used the repository files you provided (`README.md`, `Project_Architecture_Document.md`, `FINAL_SETUP_INSTRUCTIONS.md`, `CONTENTS_GUIDE.md`, `QUICK_START.md`) to compose this consolidated README. If you want, I can now:
- (A) produce a `README.md` commit-ready file only (no extra commentary), or  
- (B) create a `README.md` in the repo via a prepared patch/PR text + commit message template, or  
- (C) generate localized README variants or shorter README "landing" page.

Which of (A)/(B)/(C) would you like me to produce next?
::contentReference[oaicite:0]{index=0}
```

---


