import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Box,
  TextField,
  Autocomplete,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Typography,
  Paper,
  Button,
  IconButton,
  Collapse,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Mic,
  MicOff,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const AdvancedSearch = ({
  medicines,
  onSearch,
  onFilterChange,
  loading = false,
  placeholder = 'Search medicines...',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [requiresPrescription, setRequiresPrescription] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Extract unique categories from medicines
  const categories = useMemo(() => {
    if (!medicines) return [];
    const uniqueCategories = [...new Set(medicines.map((med) => med.category))];
    return uniqueCategories.filter(Boolean).sort();
  }, [medicines]);

  // Generate search suggestions
  useEffect(() => {
    if (!medicines || !searchTerm) {
      setSuggestions([]);
      return;
    }

    const filtered = medicines
      .filter(
        (med) =>
          med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          med.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .slice(0, 10)
      .map((med) => ({
        id: med.id,
        name: med.name,
        category: med.category,
        manufacturer: med.manufacturer,
      }));

    setSuggestions(filtered);
  }, [searchTerm, medicines]);

  // Voice search logic
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window))
      return;
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;
    recognitionRef.current.onresult = (event) => {
      let transcript = event.results[0][0].transcript;
      // Remove trailing punctuation (.,!?) and spaces
      transcript = transcript.trim().replace(/[.,!?]+$/, "");
      setSearchTerm(transcript);
      onSearch(transcript);
      setIsListening(false);
    };
    recognitionRef.current.onerror = () => {
      setIsListening(false);
    };
    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
  }, [onSearch]);

  // Apply filters and search
  const applyFilters = () => {
    const filters = {
      searchTerm,
      categories: selectedCategories,
      priceRange,
      requiresPrescription,
    };

    onFilterChange(filters);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setRequiresPrescription('all');
    setSuggestions([]);

    onFilterChange({
      searchTerm: '',
      categories: [],
      priceRange: [0, 1000],
      requiresPrescription: 'all',
    });
  };

  // Handle search input change
  const handleSearchChange = (event, value) => {
    setSearchTerm(value || '');
    if (value) {
      onSearch(value);
    }
  };

  // Handle category selection
  const handleCategoryChange = (event, newValue) => {
    setSelectedCategories(newValue);
  };

  // Handle price range change
  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // Handle prescription filter change
  const handlePrescriptionChange = (event) => {
    setRequiresPrescription(event.target.value);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (event, suggestion) => {
    if (suggestion) {
      setSearchTerm(suggestion.name);
      onSearch(suggestion.name);
    }
  };

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

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Paper
        elevation={2}
        sx={{
          p: 2,
          borderRadius: 3,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Main Search Bar */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <Autocomplete
            freeSolo
            options={suggestions}
            getOptionLabel={(option) =>
              typeof option === 'string' ? option : option.name
            }
            inputValue={searchTerm}
            onInputChange={handleSearchChange}
            onChange={handleSuggestionSelect}
            loading={loading}
            sx={{ flexGrow: 1 }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={placeholder}
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                  ),
                  endAdornment: (
                    <>
                      <IconButton
                        onClick={handleMicClick}
                        color={isListening ? 'error' : 'primary'}
                        sx={{ ml: 1 }}
                        aria-label={
                          isListening ? 'Stop listening' : 'Start voice search'
                        }
                      >
                        {isListening ? (
                          <MicOff sx={{ animation: 'pulse 1s infinite' }} />
                        ) : (
                          <Mic />
                        )}
                      </IconButton>
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                  },
                }}
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <Box>
                  <Typography variant="body1" fontWeight={600}>
                    {option.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {option.category} • {option.manufacturer}
                  </Typography>
                </Box>
              </Box>
            )}
          />

          <IconButton
            onClick={() => setShowFilters(!showFilters)}
            sx={{
              backgroundColor: showFilters ? 'primary.main' : 'grey.100',
              color: showFilters ? 'white' : 'text.primary',
              '&:hover': {
                backgroundColor: showFilters ? 'primary.dark' : 'grey.200',
              },
            }}
          >
            <FilterIcon />
          </IconButton>

          <Button
            variant="contained"
            onClick={applyFilters}
            disabled={loading}
            sx={{ borderRadius: 2 }}
          >
            Search
          </Button>
        </Box>

        {/* Advanced Filters */}
        <Collapse in={showFilters}>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {/* Categories Filter */}
              <Box sx={{ minWidth: 200, flexGrow: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Categories
                </Typography>
                <Autocomplete
                  multiple
                  options={categories}
                  value={selectedCategories}
                  onChange={handleCategoryChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Select categories"
                      size="small"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option}
                        {...getTagProps({ index })}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))
                  }
                />
              </Box>

              {/* Price Range Filter */}
              <Box sx={{ minWidth: 200, flexGrow: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000}
                  step={10}
                  sx={{ mt: 1 }}
                />
              </Box>

              {/* Prescription Filter */}
              <Box sx={{ minWidth: 150 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Prescription</InputLabel>
                  <Select
                    value={requiresPrescription}
                    onChange={handlePrescriptionChange}
                    label="Prescription"
                  >
                    <MenuItem value="all">All Medicines</MenuItem>
                    <MenuItem value="true">Prescription Required</MenuItem>
                    <MenuItem value="false">Over the Counter</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Filter Actions */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 2,
                gap: 1,
              }}
            >
              <Button
                variant="outlined"
                onClick={clearFilters}
                startIcon={<ClearIcon />}
                size="small"
              >
                Clear All
              </Button>
              <Button variant="contained" onClick={applyFilters} size="small">
                Apply Filters
              </Button>
            </Box>
          </motion.div>
        </Collapse>
      </Paper>
    </Box>
  );
};

export default AdvancedSearch;
