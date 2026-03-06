# Quick Start Guide

Get the AI Resume Analyzer running in 5 minutes!

## Prerequisites

- Node.js 18+ installed ([Download](https://nodejs.org/))
- Google Gemini API key (FREE!) - [Get one here](https://makersuite.google.com/app/apikey)

## Step-by-Step Setup

### 1. Clone/Setup Project

```bash
cd AI_Resume_Analyzer
```

### 2. Setup Backend (Terminal 1)

```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=10000
NODE_ENV=development
CLIENT_URL=http://localhost:3001
GEMINI_API_KEY=your_gemini_api_key_here
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

Start backend:
```bash
npm run dev
```

Expected output:
```
AI Resume Analyzer Backend running on port 10000
Environment: development
```

### 3. Setup Frontend (Terminal 2)

```bash
cd frontend
npm install
npm start
```

Browser will open at `http://localhost:3001`

## Using the Application

### 1. Upload Resume
- Click "Upload Your Resume"
- Select a PDF or DOCX file
- File size must be under 10MB

### 2. Enter Job Description
- Paste the job description OR click "Use Sample"
- Make sure it's a complete job posting

### 3. Analyze
- Click "🔍 Analyze Resume"
- Wait for AI analysis (10-30 seconds)

### 4. Review Results
- View your match score
- Check missing skills
- Read improvement suggestions
- See ATS keywords

### 5. Download
- Click "📥 Download Analysis Results"
- Save the JSON file for future reference

## API Testing

Test backend with curl:

```bash
# Health check
curl http://localhost:10000/api/health

# Quick analysis
curl -X POST http://localhost:10000/api/analysis/quick-score \
  -H "Content-Type: application/json" \
  -d '{
    "resumeText": "Your resume text here...",
    "jobDescription": "Your job description here..."
  }'
```

## Common Issues & Solutions

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :10000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :10000
kill -9 <PID>
```

### Gemini API Key Error
- Get a FREE key: https://makersuite.google.com/app/apikey
- Verify key is valid in Google AI Studio
- Ensure GEMINI_API_KEY is set in `.env`

### "Cannot connect to backend"
- Ensure backend is running on :10000
- Check firewall isn't blocking connections
- Verify .env CLIENT_URL matches

### File Upload Fails
- Only PDF and DOCX files are supported
- Maximum file size is 10MB
- Try a different resume file

## Next Steps

1. **Customize**: Modify prompts in `src/services/aiService.ts`
2. **Deploy**: Follow deployment section in README.md
3. **Integrate**: Add to your own application
4. **Enhance**: Add features from "Future Enhancements"

## Getting Help

1. Check the main README.md
2. Review error messages in browser console
3. Check backend terminal for error logs
4. Verify Gemini API key

## Tips for Best Results

- Use complete, well-formatted resumes
- Ensure job descriptions are detailed
- Include specific skills and technologies
- Use consistent formatting in your resume
- Review suggestions and implement high-priority changes

---

**Ready to analyze resumes? Start the servers and visit http://localhost:3001! 🎉**
