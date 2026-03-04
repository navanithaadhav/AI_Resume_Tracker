# API Reference

Complete API documentation for the AI Resume Analyzer backend.

## Base URL

```
http://localhost:5001/api
```

Production: Configure with your domain

## Authentication

Currently, the API is open (no authentication required). For production, consider adding:
- API keys
- JWT tokens
- OAuth2

## Common Headers

```
Content-Type: application/json
Accept: application/json
```

---

## Endpoints

### Health Check

**Check if backend is running**

```
GET /health
```

**Response (200 OK):**
```json
{
  "status": "OK",
  "message": "AI Resume Analyzer Backend is running"
}
```

---

### Resume Upload

**Upload and parse a resume file**

```
POST /resume/upload
Content-Type: multipart/form-data
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| resume | File | Yes | Resume file (PDF or DOCX, max 10MB) |

**Request Example:**
```bash
curl -X POST \
  -F "resume=@resume.pdf" \
  http://localhost:5001/api/resume/upload
```

**Response (200 OK):**
```json
{
  "success": true,
  "filename": "resume-1234567890-123456789.pdf",
  "originalName": "my_resume.pdf",
  "resumeText": "John Doe\n\nExperience:\nSoftware Engineer at TechCorp...",
  "fileSize": 102400,
  "uploadedAt": "2024-03-04T10:00:00Z"
}
```

**Error Response (400):**
```json
{
  "error": "File size exceeds limit"
}
```

**Possible Errors:**
- `No file uploaded` - File parameter missing
- `File size exceeds limit` - File > 10MB
- `Only PDF and DOCX files are allowed` - Wrong file type
- `PDF parsing error: ...` - Corrupt PDF
- `DOCX parsing error: ...` - Corrupt DOCX

---

### Analyze Resume

**Full analysis of resume against job description**

```
POST /analysis/analyze
Content-Type: application/json
```

**Request Body:**

```json
{
  "resumeText": "John Doe\nExperience: Software Engineer at TechCorp...",
  "jobDescription": "Senior Full Stack Developer...\n\nRequired Skills: React, Node.js, PostgreSQL..."
}
```

**Parameters:**

| Name | Type | Required | Min Length | Description |
|------|------|----------|------------|-------------|
| resumeText | String | Yes | 50 chars | Parsed resume content |
| jobDescription | String | Yes | 50 chars | Job description text |

**Response (200 OK):**
```json
{
  "success": true,
  "analysis": {
    "score": 85,
    "missing_skills": [
      "Kubernetes",
      "Docker",
      "AWS Lambda"
    ],
    "improvements": [
      "Add containerization experience to your projects section",
      "Highlight any cloud deployment experience",
      "Mention specific AWS services you've used"
    ],
    "ats_keywords": [
      "containerization",
      "orchestration",
      "microservices",
      "cloud-native",
      "DevOps"
    ],
    "strengths": [
      "Strong JavaScript and React skills",
      "Good understanding of database design",
      "Experience with RESTful APIs"
    ],
    "summary": "Your resume is a good match for this role. You have most of the required skills, but could strengthen your cloud/DevOps experience."
  },
  "suggestions": {
    "content_improvements": [
      "Add a summary section highlighting your strongest skills",
      "Quantify your achievements with metrics",
      "Include specific technologies in your project descriptions"
    ],
    "keyword_optimization": [
      "Add 'agile' or 'scrum' if you have that experience",
      "Mention 'CI/CD' pipeline experience",
      "Include 'full-stack' or 'end-to-end' for relevant projects"
    ],
    "formatting_tips": [
      "Use consistent date formatting",
      "Ensure proper spacing and margins",
      "Use clear section headers for ATS readability",
      "Avoid tables and complex formatting"
    ],
    "priority_changes": [
      "1. Add Docker/Kubernetes experience or learning projects",
      "2. Emphasize cloud platform experience",
      "3. Highlight DevOps tools you've worked with"
    ]
  },
  "analyzedAt": "2024-03-04T10:05:00Z"
}
```

**Error Response (400 - Missing Field):**
```json
{
  "error": "Both resumeText and jobDescription are required"
}
```

**Error Response (400 - Too Short):**
```json
{
  "error": "Resume text is too short. Please provide a proper resume."
}
```

**Error Response (500 - API Error):**
```json
{
  "error": "OpenAI API configuration error. Please check your API key."
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| score | Integer | 0-100 match percentage |
| missing_skills | Array | Skills from job but not in resume |
| improvements | Array | General improvement suggestions |
| ats_keywords | Array | Keywords to add for ATS |
| strengths | Array | Resume strengths relevant to job |
| summary | String | Brief overall assessment |

---

### Quick Score

**Get only the resume score without full analysis**

```
POST /analysis/quick-score
Content-Type: application/json
```

**Request Body:**
```json
{
  "resumeText": "John Doe\nExperience: Software Engineer...",
  "jobDescription": "Senior Full Stack Developer..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "score": 85,
  "summary": "Your resume is a good match for this role.",
  "missingSkillsCount": 3
}
```

**Speed:** Faster than full analysis (quicker API response)

**Use Cases:**
- Quick preview before full analysis
- Batch scoring
- Real-time score updates

---

## Data Types & Formats

### Resume Score
- **Type**: Integer
- **Range**: 0-100
- **Interpretation**:
  - 90-100: Excellent match
  - 80-89: Very good match
  - 70-79: Good match with some gaps
  - 60-69: Moderate match, significant gaps
  - 0-59: Poor match, major skill gaps

### Skills Array
- **Type**: Array of Strings
- **Format**: Skill names (e.g., "Kubernetes", "Docker")
- **Note**: Ordered by importance

### Suggestions Array
- **Type**: Array of Strings
- **Format**: Actionable recommendations
- **Note**: Each item is specific and actionable

### Dates
- **Format**: ISO 8601 (UTC)
- **Example**: "2024-03-04T10:00:00Z"

---

## Error Handling

### HTTP Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Request successful |
| 400 | Bad Request | Invalid input, missing fields |
| 404 | Not Found | Endpoint doesn't exist |
| 500 | Server Error | Internal error, API key issue |

### Error Response Format

```json
{
  "error": "Human-readable error message"
}
```

### Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| File size exceeds limit | File > 10MB | Compress or use shorter resume |
| Only PDF and DOCX files are allowed | Wrong file type | Convert to PDF or DOCX |
| Both resumeText and jobDescription required | Missing parameter | Provide both fields |
| Resume text is too short | Text < 50 chars | Provide complete resume |
| OpenAI API configuration error | Invalid API key | Check OPENAI_API_KEY in .env |

---

## Rate Limiting

Current implementation has no rate limiting. For production, consider:

- 60 requests per minute per IP
- 100 requests per day per user
- Implement with middleware like `express-rate-limit`

```javascript
const rateLimit = require('express-rate-limit');

const analyzerLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5 // 5 requests per minute
});

router.post('/analyze', analyzerLimiter, analyzeHandler);
```

---

## Response Times

Typical response times (OpenAI GPT-4):

| Endpoint | Time | Notes |
|----------|------|-------|
| /resume/upload | 0.5s - 2s | Depends on file size |
| /analysis/quick-score | 20s - 60s | Faster analysis |
| /analysis/analyze | 40s - 120s | Full analysis, more detailed |
| /health | < 100ms | Instant |

---

## Example Workflows

### Workflow 1: Complete Analysis

```
1. User selects resume file
2. POST /resume/upload
   └─ Get: resumeText
3. User enters job description
4. POST /analysis/analyze
   └─ Get: Full analysis + suggestions
5. Display results in UI
```

### Workflow 2: Quick Preview

```
1. Upload resume
2. GET initial job description
3. POST /quick-score
   └─ Get: Score only (fast)
4. If score < 70, POST /analyze
   └─ Get: Full details
```

### Workflow 3: Batch Analysis

```
1. API iterates through multiple job descriptions
2. For each: POST /analysis/quick-score
3. Filter jobs by score > 70
4. For filtered jobs: POST /analysis/analyze
5. Present top matches
```

---

## Webhooks (Future)

Planned webhook support for async processing:

```javascript
POST /analysis/analyze-async
{
  "resumeText": "...",
  "jobDescription": "...",
  "webhookUrl": "https://your-app.com/callback"
}
```

Response: Job ID for polling results

---

## Versioning

Current API version: **v1**

Future versions will be accessible at:
```
/api/v2/analysis/analyze
/api/v2/resume/upload
```

---

## CORS Policy

Allowed Origins (configurable in `.env`):
- `http://localhost:3001` (development)
- Production domain

Allowed Methods:
- GET, POST, PUT, DELETE, OPTIONS

Allowed Headers:
- Content-Type, Accept, Authorization

---

## Testing

### Using cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Upload resume (bash)
curl -F "resume=@resume.pdf" \
  http://localhost:5000/api/resume/upload

# Analyze (bash)
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "resumeText": "John Doe...",
    "jobDescription": "Senior Developer..."
  }' \
  http://localhost:5000/api/analysis/analyze
```

### Using Postman

1. Import collection from `postman-collection.json`
2. Set environment variable: `api_url = http://localhost:5000/api`
3. Run requests in sequence

### Using Python

```python
import requests

base_url = "http://localhost:5000/api"

# Upload
with open('resume.pdf', 'rb') as f:
    response = requests.post(
        f"{base_url}/resume/upload",
        files={'resume': f}
    )
    resume_text = response.json()['resumeText']

# Analyze
analysis = requests.post(
    f"{base_url}/analysis/analyze",
    json={
        "resumeText": resume_text,
        "jobDescription": "Senior Developer..."
    }
)
print(analysis.json())
```

---

## Support

For API issues or documentation improvements, please refer to:
- Main README.md
- BACKEND_DOCS.md
- GitHub Issues
