# Gemini API Setup Guide

Gemini is **FREE** with generous limits! 🎉 Here's how to set it up:

## 1. Get Your Gemini API Key

**Step 1:** Go to [Google AI Studio](https://makersuite.google.com/app/apikey) (or https://aistudio.google.com)

**Step 2:** Sign in with your Google account

**Step 3:** Click **"Create API key"** → **"Create API key in new project"**

**Step 4:** Copy your API key (looks like: `AIzaSy...`)

## 2. Setup Backend

```bash
cd backend

# Install new dependencies
npm install

# Create .env file
echo "GEMINI_API_KEY=AIzaSy..." > .env
echo "PORT=10000" >> .env
echo "NODE_ENV=development" >> .env
echo "CLIENT_URL=http://localhost:3001" >> .env

# Start backend
npm run dev
```

## 3. That's It! ✅

Your app now uses **Gemini** instead of OpenAI!

---

## 📊 Gemini vs OpenAI Pricing

| Feature | Gemini (FREE) | OpenAI (Paid) |
|---------|:-----:|:-----:|
| API Key | Free | Paid |
| Monthly Limit | 60 calls/minute | Based on credits |
| Cost | Free | $0.01+ per request |
| Best for | Testing/Small projects | Production |

---

## 🚀 Test It

```bash
# Backend
cd backend
npm run dev

# Frontend (new terminal)
cd frontend
npm start

# Visit http://localhost:3001
# Upload a resume and analyze!
```

---

## 💡 Tips

- Gemini is **completely free** for testing
- No credit card needed
- Perfect for development
- Works exactly like OpenAI for this project

---

## 🐛 Troubleshooting

### "Invalid API Key"
- Check you copied the full key
- Regenerate key in [Google AI Studio](https://makersuite.google.com/app/apikey)
- Make sure it's in `.env` file

### "Rate limit exceeded"
- Gemini has limits on free tier
- Wait a few seconds before next request
- Or upgrade to paid

### "Cannot find module '@google/generative-ai'"
```bash
cd backend
npm install
```

---

**Happy analyzing with Gemini! 🎉**
