# AI Resume Analyzer

A full-stack AI-powered application that analyzes resumes against job descriptions using **Google Gemini AI** and LangChain.

## Features

✨ **Core Features:**
- Upload resume (PDF or DOCX)
- Enter job description
- AI-powered resume analysis
- Resume match score (0-100)
- Identify missing skills
- Provide improvement suggestions
- ATS optimization recommendations
- Download analysis results as JSON

## Tech Stack

### Backend
- **Runtime**: Node.js with Express
- **Language**: TypeScript
- **File Handling**: Multer, pdf-parse, mammoth (DOCX)
- **AI**: Google Gemini API (`gemini-2.5-flash`), LangChain
- **Other**: CORS, Dotenv

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **UI Components**: Custom React components

## Project Structure

```
AI_Resume_Analyzer/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── resumeRoutes.ts      # Resume upload endpoint
│   │   │   └── analysisRoutes.ts    # AI analysis endpoints
│   │   ├── services/
│   │   │   └── aiService.ts         # Google Gemini integration
│   │   ├── utils/
│   │   │   ├── fileParser.ts        # PDF/DOCX parsing
│   │   │   └── multerConfig.ts      # File upload config
│   │   ├── middleware/
│   │   └── types/
│   ├── uploads/                      # Temporary file storage
│   ├── server.ts                     # Main server file
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── ResumeUpload.tsx
│   │   │   ├── JobDescriptionInput.tsx
│   │   │   ├── ResultsDashboard.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── services/
│   │   │   └── api.ts                # API calls
│   │   ├── types/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .gitignore
│
└── README.md
```

## Prerequisites

- Node.js 18+ and npm
- Google Gemini API key (FREE!) - [Get one here](https://makersuite.google.com/app/apikey)

## Installation & Setup

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your Gemini API key:
   ```
   PORT=5001
   NODE_ENV=development
   CLIENT_URL=http://localhost:3001
   GEMINI_API_KEY=your_gemini_api_key_here
   MAX_FILE_SIZE=10485760
   UPLOAD_DIR=./uploads
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5001`

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3001`

### 3. Verify Setup

1. Check backend health:
   ```bash
   curl http://localhost:5001/api/health
   ```
   Expected response:
   ```json
   { "status": "OK", "message": "AI Resume Analyzer Backend is running" }
   ```

2. The frontend should load and show the upload interface

## API Endpoints

### Resume Upload
- **Endpoint**: `POST /api/resume/upload`
- **Description**: Upload and parse resume file
- **Content-Type**: `multipart/form-data`
- **Parameters**:
  - `resume` (file): PDF or DOCX file (max 10MB)
- **Response**:
  ```json
  {
    "success": true,
    "filename": "resume-1234567890.pdf",
    "originalName": "my_resume.pdf",
    "resumeText": "extracted resume text...",
    "fileSize": 1024,
    "uploadedAt": "2024-03-04T10:00:00Z"
  }
  ```

### Analyze Resume
- **Endpoint**: `POST /api/analysis/analyze`
- **Description**: Analyze resume against job description
- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "resumeText": "resume text content",
    "jobDescription": "job description text"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "analysis": {
      "score": 85,
      "missing_skills": ["Docker", "Kubernetes"],
      "improvements": ["Add Docker experience to projects section"],
      "ats_keywords": ["containerization", "orchestration"],
      "strengths": ["Strong JavaScript skills", "Good communication"],
      "summary": "Your resume is well-matched to this role"
    },
    "suggestions": {
      "content_improvements": [...],
      "keyword_optimization": [...],
      "formatting_tips": [...],
      "priority_changes": [...]
    },
    "analyzedAt": "2024-03-04T10:05:00Z"
  }
  ```

### Quick Score
- **Endpoint**: `POST /api/analysis/quick-score`
- **Description**: Get quick resume score without detailed analysis
- **Content-Type**: `application/json`
- **Body**: Same as analyze resume
- **Response**:
  ```json
  {
    "success": true,
    "score": 85,
    "summary": "Your resume is well-matched",
    "missingSkillsCount": 2
  }
  ```

### Health Check
- **Endpoint**: `GET /api/health`
- **Description**: Check if backend is running
- **Response**:
  ```json
  { "status": "OK", "message": "AI Resume Analyzer Backend is running" }
  ```

## Usage

1. **Upload Resume**: Click the upload button and select a PDF or DOCX file
2. **Enter Job Description**: Copy and paste the job description, or use the sample
3. **Analyze**: Click the "Analyze Resume" button
4. **Review Results**: Check the score, missing skills, improvements, and ATS keywords
5. **Download**: Export results as JSON for future reference

## Features Explained

### Resume Score
- A percentage (0-100) indicating how well your resume matches the job
- 80-100: Excellent match
- 60-79: Good match with some gaps
- 0-59: Significant gaps

### Missing Skills
- Skills mentioned in the job description that aren't apparent in your resume
- Prioritized by importance for the role

### Improvements
- Specific, actionable suggestions to enhance your resume
- Includes formatting, content, and structure improvements

### ATS Keywords
- Keywords recommended to improve ATS (Applicant Tracking System) compatibility
- These help your resume get past automated screening

## Environment Variables

### Backend (.env)
```
PORT=5001                              # Server port
NODE_ENV=development                   # Environment
CLIENT_URL=http://localhost:3001      # Frontend URL for CORS
GEMINI_API_KEY=your_key_here          # Google Gemini API key (FREE!)
MAX_FILE_SIZE=10485760                # Max file size (10MB)
UPLOAD_DIR=./uploads                  # Upload directory
```

### Frontend (optional .env)
```
REACT_APP_API_URL=http://localhost:5001/api
```

## Error Handling

The application includes comprehensive error handling:

- **File Upload Errors**:
  - File type validation (only PDF/DOCX)
  - File size validation (max 10MB)
  - Parsing errors with helpful messages

- **API Errors**:
  - Missing required fields
  - Gemini API errors
  - Network errors with user-friendly messages

- **Validation**:
  - Resume text minimum length
  - Job description minimum length
  - Input validation before API calls

## Troubleshooting

### Backend won't start
```bash
# Check if port 5001 is in use
netstat -ano | findstr :5001
# Or on Linux/Mac: lsof -i :5001
```

### Gemini API errors
- Verify your API key is correct in `.env`
- Get a free API key: https://makersuite.google.com/app/apikey
- Check your API quota at Google AI Studio

### Frontend can't connect to backend
- Ensure backend is running on port 5001
- Check CORS settings in `server.ts`
- Verify `CLIENT_URL` matches your frontend URL in `.env`

### File upload fails
- Check file is PDF or DOCX
- Verify file size < 10MB
- Ensure `uploads` directory has write permissions

### Analysis takes too long
- Gemini API responses typically take 10-30 seconds
- Check your internet connection

## Performance Optimization

### Backend
- Implement caching for repeated analyses
- Use streaming for large file uploads
- Add file size compression

### Frontend
- Lazy load components
- Optimize bundle size
- Implement result caching

## Security Considerations

1. **API Keys**: Never commit `.env` to version control
2. **File Uploads**: Validate file types server-side
3. **CORS**: Configure appropriate origins in production
4. **Rate Limiting**: Add rate limiting in production
5. **Input Sanitization**: Validate all user inputs

## Future Enhancements

- [ ] User authentication and dashboard
- [ ] Resume storage and version history
- [ ] Job bookmark and saved searches
- [ ] Resume templates
- [ ] Skill verification with badges
- [ ] Integration with LinkedIn
- [ ] Mobile app version
- [ ] Multiple language support
- [ ] Custom scoring rubrics
- [ ] Batch resume analysis

## Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy the `build` folder to Vercel
```

### Backend (AWS EC2 / Docker)
```bash
# Build TypeScript
npm run build

# Docker
docker build -t ai-resume-analyzer .
docker run -p 5001:5001 --env-file .env ai-resume-analyzer

# AWS EC2
npm install -g pm2
pm2 start dist/server.js
pm2 save
```

## Cost Considerations

- **Google Gemini API**: FREE tier available with generous limits!
- **Hosting**: Varies by platform
- **Storage**: Minimal (resumes cleaned up after analysis)

## Support & Contribution

For issues, feature requests, or contributions, please create an issue or pull request.

## License

MIT License - feel free to use and modify

## Changelog

### Version 1.0.0
- Initial release
- Resume upload functionality
- AI-powered analysis
- Results dashboard
- ATS optimization suggestions

---

**Happy analyzing! 🚀**
