import { useState, useMemo } from 'react';

const useSearch = (items = [], searchFields = []) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });

  const filteredItems = useMemo(() => {
    let result = [...items];

    // Apply search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((item) =>
        searchFields.some((field) => {
          const value = item[field];
          return value && value.toString().toLowerCase().includes(searchLower);
        })
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter((item) => {
          if (Array.isArray(value)) {
            return value.includes(item[key]);
          }
          return item[key] === value;
        });
      }
    });

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === bValue) return 0;

        const comparison = aValue > bValue ? 1 : -1;
        return sortConfig.direction === 'ascending' ? comparison : -comparison;
      });
    }

    return result;
  }, [items, searchTerm, filters, sortConfig, searchFields]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === 'ascending'
          ? 'descending'
          : 'ascending',
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const clearSort = () => {
    setSortConfig({
      key: null,
      direction: 'ascending',
    });
  };

  const clearAll = () => {
    clearFilters();
    clearSearch();
    clearSort();
  };

  return {
    searchTerm,
    filters,
    sortConfig,
    filteredItems,
    handleSearch,
    handleFilter,
    handleSort,
    clearFilters,
    clearSearch,
    clearSort,
    clearAll,
  };
};

export default useSearch; 