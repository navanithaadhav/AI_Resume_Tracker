# CI/CD Pipeline Setup

## Overview

This project uses GitHub Actions for Continuous Integration and Continuous Deployment.

## Workflows

### 1. CI - Build & Test (`ci.yml`)

**Triggers:** Push/PR to `main` or `develop` branches

**What it does:**
- ✅ Builds backend TypeScript code
- ✅ Builds frontend React app
- ✅ Runs tests (when configured)
- ✅ Tests Docker image builds

### 2. Deploy Backend (`deploy-backend.yml`)

**Triggers:** Push to `main` branch (backend changes only)

**Deploys to:** Render.com

### 3. Deploy Frontend (`deploy-frontend.yml`)

**Triggers:** Push to `main` branch (frontend changes only)

**Deploys to:** Vercel
- Preview deployments for PRs
- Production deployments for main branch

### 4. Full Stack Deployment (`deploy-full.yml`)

**Triggers:** Manual (workflow_dispatch)

**Features:**
- Deploy backend, frontend, or both
- Health checks after deployment
- Deployment summary

---

## Setup Guide

### Step 1: Configure GitHub Secrets

Go to your repository → Settings → Secrets and variables → Actions

Add these secrets:

#### Required for Backend (Render)

| Secret | Description | How to Get |
|--------|-------------|------------|
| `RENDER_API_KEY` | Render API Key | [Render Dashboard](https://dashboard.render.com) → Account Settings → API Keys |
| `RENDER_SERVICE_ID` | Your service ID | From your Render service URL: `srv-xxxxxxx` |
| `BACKEND_URL` | Deployed backend URL | e.g., `https://your-backend.onrender.com` |

#### Required for Frontend (Vercel)

| Secret | Description | How to Get |
|--------|-------------|------------|
| `VERCEL_TOKEN` | Vercel API Token | [Vercel Settings](https://vercel.com/account/tokens) → Create Token |
| `VERCEL_ORG_ID` | Your Vercel Org ID | Run `vercel link` in frontend folder, check `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Your Project ID | Same as above |

#### Environment Variables

| Secret | Description |
|--------|-------------|
| `REACT_APP_API_URL` | Backend API URL for frontend |
| `GEMINI_API_KEY` | (Set in Render dashboard directly) |

### Step 2: Set Up Render.com

1. **Create Account:** Sign up at [render.com](https://render.com)

2. **Create Web Service:**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder
   - Configure:
     - **Name:** `ai-resume-analyzer-api`
     - **Environment:** Node
     - **Build Command:** `npm install && npm run build`
     - **Start Command:** `npm start`
     - **Plan:** Free or paid

3. **Set Environment Variables in Render:**
   ```
   NODE_ENV=production
   PORT=5001
   GEMINI_API_KEY=your_api_key
   CLIENT_URL=https://your-frontend.vercel.app
   ```

4. **Get Service ID:**
   - Go to your service dashboard
   - Copy the ID from the URL: `dashboard.render.com/web/srv-XXXXX`

### Step 3: Set Up Vercel

1. **Create Account:** Sign up at [vercel.com](https://vercel.com)

2. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

3. **Link Project:**
   ```bash
   cd frontend
   vercel link
   ```
   
4. **Get IDs:**
   ```bash
   cat .vercel/project.json
   ```
   Copy `orgId` and `projectId`

5. **Set Environment Variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     REACT_APP_API_URL=https://your-backend.onrender.com/api
     ```

### Step 4: Test the Pipeline

1. **Test CI:**
   - Create a PR to the `main` branch
   - Watch the Actions tab for CI workflow

2. **Test Deployment:**
   - Merge PR to `main`
   - Watch the deployment workflows run

3. **Manual Deployment:**
   - Go to Actions → "Full Stack Deployment"
   - Click "Run workflow"
   - Select options and deploy

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Repository                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────┐    Push to main    ┌───────────────────────┐   │
│  │   PR    │ ────────────────► │   GitHub Actions       │   │
│  └─────────┘                    │                         │   │
│                                 │  ┌─────────────────┐   │   │
│                                 │  │ CI: Build/Test  │   │   │
│                                 │  └────────┬────────┘   │   │
│                                 │           │            │   │
│                                 │  ┌────────▼────────┐   │   │
│                                 │  │ Deploy Backend  │   │   │
│                                 │  │   (Render)      │   │   │
│                                 │  └────────┬────────┘   │   │
│                                 │           │            │   │
│                                 │  ┌────────▼────────┐   │   │
│                                 │  │ Deploy Frontend │   │   │
│                                 │  │   (Vercel)      │   │   │
│                                 │  └─────────────────┘   │   │
│                                 └───────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

                           │
                           ▼
         ┌─────────────────────────────────────┐
         │          Production                  │
         ├─────────────────────────────────────┤
         │                                     │
         │  ┌─────────────┐  ┌─────────────┐  │
         │  │   Vercel    │  │   Render    │  │
         │  │  (Frontend) │  │  (Backend)  │  │
         │  │             │  │             │  │
         │  │ React App   │  │ Node.js API │  │
         │  └──────┬──────┘  └──────┬──────┘  │
         │         │                │         │
         │         └───────┬────────┘         │
         │                 │                  │
         │         ┌───────▼───────┐          │
         │         │  Gemini API   │          │
         │         │  (AI Service) │          │
         │         └───────────────┘          │
         └─────────────────────────────────────┘
```

---

## Troubleshooting

### CI Failures

**TypeScript errors:**
```bash
# Run locally to debug
cd backend && npm run build
```

**Frontend build errors:**
```bash
cd frontend && npm run build
```

### Deployment Failures

**Render deployment fails:**
- Check Render dashboard logs
- Verify `RENDER_API_KEY` and `RENDER_SERVICE_ID` are correct
- Ensure build/start commands match `render.yaml`

**Vercel deployment fails:**
- Verify `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
- Check Vercel project settings
- Run `vercel deploy` locally to debug

### Environment Variable Issues

- Ensure `REACT_APP_` prefix for frontend env vars
- Backend env vars should be set in Render dashboard
- Check that `CLIENT_URL` in backend matches actual Vercel URL

---

## Alternative: Docker Deployment

For self-hosted or other platforms:

```bash
# Build and push images
docker build -t your-registry/backend:latest ./backend
docker build -t your-registry/frontend:latest ./frontend

docker push your-registry/backend:latest
docker push your-registry/frontend:latest

# Or use docker-compose
docker-compose -f docker-compose.yml up -d
```

---

## Quick Reference

| Action | Command/Location |
|--------|------------------|
| View CI runs | GitHub → Actions → CI - Build & Test |
| Manual deploy | GitHub → Actions → Full Stack Deployment → Run workflow |
| View logs (backend) | Render Dashboard → Logs |
| View logs (frontend) | Vercel Dashboard → Deployments |
| Rollback (Vercel) | Vercel Dashboard → Deployments → Promote previous |
| Rollback (Render) | Render Dashboard → Manual Deploys → Select commit |
