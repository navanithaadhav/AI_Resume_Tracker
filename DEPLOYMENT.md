# Deployment Guide

## Overview

This guide covers deploying the AI Resume Analyzer to various cloud platforms.

## Table of Contents

1. [Docker Setup](#docker-setup)
2. [AWS Deployment](#aws-deployment)
3. [Vercel (Frontend)](#vercel-frontend)
4. [Heroku](#heroku)
5. [DigitalOcean](#digitalocean)
6. [Azure](#azure)

## Docker Setup

### Build Images Locally

```bash
# Build backend
cd backend
docker build -t ai-resume-analyzer-backend:1.0 .

# Build frontend
cd ../frontend
docker build -t ai-resume-analyzer-frontend:1.0 .

# Test locally
docker run -p 10000:10000 \
  -e GEMINI_API_KEY=your_key \
  -e NODE_ENV=development \
  ai-resume-analyzer-backend:1.0
```

### Using Docker Compose

```bash
# Create .env file with your variables
cp backend/.env.example backend/.env
# Edit backend/.env with your API key

# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down
```

### Docker Compose with SSL

For production, add SSL certificates:

```bash
# Create ssl directory
mkdir -p ssl

# Add your certificates
cp /path/to/cert.pem ssl/cert.pem
cp /path/to/key.pem ssl/key.pem

# Update docker-compose.yml and nginx.conf accordingly
```

## AWS Deployment

### Option 1: EC2 Instance

#### Setup

1. **Launch EC2 Instance**
   - AMI: Ubuntu 22.04 LTS
   - Instance type: t3.medium (or larger)
   - Security groups: Allow ports 80, 443, 10000, 3000
   - EBS: 20GB minimum

2. **SSH into Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt upgrade -y
   sudo apt install nodejs npm git nginx -y
   
   # Install Docker (optional)
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker ubuntu
   ```

4. **Clone and Setup Project**
   ```bash
   cd /home/ubuntu
   git clone <your-repo-url>
   cd AI_Resume_Analyzer
   
   # Backend setup
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your API key
   
   # Frontend setup
   cd ../frontend
   npm install
   npm run build
   ```

5. **Setup PM2 (Process Manager)**
   ```bash
   sudo npm install -g pm2
   
   # Start backend
   cd backend
   pm2 start server.js --name "ai-resume-backend"
   
   # Save PM2 configuration
   pm2 save
   
   # Start on boot
   pm2 startup
   sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
   ```

6. **Setup Nginx Reverse Proxy**
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```

   Add:
   ```nginx
   upstream backend {
     server 127.0.0.1:5000;
   }

   server {
     listen 80;
     server_name your-domain.com;

     client_max_body_size 50M;

     location /api {
       proxy_pass http://backend;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }

     location / {
       root /home/ubuntu/AI_Resume_Analyzer/frontend/build;
       try_files $uri /index.html;
     }
   }
   ```

   ```bash
   sudo systemctl restart nginx
   ```

7. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d your-domain.com
   ```

### Option 2: AWS Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize EB application
eb init -p node.js-18 ai-resume-analyzer

# Create environment
eb create production

# Deploy
eb deploy

# Open in browser
eb open
```

### Option 3: AWS ECS (Docker)

1. **Create ECR Repository**
   ```bash
   aws ecr create-repository --repository-name ai-resume-analyzer-backend
   aws ecr create-repository --repository-name ai-resume-analyzer-frontend
   ```

2. **Tag and Push Images**
   ```bash
   docker tag ai-resume-analyzer-backend:1.0 \
     <account-id>.dkr.ecr.<region>.amazonaws.com/ai-resume-analyzer-backend:latest
   
   aws ecr get-login-password --region <region> | \
     docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
   
   docker push <account-id>.dkr.ecr.<region>.amazonaws.com/ai-resume-analyzer-backend:latest
   ```

3. **Create ECS Cluster and Services**
   - Use AWS Console or Terraform
   - Configure task definitions
   - Set environment variables
   - Configure load balancer

## Vercel (Frontend)

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select `frontend` as root directory

3. **Configure Environment**
   - Add environment variable:
     ```
     REACT_APP_API_URL=https://your-backend-domain.com/api
     ```

4. **Deploy**
   - Click "Deploy"
   - Vercel automatically rebuilds on push

## Heroku

### Backend Deployment

```bash
# Install Heroku CLI
# From https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create ai-resume-analyzer-backend

# Add buildpacks
heroku buildpacks:add heroku/nodejs

# Set environment variables
heroku config:set OPENAI_API_KEY=your_key
heroku config:set NODE_ENV=production
heroku config:set CLIENT_URL=https://your-frontend-url.com

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Frontend Deployment

```bash
# Create app
heroku create ai-resume-analyzer-frontend

# Create special Procfile
echo "web: serve -s build -l $PORT" > Procfile

# Deploy
git push heroku main
```

## DigitalOcean

### Using Droplets

1. **Create Droplet**
   - Image: Ubuntu 22.04 x64
   - Size: $12/month (2GB RAM, 2 vCPU)
   - Add SSH key

2. **SSH and Setup**
   ```bash
   ssh root@your-droplet-ip
   
   # Update system
   apt update && apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   apt install -y nodejs
   
   # Install other tools
   apt install -y npm git nginx sqlite3
   ```

3. **Deploy Application** (same as EC2 above)

### Using App Platform

1. Go to DigitalOcean App Platform
2. Create new app
3. Connect GitHub repository
4. Configure:
   - Backend service: Port 5000
   - Frontend service: Port 3000
5. Set environment variables
6. Deploy

## Azure

### App Service

```bash
# Install Azure CLI
# From https://docs.microsoft.com/cli/azure/install-azure-cli

# Login
az login

# Create resource group
az group create --name ai-resume --location eastus

# Create App Service plan
az appservice plan create \
  --name ai-resume-plan \
  --resource-group ai-resume \
  --sku B1 --is-linux

# Create web app (Backend)
az webapp create \
  --resource-group ai-resume \
  --plan ai-resume-plan \
  --name ai-resume-backend \
  --runtime "node|18-lts"

# Deploy backend
cd backend
az webapp deployment source config-zip \
  --resource-group ai-resume \
  --name ai-resume-backend \
  --src <zip-file>

# Set environment variables
az webapp config appsettings set \
  --resource-group ai-resume \
  --name ai-resume-backend \
  --settings OPENAI_API_KEY=your_key NODE_ENV=production
```

### Azure Container Instances

```bash
# Build and push image
docker build -t ai-resume-backend . 
docker tag ai-resume-backend:latest <registry-name>.azurecr.io/ai-resume-backend:latest
docker push <registry-name>.azurecr.io/ai-resume-backend:latest

# Deploy container
az container create \
  --resource-group ai-resume \
  --name ai-resume-backend \
  --image <registry-name>.azurecr.io/ai-resume-backend:latest \
  --ports 5000 \
  --environment-variables \
    OPENAI_API_KEY=your_key \
    NODE_ENV=production
```

## Post-Deployment Checklist

- [ ] Test all API endpoints
- [ ] Verify SSL certificate is valid
- [ ] Check error logging
- [ ] Monitor application performance
- [ ] Set up automated backups
- [ ] Configure monitoring/alerts
- [ ] Test file upload functionality
- [ ] Verify OpenAI API calls
- [ ] Check CORS headers
- [ ] Load test the application

## Monitoring & Logging

### CloudWatch (AWS)
```bash
# View logs
aws logs tail /aws/ec2/ai-resume-backend --follow

# Create alarms
aws cloudwatch put-metric-alarm \
  --alarm-name high-cpu \
  --alarm-description "Alert when CPU is high" \
  --metric-name CPUUtilization \
  --namespace AWS/EC2 \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold
```

### Application Monitoring
- **PM2 Plus**: `pm2 plus`
- **New Relic**: Monitor and optimize
- **DataDog**: Infrastructure monitoring
- **Sentry**: Error tracking

## Cost Optimization

1. Use reserved instances
2. Auto-scaling for variable load
3. Cache API responses
4. Compress files
5. CDN for static assets
6. Monitor unused resources

## Security Hardening

1. Use HTTPS everywhere
2. Keep dependencies updated
3. Use environment variables for secrets
4. Implement rate limiting
5. Add request logging
6. Use Web Application Firewall (WAF)
7. Regular security audits

---

For questions or issues, refer to the main README.md or QUICKSTART.md
