# AI Resume Analyzer - GitHub Workflows

This directory contains GitHub Actions workflows for CI/CD.

## Workflows

| Workflow | File | Description |
|----------|------|-------------|
| CI - Build & Test | `ci.yml` | Runs on every PR/push to validate code |
| Deploy Backend | `deploy-backend.yml` | Deploys backend to Render on main push |
| Deploy Frontend | `deploy-frontend.yml` | Deploys frontend to Vercel on main push |
| Full Stack Deploy | `deploy-full.yml` | Manual full deployment with options |

## Status Badges

Add these to your README.md:

```markdown
![CI](https://github.com/YOUR_USERNAME/AI_Resume_Analyzer/actions/workflows/ci.yml/badge.svg)
![Deploy Backend](https://github.com/YOUR_USERNAME/AI_Resume_Analyzer/actions/workflows/deploy-backend.yml/badge.svg)
![Deploy Frontend](https://github.com/YOUR_USERNAME/AI_Resume_Analyzer/actions/workflows/deploy-frontend.yml/badge.svg)
```

## Required Secrets

Set these in: Repository Settings → Secrets and variables → Actions

### Render (Backend)
- `RENDER_API_KEY`
- `RENDER_SERVICE_ID`
- `BACKEND_URL`

### Vercel (Frontend)
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### Environment
- `REACT_APP_API_URL`

## Quick Start

1. Fork/clone this repository
2. Set up secrets in GitHub
3. Push to `main` branch
4. Watch deployments in Actions tab!
