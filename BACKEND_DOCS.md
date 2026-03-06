# Backend Documentation

## Architecture Overview

The backend is built with **Node.js**, **Express**, and **TypeScript**, featuring:
- RESTful API endpoints
- File upload and parsing
- Google Gemini AI integration (`gemini-2.5-flash`)
- Comprehensive error handling

## Project Structure

```
backend/
├── src/
│   ├── routes/
│   │   ├── resumeRoutes.ts
│   │   └── analysisRoutes.ts
│   ├── services/
│   │   └── aiService.ts
│   ├── utils/
│   │   ├── fileParser.ts
│   │   └── multerConfig.ts
│   ├── middleware/
│   └── types/
├── uploads/
├── server.ts
├── tsconfig.json
├── package.json
└── .env
```

## Key Components

### 1. Server (server.js)
Main entry point that:
- Configures Express middleware
- Sets up CORS
- Mounts routes
- Handles errors
- Starts the server

### 2. Routes

#### resumeRoutes.js
Handles resume file uploads:
```
POST /api/resume/upload
- Accepts: multipart/form-data
- File field: 'resume'
- Returns: Parsed resume text
```

#### analysisRoutes.js
Handles AI analysis:
```
POST /api/analysis/analyze
- Input: resumeText, jobDescription
- Output: Full analysis with suggestions

POST /api/analysis/quick-score
- Input: resumeText, jobDescription
- Output: Score only
```

### 3. Services

#### aiService.ts
Manages Google Gemini AI integration:
```typescript
// Main functions:
- analyzeResume(resumeText, jobDescription): Promise<ResumeAnalysis>
- generateImprovementSuggestions(resumeText, jobDescription): Promise<ImprovementSuggestions>
```

Uses `gemini-2.5-flash` model with structured prompts to:
- Calculate resume score
- Identify missing skills
- Generate improvement suggestions
- Recommend ATS keywords

### 4. Utilities

#### fileParser.ts
Parses uploaded files:
```typescript
- parseResumeFile(filePath)     // Auto-detects format
- extractTextFromPDF(filePath)  // PDF parsing
- extractTextFromDOCX(filePath) // DOCX parsing
- normalizeText(text)           // Text cleaning
```

#### multerConfig.ts
Configures file upload:
- Disk storage configuration
- File type validation
- Size limits (10MB)
- Filename generation

## API Response Format

### Successful Analysis
```json
{
  "success": true,
  "analysis": {
    "score": 85,
    "missing_skills": ["Kubernetes", "Docker"],
    "improvements": ["Add project descriptions"],
    "ats_keywords": ["container", "orchestration"],
    "strengths": ["Strong fundamentals"],
    "summary": "Good match for this role"
  },
  "suggestions": {
    "content_improvements": [...],
    "keyword_optimization": [...],
    "formatting_tips": [...],
    "priority_changes": [...]
  },
  "analyzedAt": "2024-03-04T10:00:00Z"
}
```

### Error Response
```json
{
  "error": "Descriptive error message"
}
```

## Environment Configuration

Required variables in `.env`:
```
PORT=10000
NODE_ENV=development
CLIENT_URL=http://localhost:3001
GEMINI_API_KEY=your_gemini_api_key_here
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

## Dependencies

### Core
- **express**: Web framework
- **multer**: File upload handling
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables

### File Processing
- **pdf-parse**: PDF text extraction
- **mammoth**: DOCX text extraction

### AI
- **openai**: OpenAI API client
- **langchain**: AI framework integration

## Error Handling

The backend handles:
1. **File Errors**:
   - Wrong file type
   - File too large
   - Parsing failures

2. **Validation Errors**:
   - Missing required fields
   - Text too short
   - Invalid input format

3. **API Errors**:
   - OpenAI API failures
   - Network errors
   - Rate limiting

## Performance Tips

1. **Caching**: Cache OpenAI responses
2. **Compression**: Gzip responses
3. **Timeouts**: Set request timeouts
4. **Rate Limiting**: Prevent abuse

## Testing Endpoints

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Upload Resume
```bash
curl -X POST -F "resume=@resume.pdf" \
  http://localhost:5000/api/resume/upload
```

### Analyze
```bash
curl -X POST http://localhost:5000/api/analysis/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "resumeText": "...",
    "jobDescription": "..."
  }'
```

## Extending the Backend

### Add New Endpoint
1. Create route file in `src/routes/`
2. Define route handler
3. Mount in `server.js`

### Add New Service
1. Create service file in `src/services/`
2. Export functions
3. Use in routes

### Add New Middleware
1. Create in `src/middleware/`
2. Apply in `server.js`

## Production Deployment

Before deploying:
1. Set `NODE_ENV=production`
2. Use process manager (PM2)
3. Set up reverse proxy (Nginx)
4. Enable HTTPS
5. Configure rate limiting
6. Set up monitoring
7. Use environment-specific configs

## Troubleshooting

### Module Not Found
```bash
npm install
npm list  # Check installed packages
```

### File Upload Issues
```bash
# Check uploads directory
ls -la uploads/
# Ensure directory is writable
chmod 755 uploads/
```

### OpenAI Errors
- Verify API key format
- Check account balance
- Rate limiting? Wait before retrying
- Wrong model name? Check available models

## Monitoring

Add logging for:
- Request/response times
- File upload sizes
- OpenAI API usage
- Error rates
- API response quality

## Future Improvements

- [ ] WebSocket for real-time updates
- [ ] Job queue for async processing
- [ ] Database for result storage
- [ ] User authentication
- [ ] Advanced analytics
- [ ] Webhook integrations
- [ ] GraphQL API
