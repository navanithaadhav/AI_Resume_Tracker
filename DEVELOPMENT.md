# Development Guide

Complete guide for developing and extending the AI Resume Analyzer.

## Development Environment Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Code editor (VS Code recommended)
- Google Gemini API key (FREE!) - https://makersuite.google.com/app/apikey

### Initial Setup

```bash
# Clone repository
git clone <repo-url>
cd AI_Resume_Analyzer

# Setup backend
cd backend
npm install
cp .env.example .env
# Edit .env with your Gemini API key

# Setup frontend
cd ../frontend
npm install
```

## Running Development Servers

### Terminal 1 - Backend
```bash
cd backend
npm run dev
# Hot-reload enabled with ts-node
# Server: http://localhost:5001
```

### Terminal 2 - Frontend
```bash
cd frontend
npm start
# Opens http://localhost:3001
# Hot-reload enabled
```

## Project Structure Deep Dive

### Backend Structure

```
backend/
├── src/
│   ├── routes/
│   │   ├── resumeRoutes.ts      # File upload endpoint
│   │   └── analysisRoutes.ts    # AI analysis endpoints
│   ├── services/
│   │   └── aiService.ts         # Google Gemini integration
│   ├── utils/
│   │   ├── fileParser.ts        # PDF/DOCX extraction
│   │   └── multerConfig.ts      # File upload configuration
│   ├── middleware/
│   └── types/                   # TypeScript type definitions
├── uploads/                      # Temporary storage
├── server.ts                     # Express app setup
├── tsconfig.json
├── package.json
├── .env
└── .gitignore
```

### Frontend Structure

```
frontend/
├── src/
│   ├── components/              # Reusable React components
│   │   ├── Header.tsx
│   │   ├── ResumeUpload.tsx
│   │   ├── JobDescriptionInput.tsx
│   │   ├── ResultsDashboard.tsx
│   │   └── LoadingSpinner.tsx
│   ├── services/
│   │   └── api.ts               # API integration
│   ├── types/                   # TypeScript type definitions
│   ├── pages/
│   ├── App.tsx                  # Main app component
│   ├── index.tsx                # React entry point
│   └── index.css                # Global styles
├── public/
│   └── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
```

## Adding New Features

### Backend: Add New API Endpoint

**Step 1:** Create route file (`src/routes/newFeatureRoutes.js`)
```javascript
const express = require('express');
const router = express.Router();

router.post('/my-endpoint', async (req, res) => {
  try {
    const { data } = req.body;
    // Process data
    res.json({ success: true, result: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

**Step 2:** Register route in `server.js`
```javascript
const newFeatureRoutes = require('./src/routes/newFeatureRoutes');
app.use('/api/feature', newFeatureRoutes);
```

**Step 3:** Test endpoint
```bash
curl -X POST http://localhost:5000/api/feature/my-endpoint \
  -H "Content-Type: application/json" \
  -d '{"data": "test"}'
```

### Backend: Add New Service

**Step 1:** Create service (`src/services/newService.js`)
```javascript
async function myFunction(params) {
  // Implementation
  return result;
}

module.exports = {
  myFunction
};
```

**Step 2:** Import in route
```javascript
const { myFunction } = require('../services/newService');
```

**Step 3:** Use in endpoint
```javascript
router.post('/example', async (req, res) => {
  const result = await myFunction(req.body);
  res.json(result);
});
```

### Frontend: Add New Component

**Step 1:** Create component (`src/components/MyComponent.jsx`)
```javascript
import React from 'react';

function MyComponent({ data, onAction }) {
  return (
    <div className="card">
      <h2 className="section-title">My Component</h2>
      <p>{data}</p>
      <button onClick={onAction} className="btn-primary">
        Take Action
      </button>
    </div>
  );
}

export default MyComponent;
```

**Step 2:** Import in App.js
```javascript
import MyComponent from './components/MyComponent';
```

**Step 3:** Use component
```javascript
<MyComponent data={someData} onAction={handleAction} />
```

### Frontend: Add New Page

**Step 1:** Create page (`src/pages/MyPage.jsx`)
```javascript
import React from 'react';
import Header from '../components/Header';

function MyPage() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Page content */}
      </main>
    </>
  );
}

export default MyPage;
```

**Step 2:** Setup routing (future: add React Router)
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyPage from './pages/MyPage';

<Routes>
  <Route path="/my-page" element={<MyPage />} />
</Routes>
```

## Modifying Core Features

### Change AI Prompt

Edit `backend/src/services/aiService.js`:

```javascript
const SYSTEM_PROMPT = `You are an expert... [customize this]`;

const userPrompt = `Analyze the resume... [customize this]`;
```

### Change Resume Score Range

Edit in `aiService.js` response format:
```javascript
// Change from 0-100 to 0-5
"score": ${Math.round(analysis.score / 20)}
```

### Modify File Upload Limits

Edit `backend/.env`:
```
MAX_FILE_SIZE=20971520  // 20MB instead of 10MB
```

### Change Styling

#### Modify Colors

Edit `frontend/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#FF6B6B',    // Changed from blue
      secondary: '#4ECDC4',  // Changed from green
    }
  }
}
```

#### Modify Component Styles

Edit `frontend/src/index.css`:
```css
.btn-primary {
  @apply px-8 py-4 bg-purple-600 text-white;  /* Modified */
}
```

## Testing

### Backend Testing

**Manual Testing with cURL:**
```bash
# Test upload
curl -F "resume=@test.pdf" http://localhost:5000/api/resume/upload

# Test analysis
curl -X POST http://localhost:5000/api/analysis/analyze \
  -H "Content-Type: application/json" \
  -d '{"resumeText":"test resume","jobDescription":"test job"}'
```

**Automated Testing (TODO: Add Jest/Mocha):**
```bash
npm test
```

### Frontend Testing

**Manual Testing:**
1. Open http://localhost:3001
2. Test upload functionality
3. Test form validation
4. Test API integration
5. Test error handling
6. Test responsive design

**Browser DevTools:**
- React DevTools for component inspection
- Network tab for API debugging
- Console for JavaScript errors

## Debugging

### Backend Debugging

**Using console.log:**
```javascript
console.log('Resume uploaded:', resumeText.length);
console.error('Analysis error:', error.message);
```

**Using debugger:**
```javascript
function analyzeResume(resumeText, jobDescription) {
  debugger;  // Add debugger statement
  // rest of code
}
```

Run with:
```bash
node --inspect server.js
# Open chrome://inspect in Chrome
```

### Frontend Debugging

**React DevTools:**
1. Install React DevTools extension
2. Inspect component props and state
3. Edit state live for testing

**Network Debugging:**
1. Open DevTools → Network tab
2. Monitor API requests
3. Check request/response payloads

**Logging:**
```javascript
console.log('Resume text:', resumeText);
console.error('API error:', error);
```

## Building for Production

### Backend Build

```bash
cd backend
npm run build  # If you add build script
# Or just deploy with: npm start
```

### Frontend Build

```bash
cd frontend
npm run build
# Generates optimized build in build/
# Static files ready for deployment
```

## Performance Optimization

### Backend

1. **Add Caching:**
```javascript
const cache = new Map();

function getCachedAnalysis(key) {
  return cache.get(key);
}
```

2. **Implement Request Timeouts:**
```javascript
const timeoutMiddleware = (req, res, next) => {
  req.setTimeout(60000);
  next();
};
app.use(timeoutMiddleware);
```

3. **Add Compression:**
```javascript
const compression = require('compression');
app.use(compression());
```

### Frontend

1. **Code Splitting:**
```javascript
import React, { lazy, Suspense } from 'react';
const MyComponent = lazy(() => import('./MyComponent'));

<Suspense fallback={<Loading />}>
  <MyComponent />
</Suspense>
```

2. **Memoization:**
```javascript
const MemoComponent = React.memo(MyComponent);
```

3. **Bundle Analysis:**
```bash
npm install --save-dev source-map-explorer
npm run build
npx source-map-explorer 'build/static/js/*.js'
```

## Common Development Tasks

### Update Dependencies

```bash
cd backend
npm update
npm outdated  # Check for updates

cd ../frontend
npm update
```

### Fix Linting Issues

```bash
# If ESLint is configured
npm run lint
npm run lint -- --fix
```

### Format Code

```bash
npm install -D prettier
npx prettier --write src/
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
git add .
git commit -m "Add feature: my feature"

# Push and create PR
git push origin feature/my-feature

# After review, merge
git checkout main
git merge feature/my-feature
```

## Environment Variables Reference

### Backend (.env)
```
# Server
PORT=5000
NODE_ENV=development

# CORS
CLIENT_URL=http://localhost:3001

# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4

# Files
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

## Documentation Tips

- Update README.md for user-facing changes
- Update BACKEND_DOCS.md for backend changes
- Update FRONTEND_DOCS.md for frontend changes
- Update API_REFERENCE.md for API changes
- Add inline comments for complex logic

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
6. Address review feedback

## Resources

- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [TailwindCSS Docs](https://tailwindcss.com/)
- [OpenAI API Docs](https://platform.openai.com/docs/)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/nodejs-performance/)

## Troubleshooting Development

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Dependencies Issues
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Cache Issues
```bash
# Clear npm cache
npm cache clean --force

# Clear React cache
rm -rf node_modules/.cache
```

## Performance Benchmarks

Track these metrics:

- **Backend**: API response time < 100ms (excluding OpenAI)
- **OpenAI Analysis**: 20-120 seconds
- **Frontend**: Initial load < 3 seconds
- **File Upload**: < 5 seconds for 10MB file

---

Happy developing! For questions, check README.md or create an issue.
