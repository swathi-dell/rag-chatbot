const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// File path for storing chat history
const CHAT_HISTORY_FILE = path.join(__dirname, 'chat_history.json');

// Initialize chat history file if it doesn't exist
async function initializeChatHistory() {
  try {
    await fs.access(CHAT_HISTORY_FILE);
  } catch (error) {
    // File doesn't exist, create it
    const initialData = {
      exportDate: new Date().toISOString(),
      totalQuestions: 0,
      totalVotes: 0,
      chatHistory: [],
      votes: {}
    };
    await fs.writeFile(CHAT_HISTORY_FILE, JSON.stringify(initialData, null, 2));
    console.log('Created initial chat_history.json file');
  }
}

// Read chat history from file
async function readChatHistory() {
  try {
    const data = await fs.readFile(CHAT_HISTORY_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading chat history:', error);
    return {
      exportDate: new Date().toISOString(),
      totalQuestions: 0,
      totalVotes: 0,
      chatHistory: [],
      votes: {}
    };
  }
}

// Write chat history to file
async function writeChatHistory(data) {
  try {
    await fs.writeFile(CHAT_HISTORY_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing chat history:', error);
    throw error;
  }
}

// POST /chat - Handle chat messages
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Read current chat history
    const chatData = await readChatHistory();
    
    // Add new question to history
    const newEntry = {
      question: message,
      vote: null,
      voteTimestamp: null,
      timestamp: new Date().toISOString()
    };
    
    chatData.chatHistory.unshift(newEntry);
    chatData.totalQuestions = chatData.chatHistory.length;
    chatData.exportDate = new Date().toISOString();
    
    // Keep only last 50 entries
    chatData.chatHistory = chatData.chatHistory.slice(0, 50);
    
    // Save updated data
    await writeChatHistory(chatData);
    
    // Simulate AI response (you can integrate with actual AI service here)
    const responses = [
      "I understand your question. Let me help you with that.",
      "That's an interesting point. Here's what I think...",
      "Thank you for asking. Based on my knowledge...",
      "Great question! Let me break this down for you.",
      "I'd be happy to help you with that."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    res.json({
      response: [{
        content: randomResponse,
        type: "text"
      }]
    });
    
  } catch (error) {
    console.error('Error handling chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /vote - Handle voting
app.post('/vote', async (req, res) => {
  try {
    const { question, vote } = req.body;
    
    if (!question || !vote || !['up', 'down'].includes(vote)) {
      return res.status(400).json({ error: 'Valid question and vote (up/down) are required' });
    }

    // Read current chat history
    const chatData = await readChatHistory();
    
    // Update vote in votes object
    chatData.votes[question] = {
      vote: vote,
      timestamp: new Date().toISOString()
    };
    
    // Update vote in chatHistory array
    const historyIndex = chatData.chatHistory.findIndex(entry => entry.question === question);
    if (historyIndex !== -1) {
      chatData.chatHistory[historyIndex].vote = vote;
      chatData.chatHistory[historyIndex].voteTimestamp = new Date().toISOString();
    }
    
    // Update total votes count
    chatData.totalVotes = Object.keys(chatData.votes).length;
    chatData.exportDate = new Date().toISOString();
    
    // Save updated data
    await writeChatHistory(chatData);
    
    res.json({ 
      success: true, 
      message: `Vote "${vote}" recorded for question: "${question}"` 
    });
    
  } catch (error) {
    console.error('Error handling vote:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /history - Get chat history
app.get('/history', async (req, res) => {
  try {
    const chatData = await readChatHistory();
    res.json(chatData);
  } catch (error) {
    console.error('Error getting history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /stats - Get voting statistics
app.get('/stats', async (req, res) => {
  try {
    const chatData = await readChatHistory();
    const votes = Object.values(chatData.votes);
    const upvotes = votes.filter(v => v.vote === 'up').length;
    const downvotes = votes.filter(v => v.vote === 'down').length;
    
    res.json({
      upvotes,
      downvotes,
      total: upvotes + downvotes,
      totalQuestions: chatData.totalQuestions
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /history - Clear chat history
app.delete('/history', async (req, res) => {
  try {
    const initialData = {
      exportDate: new Date().toISOString(),
      totalQuestions: 0,
      totalVotes: 0,
      chatHistory: [],
      votes: {}
    };
    
    await writeChatHistory(initialData);
    res.json({ success: true, message: 'Chat history cleared' });
  } catch (error) {
    console.error('Error clearing history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'chatbot-ui.html'));
});

// Start server
async function startServer() {
  await initializeChatHistory();
  app.listen(PORT, () => {
    console.log(`🚀 Chatbot server running on http://localhost:${PORT}`);
    console.log(`📁 Chat history will be saved to: ${CHAT_HISTORY_FILE}`);
  });
}

startServer().catch(console.error);