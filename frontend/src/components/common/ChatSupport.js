import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Fab,
  Drawer,
  AppBar,
  Toolbar,
  Chip,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  Send,
  Close,
  Chat,
  Support,
  KeyboardArrowUp,
  KeyboardArrowDown,
  AttachFile,
  EmojiEmotions,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! Welcome to Health Pharmacy. How can I assist you today?',
      sender: 'support',
      timestamp: new Date(),
      type: 'text',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const [supportAgent] = useState({
    name: 'Dr. Sarah Johnson',
    role: 'Pharmacist',
    avatar: '/support-avatar.jpg',
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Thank you for your message. I'm here to help you with any questions about our medicines or services.",
        'I understand your concern. Let me provide you with the best possible assistance.',
        "That's a great question! Here's what you need to know about that medication.",
        "I'll be happy to help you with your prescription or order. Could you provide more details?",
        'Your health and safety are our top priorities. Let me guide you through this.',
      ];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'support',
        timestamp: new Date(),
        type: 'text',
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const MessageBubble = ({ message }) => {
    const isUser = message.sender === 'user';

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ListItem
          sx={{
            flexDirection: 'column',
            alignItems: isUser ? 'flex-end' : 'flex-start',
            px: 0,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 1,
              maxWidth: '70%',
              flexDirection: isUser ? 'row-reverse' : 'row',
            }}
          >
            {!isUser && (
              <Avatar src={supportAgent.avatar} sx={{ width: 32, height: 32 }}>
                <Support />
              </Avatar>
            )}

            <Box
              sx={{
                backgroundColor: isUser ? 'primary.main' : 'grey.100',
                color: isUser ? 'white' : 'text.primary',
                borderRadius: 3,
                px: 2,
                py: 1,
                maxWidth: '100%',
                wordBreak: 'break-word',
                boxShadow: 1,
              }}
            >
              <Typography variant="body2">{message.text}</Typography>
              <Typography
                variant="caption"
                sx={{
                  opacity: 0.7,
                  display: 'block',
                  mt: 0.5,
                  textAlign: isUser ? 'right' : 'left',
                }}
              >
                {formatTime(message.timestamp)}
              </Typography>
            </Box>
          </Box>
        </ListItem>
      </motion.div>
    );
  };

  const ChatWindow = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <Paper
        elevation={8}
        sx={{
          width: 350,
          height: 500,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar sx={{ minHeight: 60 }}>
            <Avatar src={supportAgent.avatar} sx={{ mr: 2 }}>
              <Support />
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {supportAgent.name}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                {supportAgent.role} • Online
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                size="small"
                onClick={() => setIsMinimized(!isMinimized)}
                sx={{ color: 'white' }}
              >
                {isMinimized ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
              <IconButton
                size="small"
                onClick={() => setIsOpen(false)}
                sx={{ color: 'white' }}
              >
                <Close />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Messages */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            p: 2,
            backgroundColor: 'grey.50',
          }}
        >
          <List sx={{ p: 0 }}>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {isTyping && (
              <ListItem sx={{ px: 0 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: 1,
                  }}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <Support />
                  </Avatar>
                  <Box
                    sx={{
                      backgroundColor: 'grey.100',
                      borderRadius: 3,
                      px: 2,
                      py: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <CircularProgress size={16} />
                    <Typography variant="body2" color="text.secondary">
                      Typing...
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            )}
          </List>
          <div ref={messagesEndRef} />
        </Box>

        {/* Input */}
        <Box
          sx={{
            p: 2,
            backgroundColor: 'white',
            borderTop: 1,
            borderColor: 'grey.200',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <AttachFile />
            </IconButton>
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <EmojiEmotions />
            </IconButton>
            <TextField
              fullWidth
              multiline
              maxRows={3}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
                '&.Mui-disabled': {
                  backgroundColor: 'grey.300',
                  color: 'grey.500',
                },
              }}
            >
              <Send />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );

  return (
    <>
      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="chat"
        onClick={() => setIsOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
          boxShadow: 3,
        }}
      >
        <Chat />
      </Fab>

      {/* Chat Drawer */}
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            zIndex: 1200,
          }}
        >
          <AnimatePresence>{isOpen && <ChatWindow />}</AnimatePresence>
        </Box>
      </Drawer>
    </>
  );
};

export default ChatSupport;
