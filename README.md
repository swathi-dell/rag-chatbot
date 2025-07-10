# 🤖 Modern Chatbot UI

A beautiful, responsive chatbot interface with voting functionality and persistent storage. Supports both client-side (localStorage) and server-side (JSON file) persistence.

![Chatbot UI Demo](https://img.shields.io/badge/Status-Ready-green) ![Node.js](https://img.shields.io/badge/Node.js-≥14.0.0-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🎨 **Beautiful UI**
- Modern, responsive design with smooth animations
- Dark sidebar with gradient background
- Professional color scheme and typography
- Mobile-optimized with collapsible sidebar
- Smooth message animations and typing indicators

### 💬 **Chat Functionality**
- Real-time chat interface
- Message timestamps
- Animated typing indicator
- Message history with clickable items
- Welcome message for new users

### 👍 **Voting System**
- Upvote/downvote for AI responses
- Real-time vote statistics in sidebar
- Persistent vote storage
- Visual feedback for voted messages

### 📊 **Data Management**
- Export chat history to JSON
- Clear history functionality
- Persistent storage (localStorage or server-side)
- Vote statistics tracking

### 📱 **Responsive Design**
- Mobile-first approach
- Touch-friendly interactions
- Collapsible sidebar on mobile
- Keyboard shortcuts support

## 🚀 Getting Started

### Option 1: Client-Side Only (No Server Required)

Simply open `chatbot-ui.html` in your web browser. All data will be stored in localStorage.

**Features:**
- ✅ Local storage persistence
- ✅ Export to JSON functionality
- ✅ All UI features
- ❌ No server-side persistence
- ❌ No real AI integration

### Option 2: With Express.js Server

For full functionality with server-side persistence to `chat_history.json`:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

**Features:**
- ✅ Server-side persistence to JSON file
- ✅ Real-time data synchronization
- ✅ All client-side features
- ✅ RESTful API endpoints
- ✅ Ready for AI service integration

## 📁 File Structure

```
chatbot-ui/
├── chatbot-ui.html     # Main HTML file with embedded CSS/JS
├── server.js           # Express.js server (optional)
├── package.json        # Node.js dependencies
├── chat_history.json   # Generated data file (server mode)
└── README.md          # This file
```

## 🔌 API Endpoints

When running with the server, the following endpoints are available:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/chat` | Send a chat message |
| `POST` | `/vote` | Record a vote (up/down) |
| `GET` | `/history` | Get complete chat history |
| `GET` | `/stats` | Get voting statistics |
| `DELETE` | `/history` | Clear all chat history |

### Example API Usage

**Send a message:**
```javascript
fetch('/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hello, AI!' })
})
```

**Record a vote:**
```javascript
fetch('/vote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    question: 'Hello, AI!', 
    vote: 'up' 
  })
})
```

## 📊 Data Format

The `chat_history.json` file follows this structure:

```json
{
  "exportDate": "2024-01-15T10:30:00.000Z",
  "totalQuestions": 5,
  "totalVotes": 3,
  "chatHistory": [
    {
      "question": "Hello, AI!",
      "vote": "up",
      "voteTimestamp": "2024-01-15T10:35:00.000Z",
      "timestamp": "2024-01-15T10:30:00.000Z"
    }
  ],
  "votes": {
    "Hello, AI!": {
      "vote": "up",
      "timestamp": "2024-01-15T10:35:00.000Z"
    }
  }
}
```

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + K` - Focus input field
- `Escape` - Close sidebar (mobile)
- `Enter` - Send message

## 🎨 Customization

### Color Scheme
The CSS uses CSS custom properties (variables) for easy theming:

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #6366f1;
  --success-color: #10b981;
  --danger-color: #ef4444;
  /* ... more variables */
}
```

### Adding AI Integration

Replace the mock response in `server.js` with your AI service:

```javascript
// Replace this section in the /chat endpoint:
const randomResponse = responses[Math.floor(Math.random() * responses.length)];

// With your AI service call:
const aiResponse = await yourAIService.generateResponse(message);
```

## 🔧 Advanced Configuration

### Environment Variables

- `PORT` - Server port (default: 3000)
- `CHAT_HISTORY_FILE` - Custom path for JSON file

### localStorage Keys

When running client-side only:
- `chat_history` - Array of questions
- `chat_votes` - Object with votes
- `chat_history_with_votes` - Combined data structure

## 📱 Mobile Support

- Responsive design works on all screen sizes
- Touch-friendly buttons and interactions
- Swipe-friendly sidebar
- iOS zoom prevention on input focus

## 🛠️ Development

To modify the chatbot:

1. **Frontend changes:** Edit `chatbot-ui.html`
2. **Backend changes:** Edit `server.js`
3. **Styling:** Modify the `<style>` section in the HTML
4. **Functionality:** Update the `<script>` section

## 📝 License

MIT License - feel free to use and modify as needed.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🐛 Troubleshooting

**Votes not saving:**
- Check browser console for errors
- Ensure localStorage is enabled
- If using server mode, check server logs

**Server not starting:**
- Ensure Node.js ≥14.0.0 is installed
- Run `npm install` to install dependencies
- Check if port 3000 is available

**Mobile issues:**
- Clear browser cache
- Disable browser zoom
- Check viewport meta tag

---

Made with ❤️ for better chat experiences!