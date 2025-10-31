# AI Chatbot Setup Instructions

## Quick Start (5 Minutes)

### Step 1: Get Your Free Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key (starts with `AIza...`)

### Step 2: Add Scripts to Your HTML

Add these scripts to your `src/index.html` before the closing `</body>` tag:

```html
<!-- AI Chatbot Service -->
<script src="/js/ai-chatbot-service.js"></script>
<script src="/js/ai-chatbot-integration.js"></script>
```

**Or add them right after your existing chatbot scripts:**

```html
<script src="/js/ultimate-chatbot.js" defer></script>
<script src="/js/ai-chatbot-service.js"></script>
<script src="/js/ai-chatbot-integration.js"></script>
```

### Step 3: Initialize AI Chatbot

Add this script block after the AI chatbot scripts:

```html
<script>
  // Initialize AI Chatbot when page loads
  document.addEventListener('DOMContentLoaded', function() {
    // Option 1: Initialize with API key directly (for testing)
    // Replace 'YOUR_API_KEY_HERE' with your actual API key
    if (typeof configureAIChatbot === 'function') {
      configureAIChatbot('YOUR_API_KEY_HERE');
    }

    // Option 2: Load from secure config (recommended for production)
    // You should load this from your backend or environment variables
    // fetch('/api/config/ai-key')
    //   .then(r => r.json())
    //   .then(data => configureAIChatbot(data.apiKey));
  });
</script>
```

### Step 4: Build and Test

1. Run `npm run build`
2. Open your website
3. Test the chatbot - it should now use AI responses!

## Security Best Practices

### ⚠️ IMPORTANT: Never expose API keys in frontend code!

**For Production**, use one of these approaches:

#### Option A: Backend Proxy (Recommended)
Create a backend endpoint that handles API calls:

```javascript
// In your backend (Node.js example)
app.post('/api/ai/chat', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY; // From environment
  // Make API call to Gemini
  // Return response
});
```

#### Option B: Environment Variables (Build Time)
Store API key in environment variables and inject during build:

```javascript
// In build script
const apiKey = process.env.GEMINI_API_KEY;
// Inject into config file
```

#### Option C: Secure Config File (Server-side only)
Load API key from a server-side config file that's not accessible via web.

## Testing the Integration

### Test in Browser Console

```javascript
// Check if AI service is loaded
console.log(window.AIChatbotService);

// Configure AI (replace with your key)
configureAIChatbot('YOUR_API_KEY');

// Check status
console.log(window.AIChatbotService.getStats());

// Test the chatbot
// Just use the chatbot UI - it will automatically use AI!
```

### Expected Behavior

1. **AI Enabled**: Chatbot responds with AI-generated, contextual answers
2. **AI Disabled**: Falls back to your existing rule-based system (no breakage)
3. **API Error**: Automatically falls back to rule-based (graceful degradation)

## Features

✅ **Hybrid System**: AI + Rule-based fallback  
✅ **Multi-language**: Supports FR/EN/TU/MD  
✅ **Context Aware**: Remembers conversation history  
✅ **Graceful Fallback**: Never breaks if AI fails  
✅ **Cost Effective**: Free tier available (60 requests/min)

## Troubleshooting

### "AI Service: Please set your API key"
- Make sure you called `configureAIChatbot(apiKey)` with a valid key

### "AI response failed, falling back to rule-based"
- Check API key is correct
- Check internet connection
- Verify API quota not exceeded
- Check browser console for detailed errors

### AI responses not working
- Check browser console for errors
- Verify scripts are loaded in correct order
- Make sure `configureAIChatbot()` was called

## Next Steps

After basic AI chatbot is working:

1. **Enhance with Logistics Knowledge**: Add more GKS-specific context
2. **Add Quote Integration**: Let AI pre-fill quote calculator
3. **Analytics Dashboard**: Track AI vs rule-based usage
4. **A/B Testing**: Compare AI vs rule-based performance

## Cost Monitoring

Gemini Free Tier:
- 60 requests per minute
- 1,500 requests per day
- No credit card required

If you exceed free tier:
- ~$0.001-0.002 per request
- First $50 free credits monthly

Monitor usage in [Google Cloud Console](https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas)

## Support

Need help? Check:
1. Browser console for errors
2. Network tab for API calls
3. Google AI Studio dashboard for API status

