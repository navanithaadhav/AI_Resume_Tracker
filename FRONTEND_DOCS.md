# Frontend Documentation

## Architecture Overview

The frontend is built with **React**, **TypeScript**, and **TailwindCSS**, featuring:
- Component-based architecture
- State management with React hooks
- Responsive design
- Real-time analysis feedback

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── ResumeUpload.tsx
│   │   ├── JobDescriptionInput.tsx
│   │   ├── ResultsDashboard.tsx
│   │   └── LoadingSpinner.tsx
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   ├── pages/
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
```

## Components

### Header.tsx
Displays the application header with title and description.

**Props**: None

**Features**:
- Gradient background
- Emoji icon
- Responsive design

### ResumeUpload.tsx
Handles resume file upload and parsing.

**Props**:
- `onResumeUpload(text: string)`: Callback when resume is uploaded
- `isLoading: boolean`: Loading state

**Features**:
- File type validation (PDF/DOCX)
- File size validation (10MB)
- File preview
- Clear error messages
- Disabled state during upload

**State**:
- `file`: Selected file object
- `error`: Error message string

### JobDescriptionInput.tsx
Input area for job description with sample text.

**Props**:
- `onJobDescriptionChange(text: string)`: Callback for text changes
- `jobDescription: string`: Current text value
- `isLoading: boolean`: Loading state

**Features**:
- Large textarea for multi-line input
- Character count display
- Sample job description button
- Disabled state during analysis

### ResultsDashboard.tsx
Displays comprehensive analysis results in tabbed interface.

**Props**:
- `analysis`: Analysis object from backend
- `suggestions`: Suggestions object from backend
- `isLoading`: Boolean for loading state

**Features**:
- Resume score with color coding
- Tabbed interface (Overview, Skills, Improvements, ATS)
- Visual badges
- Export to JSON functionality
- Responsive layout

**Tabs**:
1. **Overview**: Strengths and summary
2. **Skills**: Missing skills display
3. **Improvements**: Content and priority changes
4. **ATS**: Keywords and formatting tips

### LoadingSpinner.jsx
Shows loading animation during analysis.

**Props**:
- `message`: Custom loading message

**Features**:
- Animated spinner
- Helpful text
- Centered layout

## Main App Component (App.js)

Core application logic and state management.

**State**:
- `resumeText`: Parsed resume text
- `jobDescription`: Job description input
- `analysis`: Analysis results
- `suggestions`: Improvement suggestions
- `isLoading`: Loading state
- `error`: Error messages

**Key Functions**:
- `handleResumeUpload()`: Process uploaded resume
- `handleJobDescriptionChange()`: Update job description
- `handleAnalyze()`: Call backend analysis API
- `handleReset()`: Clear all data and results

**Flow**:
1. User uploads resume → `handleResumeUpload` stores text
2. User enters job description → updates state
3. User clicks Analyze → `handleAnalyze` calls API
4. Results update state → `ResultsDashboard` displays
5. User can reset or download results

## Services

### api.js
Handles all API communication with backend.

**Functions**:

```javascript
uploadResume(file)
// Uploads file to /api/resume/upload
// Returns: { resumeText, filename, ... }

analyzeResume(resumeText, jobDescription)
// POST to /api/analysis/analyze
// Returns: { analysis, suggestions }

getQuickScore(resumeText, jobDescription)
// POST to /api/analysis/quick-score
// Returns: { score, summary, missingSkillsCount }

checkBackendHealth()
// GET /api/health
// Returns: boolean
```

## Styling

### TailwindCSS Configuration
- Customized colors and spacing
- Component layer utilities
- Responsive breakpoints

### Custom CSS Classes

**Buttons**:
- `.btn-primary`: Blue primary button
- `.btn-secondary`: Gray secondary button

**Cards**:
- `.card`: White card with shadow and border

**Input**:
- `.input-field`: Styled input and textarea

**Text**:
- `.section-title`: Large section headings
- `.badge-success`: Green success badge
- `.badge-warning`: Yellow warning badge
- `.badge-error`: Red error badge

**Animation**:
- `.loading-spinner`: Spinning circle
- `.fade-in`: Fade-in entrance animation

## State Management

Uses React hooks for state:
- `useState`: For component-level state
- Props drilling for parent-child communication
- Callback functions for child-to-parent communication

**Future Enhancement**: Consider Redux/Context API for larger apps

## API Integration

### Fetch Pattern
```javascript
try {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  
  return await response.json();
} catch (err) {
  // Handle error
}
```

### Error Handling
- Validates required fields before API calls
- Displays user-friendly error messages
- Prevents API calls with incomplete data
- Handles network errors gracefully

## Responsive Design

Breakpoints using TailwindCSS:
- **Mobile**: Default (< 640px)
- **Tablet**: sm (640px+)
- **Desktop**: lg (1024px+)

Grid layout:
- Mobile: 1 column
- Desktop: 2 columns (upload + job description)

## Performance Optimization

1. **Lazy Loading**: Components load on demand
2. **Memoization**: Consider React.memo for static components
3. **Bundle Size**: Minimal dependencies
4. **CSS**: TailwindCSS with PurgeCSS

## Extending the Frontend

### Add New Component
1. Create `.jsx` file in `src/components/`
2. Use functional component with hooks
3. Import and use in App.js
4. Add to appropriate section

### Add New Page
1. Create `.jsx` file in `src/pages/`
2. Set up routing (if using React Router)
3. Add link in navigation

### Add New Feature
1. Create service functions in `src/services/api.js`
2. Add state and handlers in `App.js`
3. Create UI components
4. Wire together

## Styling Guidelines

1. Use TailwindCSS utility classes first
2. Add custom CSS only when necessary
3. Follow BEM naming for custom classes
4. Keep consistent spacing (use TailwindCSS spacing scale)
5. Use semantic HTML

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android

## Debugging

### Browser DevTools
1. React DevTools extension
2. Network tab for API calls
3. Console for JavaScript errors

### Logging
```javascript
console.log('Resume uploaded:', resumeText);
console.error('Analysis error:', error);
```

### Testing
```bash
npm test
```

## Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
1. **Vercel**: `vercel deploy`
2. **Netlify**: `netlify deploy`
3. **AWS S3**: `aws s3 sync build/ s3://bucket/`
4. **GitHub Pages**: `gh-pages`

## Environment Variables

Create `.env.local`:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

Access in code:
```javascript
const apiUrl = process.env.REACT_APP_API_URL;
```

## Future Improvements

- [ ] Dark mode toggle
- [ ] Resume comparison view
- [ ] Skill gap visualization
- [ ] Resume templates
- [ ] User accounts and history
- [ ] Social sharing
- [ ] Accessibility improvements
- [ ] Offline support
- [ ] Mobile app (React Native)
- [ ] Internationalization (i18n)

## Common Issues

### CORS Errors
- Verify backend is running
- Check `CLIENT_URL` in backend .env
- Proxy configured in package.json

### API Timeouts
- Increase timeout in fetch calls
- Check network connection
- Verify backend is responding

### Styling Issues
- Ensure TailwindCSS is properly built
- Check `tailwind.config.js`
- Rebuild CSS: `npm run build`

## Resources

- [React Documentation](https://react.dev)
- [TailwindCSS Docs](https://tailwindcss.com)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
