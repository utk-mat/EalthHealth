import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, TextField, Button, InputAdornment, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const animatedPlaceholders = [
  'Search for Medicine',
  'Search for Lab Tests',
  'Search for Doctor Consult',
  'Search for Healthcare Products',
  'Search for Health Blogs',
];

const HomeHero = ({ onSearch, onPrescriptionUpload }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Animated placeholder cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((idx) => (idx + 1) % animatedPlaceholders.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Voice search logic
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;
    recognitionRef.current.onresult = (event) => {
      let transcript = event.results[0][0].transcript;
      transcript = transcript.trim().replace(/[.,!?]+$/, '');
      setSearchTerm(transcript);
      if (onSearch) onSearch(transcript);
      setIsListening(false);
    };
    recognitionRef.current.onerror = () => setIsListening(false);
    recognitionRef.current.onend = () => setIsListening(false);
  }, [onSearch]);

  const handleMicClick = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handlePrescriptionUpload = (e) => {
    if (onPrescriptionUpload && e.target.files[0]) {
      onPrescriptionUpload(e.target.files[0]);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 540, mx: 'auto', mb: 2, background: 'transparent', boxShadow: 'none', p: 0 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={animatedPlaceholders[placeholderIdx]}
          value={searchTerm}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleMicClick} color={isListening ? 'error' : 'primary'}>
                  <MicIcon />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderTopLeftRadius: 32,
              borderBottomLeftRadius: 32,
              background: '#fff',
              height: 56,
              boxShadow: 'none',
            },
          }}
          sx={{
            '& fieldset': {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderTopLeftRadius: 32,
              borderBottomLeftRadius: 32,
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderTopRightRadius: 32,
            borderBottomRightRadius: 32,
            minWidth: 120,
            height: 56,
            fontWeight: 600,
            fontSize: '1.1rem',
            boxShadow: 'none',
            ml: 0,
          }}
          onClick={() => onSearch && onSearch(searchTerm)}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          component="label"
          sx={{ borderRadius: 3, fontWeight: 600 }}
        >
          Order with prescription
          <input type="file" accept="image/*,.pdf" hidden onChange={handlePrescriptionUpload} />
        </Button>
      </Box>
    </>
  );
};

export default HomeHero; 