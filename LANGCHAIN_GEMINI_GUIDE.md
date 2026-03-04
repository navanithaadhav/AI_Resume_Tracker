# LangChain + Gemini Setup

**Now using LangChain with Google Gemini!** 🎉

## ✨ Benefits

| Feature | Plain Gemini | LangChain + Gemini |
|---------|:-----:|:-----:|
| **API Management** | Direct calls | Abstracted, cleaner |
| **Message Handling** | Raw JSON | Structured format |
| **Prompt Templates** | Manual | Built-in support |
| **Logging & Debugging** | Manual | Automatic |
| **Future Extensions** | Harder | Easier |
| **Code Maintenance** | More code | Less code |

---

## 🚀 Setup

### Install Dependencies

```bash
cd backend
npm install
```

This installs:
- `langchain` - Framework
- `@langchain/google-genai` - Google integration
- `@langchain/core` - Core utilities
- `@google/generative-ai` - Gemini API

### Create .env

```bash
echo "GEMINI_API_KEY=AIzaSy..." > .env
echo "PORT=5000" >> .env
echo "NODE_ENV=development" >> .env
echo "CLIENT_URL=http://localhost:3001" >> .env
```

### Start Backend

```bash
npm run dev
```

---

## 📊 Code Comparison

### Before (Direct Gemini)
```javascript
const { GoogleGenerativeAI } = require('@google/generative-ai');

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = gemini.getGenerativeModel({ model: 'gemini-pro' });

const response = await model.generateContent({
  contents: [{ role: 'user', parts: [{ text: prompt }] }],
  generationConfig: { temperature: 0.7, maxOutputTokens: 2000 }
});

let text = response.response.text();
```

### After (LangChain)
```javascript
const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { HumanMessage, SystemMessage } = require('@langchain/core/messages');

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  modelName: 'gemini-pro',
  temperature: 0.7,
  maxOutputTokens: 2000
});

const messages = [
  new SystemMessage(systemPrompt),
  new HumanMessage(userPrompt)
];

const response = await model.invoke(messages);
let text = response.content;
```

**Benefits**: Cleaner, more readable, better structured! ✅

---

## 🔧 How It Works

### 1. Initialize LangChain Model

```javascript
const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  modelName: 'gemini-pro',
  temperature: 0.7,
  maxOutputTokens: 2000
});
```

### 2. Create Messages

```javascript
const messages = [
  new SystemMessage("You are an expert..."),
  new HumanMessage("Analyze this resume...")
];
```

### 3. Get Response

```javascript
const response = await model.invoke(messages);
const text = response.content;
```

### 4. Parse JSON

```javascript
const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
const data = JSON.parse(jsonMatch[1]);
```

---

## 🎯 Available Models

LangChain supports multiple models through Gemini:

```javascript
// Free models
modelName: 'gemini-pro'        // Text generation (default)
modelName: 'gemini-pro-vision' // Vision + text

// Premium models (if available)
modelName: 'gemini-1.5-pro'
```

---

## 🔌 Extending with LangChain

### Add Prompt Templates

```javascript
const { PromptTemplate } = require('@langchain/core/prompts');

const template = `You are an expert HR recruiter.
Analyze this resume: {resume}
Against this job: {job}
Return JSON format.`;

const prompt = PromptTemplate.fromTemplate(template);
```

### Add Output Parser

```javascript
const { JsonOutputParser } = require('@langchain/core/output_parsers');

const parser = new JsonOutputParser();
const chain = prompt.pipe(model).pipe(parser);
const result = await chain.invoke({ resume: text, job: desc });
```

### Add Memory (for future conversations)

```javascript
const { BufferMemory } = require('@langchain/core/memory');

const memory = new BufferMemory();
// Keeps conversation history
```

---

## 🐛 Troubleshooting

### "Cannot find module '@langchain/google-genai'"

```bash
cd backend
npm install
npm list @langchain/google-genai
```

### "API Key invalid"

- Check `.env` file has correct key
- Key should be: `AIzaSy...`
- Get from: [Google AI Studio](https://makersuite.google.com/app/apikey)

### "Module version conflict"

```bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 💡 Next Steps

### Use Advanced Features

1. **Prompt Templates** - Better organized prompts
2. **Chains** - Connect multiple operations
3. **RAG** - Add document retrieval
4. **Memory** - Multi-turn conversations
5. **Agents** - Intelligent routing

### Example: Chain

```javascript
const { LLMChain } = require('@langchain/core/chains');
const { PromptTemplate } = require('@langchain/core/prompts');

const prompt = PromptTemplate.fromTemplate(
  "Analyze resume: {text}"
);

const chain = new LLMChain({
  llm: model,
  prompt: prompt
});

const result = await chain.call({ text: resumeText });
```

---

## 📚 Resources

- [LangChain Docs](https://js.langchain.com/)
- [Google Genai Integration](https://js.langchain.com/docs/integrations/llms/google_generativeai)
- [LangChain Examples](https://github.com/langchain-ai/langjs)

---

## 🚀 Test It

```bash
# Start backend
npm run dev

# Upload resume and analyze!
# Visit http://localhost:3001
```

---

**Enjoy LangChain + Gemini combo! Way cleaner code.** 💪
